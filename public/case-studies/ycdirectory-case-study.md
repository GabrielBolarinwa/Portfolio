# YC Directory —  Case Study
---
## 1. Project Overview

YC Directory is a community platform for entrepreneurs to share, discover, and collaborate on startup ideas. Users authenticate via Google OAuth, automatically gaining authorship privileges to publish structured startup pitches through a markdown editor with live preview. Built with Next.js, Sanity CMS, and Auth.js, the project was an exercise in integrating content and authentication systems at a production standard without a dedicated backend.

---
## 2. Objective & Constraints

The standard of this project was to ensure that multiple API requests and content polling had minimal impact on page performance.

Objectives:
- Build a community blog application with a clean, purposeful UI that prioritizes usability over visual excess.
- Maximize application performance and minimize API-induced slowdowns and content request latency.
- Integrate content and authentication systems using Backend for Frontend (BFF) strategies without a dedicated backend, leveraging Next.js tooling.
- Enable seamless content creation for startup pitches with intuitive user flows.
- Implement strong frontend security patterns through secret protection and form validation.

Constraints:
- Backend for Frontend (BFF) strategies were used as the primary architectural approach, eliminating the need for a separate server.
- To reduce implementation scope, images are externally hosted and linked via URL rather than uploaded directly to Sanity's asset pipeline — a deliberate deferral rather than a technical limitation.
- Authentication was limited to Google OAuth. Auth.js supports multiple providers, but expanding beyond Google was deprioritised given the project's scope.
---

## 3. Architecture & Structure

**Module Breakdown**
```
app/
├── (root)/
    ├── startup/
        ├── [id]/page.tsx    - Startup page, displays  post (startup) information
        ├── create/page.tsx    - Create startup form
    ├── user/
        ├── [id]/page.tsx    - User info page, displays logged in user's info and startups
    ├── layout.tsx    - The layout page for the main displays
    ├── page.tsx    - Displays the application homepage where startups are listed and the user can search for a particular startup
├── api/auth/[...nextauth]/route.ts    - Exports Auth.js library methods (GET and POST)
├── studio/[[...tool]]/page.tsx    - The sanity built-in authoring environment route.
├── global-error.tsx    - Global error fallback page for handling errors gracefully
├── globals.css    - Application CSS and styles
├── layout.tsx    - Global application layout page

components/    - Houses application reusable components
├──ui/    - Shadcn UI components
lib/
├── actions.ts    - Exports API request function for creating startups (pitches)
├── utils.ts    - Exports appication utility functions (date formating, class merging and server response parsing)
├── validation.ts    - Zod schema definition for create startup form

sanity/
├── lib    - Houses sanity instance files
    ├── queries.ts    - Sanity queries for fetching require app data
    ├── live.ts    - Live content configuration for Sanity CMS
├── schemaTypes    - Sanity content schemas

types/startupForm.ts    - Typescript application type definitions for create startup form

auth.ts    - Auth.js authentication event handlers

.env.local    - Private application secrets like authentication IDs configuration point
```

The application has 3 major route definitions, **home**, **startup** and **user**. Each route and component uses shared type definitions, certain components and utilities for rendering page content

**Home Startup list**
The startup lists are rendered by fetching from the sanity content management system using a custom query sorted in descending order (newest first), the custom query also takes into account the presence of a search parameter. Essentially, the query returns a list of all startups that matches the search if defined and just the startup list if no search is defined using the GROQ (Graph Relational Object Queries) query syntax:
```
*[_type=="startup" && defined(slug.current) && (!defined($search) || title match $search || category match $search || author->name match $search)] | order(_createdAt desc) {
    _id, title, slug, _createdAt, author->{
        _id, name, image, bio
    }, views, description, category, image
}
```
A logic error was identified in this query post-build — the `||` conditions were not grouped correctly, meaning the `!defined($search)` guard did not apply to the match conditions as intended. The corrected query wraps the conditional block in parentheses as shown above. This has since been patched.

**User Authentication**
The authentication works with Auth.js as the backbone but configurations were carried out manually. The only authentication supported by the application is Google due to wider user reach and was configured with authentication provider ID and secret configured in the `.env.local`. When the login button is clicked, it calls the `signIn` from `next-auth/react`. Auth.js carries out the Google authentication as follows:
- The `signIn` initiates the authentication with redirects to the Google  OAuth page where user authorization is requested.
- After the user grants permission, Google sends the authorization code back to Auth.js which it sends back to Google in exchange for the access token.
- Auth.js then uses the access token to request for the user data which is then used to create a new session
Post google authentication, three callback functions are executed with different purposes:
- `signIn`: Taking in the authenticated profile object, this function checks to see if the authenticated user has an author profile in the content management system, if the user doesn't have an author profile, a new author profile is created on the CMS and assigned the `sub` key value of the authenticated profile object as the ID of the author in the CMS which serves as a unique identifier for each user.
- `jwt`: Taking in the authenticated token and profile object. It fetches the author from the CMS and assigns the authorId key of the token object to the fetched author's ID.
- `session`: Taking in the authenticated session and token object. It assigns the id of the session's user to the token's authorId and returns the session which sets the current session of the application instance to the user's authenticated details.

**User Startup list**
When an authenticated session is present, the user can access his profile page where a list of startups published by the user can be viewed in a list. This list is fetched using a similar query to the one on the homepage but this time only the startups assigned to the authenticated author's ID is displayed by the following GROQ query:
```
*[_type == "startup" && author._id == $id | order(_createdAt desc)]{
  _id, title, slug, _createdAt, author -> {_id, name, image, bio}, views, description, category, image
}
```

**Startup Creation Flow**
The create startup page checks for an active session then renders a form that is strictly validated via Zod and uses the `useActionState` react hook for better form versatility. The form takes in title, description, category, image url and pitch details via MDEditor library from `@uiw/react-md-editor` for markdown content editing, these fields are validated against the following schema:
```javascript
title: z.string().min(3).max(500),
  description: z.string().min(20).max(200),
  category: z.string().min(3).max(20),
  link: z.url().refine(async (url) => {
    try {
      const res = await fetch(url, { method: "HEAD" });
      const contentType = res.headers.get("content-type");
      return contentType?.startsWith("image/");
    } catch (err) {
      console.log(err);
      return false;
    }
  }),
  pitch: z.array(
    z.object({
      children: z.array(
        z.object({
          text: z.string(),
        }),
      ),
      markDefs: z.array(z.object()),
      style: z.string(),
      _key: z.string(),
      _type: z.string(),
    }),
  )
```
The schema implements proper rules for each field from min and max input values to image url verification to avoid malicious file rendering or upload.  The submission of the form runs validation using the above schema and displays error messages for each invalid field and an error toast indicating submission failure. If the form is valid, it calls a `createPitch` function that takes in the form values and pitch that has been converted to portable text using the `@portabletext/markdown` library for sanity to easily parse for use. The `createPitch` function creates the startup post in the following steps:
- It gets the authenticated user in the current session, if there's none, it throws a handled error
- It extracts pitch info to be used in creation from the form values and generates a slug with the `slugify` using the pitch title of the extracted form value.
- It then writes the new pitch the CMS client to create the post.
- Error handling in places through these processes.
- If the pitch was successfully created, it is then redirected to the newly created startup using the Next.js router API.

**Startup Page**
The startup page is a dynamic route by displaying a selected post from the home page, user page or direct navigation. It works by getting the startup ID from the `params` prop and then the post content is fetched from the CMS client using the following query:
```
*[_type=="startup" && _id==$id][0]{
  _id, title, slug, _createdAt, author -> {
    _id, name, username, image, bio
  }, views, description, category, image, pitch
}
```
The ID paramater is passed from the fetched params object. If the post isn't found on the client, the `notFound` from `next/navigation` is called in order to throw a 404. After the post is fetched, the content is rendered dynamically on the DOM in a proper UI and the pitch, which is stored as portable text, is rendered using the `PortableText` component from `next-sanity` into readable HTML semantic content and styled using the tailwind prose styling utilities. The number of views are rendered using a separate `View` component that gets the startup ID as a prop, the component uses that ID to fetch the views on a startup using the query:
```
*[_type=="startup" && _id == $id][0]{
  _id, views
}
```
After the fetch, the views are incremented by 1 and committed back to the client as the rendering of the component means there is one more view. The view is made live by setting the `useCdn` of the client's config to true for that particular fetch. The views are rendered on the DOM using dynamically and styled with TailwindCSS.

**Logout Flow**
The authenticated user can easily logout by clicking the logout button on the `Navbar` component which calls the `signOut` function from `next-auth/react` which will redirect back to the home from wherever the function was called.

**Live Content**
Live content is powered by the `live.ts` sanity lib file which exposes a seperate sanity content fetch function which wraps the sanity CMS client with the `defineLive` function from `next-sanity/live` along with a `SanityLive` component that ensures DOM updates on API changes. The `SanityLive` component is rendered on home page for live dynamic content. Other pieces like the startup page, view component and user page fetch content using the client that uses the `useCdn` with value of true cache fetch responses for 60 seconds before refetching ensuring that content stays fresh to an acceptable extent.

**Next.js Rendering Strategies**
The application implements two main Next.js rendering strategies for optimizing performance:
- **Static Rendering (SSG):** Next.js App Router defaults to static rendering — pages are built at compile time and served as static HTML, maximising performance and reducing server load. The home page, startup page, and user page all leverage this as their baseline.
- **Server-Side Rendering (SSR):** Opted into explicitly when a route uses dynamic functions such as `searchParams`, `cookies()`, or `headers()`. The tradeoff is per-request server compute, but it enables fully dynamic, personalised responses where static rendering would be insufficient.
- **Partial Static/Dynamic Composition:** The startup page and user page use a mixed rendering model — static shells with dynamically rendered segments. The `View` component is deliberately isolated so it can revalidate independently without busting the static cache of the surrounding content. This pattern aligns with what Next.js refers to as Partial Prerendering (PPR) in its API reference.

---

## 4. Stack & Tooling

|  Tool |  Why |
|---|---|
|  Next.js |  A powerful web framework that integrates React to create highly performant web applications. Supports multiple rendering strategies (static, dynamic, hybrid) for granular optimization of each page. Considered Remix, but its loader/action model is better suited for mutation-heavy forms rather than the varied per-route caching strategies needed here. |
|  Typescript |  Provides app-wide type safety and development-time assurance when working with external APIs and libraries. |
|  Sanity |  A developer-centric headless CMS with schemas defined in TypeScript and committed to the repository, ensuring the content model stays in sync with the frontend. The Content Lake enables real-time collaborative editing and GROQ queries provide relational flexibility over REST/GraphQL. Chosen over Contentful (more restrictive free tier, GUI-managed schemas) and Strapi (self-hosted operational overhead). |
|  Tailwind CSS |  Utility-first CSS framework for rapid design system construction with token-based spacing, sizing, and theming. Paired with `tailwind-typography` for markdown rendering. |
|  Shadcn/UI |  Base component library for quick scaffolding of pre-styled, accessible components. Alternative (Material UI) was rejected due to poor customizability and lower accessibility standards. |
|  Auth.js |  Standards-based authentication library for Next.js. Abstracts OAuth flows and session management to configuration level. Supports multiple providers simultaneously, enabling future expansion beyond Google. |
|Slugify|Generates URL-safe slugs from strings passed to it at high versatility for unique content identifiers in the CMS.|
|@portabletext/markdown|Bidirectional converter between Portable Text (Sanity's content format) and Markdown (user-readable format). Lightweight and accurate.|
|@uiw/react-md-editor|React component library for client-side markdown editing with live preview.|
|Lucide Icons|Curated icon set with consistent stroke weight, full customizability, and no licensing overhead.|
|Vercel|Managed deployment with zero-config Next.js optimization, automatic SSL, and global CDN.|
|Sentry|Production error tracking, replay capture, and logging to identify and debug issues before they impact users.|

---
## 5. Key Engineering Challenges

- **TailwindCSS native binaries incompatibilities**
   Tailwind uses OS-native binaries to resolve application builds. Development occurred on Windows while production deployed on Vercel's Linux environment, causing binary mismatch errors. The missing binaries were platform-specific packages — specifically `@tailwindcss/oxide-linux-x64-gnu` and the `lightningcss-linux-x64-gnu` — which were present in the Windows development environment but not cross-installed for production. Fix attempts included:
  - Migration to pnpm, which resolves native binaries more gracefully than npm, but failed due to package hoisting incompatibilities with Sanity CMS packages.
  - Building via CI/CD pipeline and deploying build output directly, but Next.js build output is server-specific and cannot be directly referenced. CI/CD platforms also build on Linux, recreating the same binary mismatch.
  - Manually committing Tailwind binaries to package.json, which fixed production but broke the Windows development environment.
  
  The final solution was adding the binaries to the `optionalDependencies` object in package.json with a custom install and build script that forces optional dependency installation on Vercel only, while development environment ignores them.

- **PortableText and Markdown incompatibilities**
  Sanity previously supported markdown via `sanity-plugin-markdown`, but the plugin did not support Portable Text — Sanity's structured content format. The requirement was to accept markdown input, convert it to Portable Text for CMS storage, and render it as semantic HTML. The solution used `@uiw/react-md-editor` for client-side editing, `@portabletext/markdown` for markdown-to-Portable Text conversion matching the schema, and `PortableText` from `next-sanity` for server-side HTML rendering.

---
## 6. Outcomes & Reflections on the Objective

 Lighthouse Result ([full report](https://pagespeed.web.dev/analysis/https-gabriel-bolarinwa-yc-directory-vercel-app/0v1bk5kxo9?form_factor=desktop)): 
- Performance: 97
- Accessibility: 98
- Best Practicies: 100
- SEO: 100

Average INP (Interaction to Next Paint): 94ms — well within Google's "Good" threshold of under 200ms.

The application met the standard set — secure authentication, intuitive content creation flows, and reliable content delivery enabled users to publish and discover startups without friction.

What's still short of the bar:
- User interactions are limited compared to standard blog platforms — no comments, likes, or post editing.
- The application uses a static UI without subtle animations to enhance emotional design and visual feedback.

---

## 7. What I'd Do Differently

**Expand authentication to multiple OAuth providers:** Auth.js supports GitHub and email/password authentication simultaneously with Google. This would reduce friction for developers and users more comfortable with alternative identity providers, requiring minimal additional configuration.

**Integrate Sanity's native asset upload pipeline:** Rather than linking external image URLs, implement Sanity's built-in asset system to allow users to upload images directly during pitch creation. The CMS infrastructure already supports this with image manipulation and CDN delivery, eliminating external service dependencies.

**Add a GROQ query test suite:** The GROQ logic error in the homepage search query was caught post-deployment. Integration tests covering search and no-search states would have surfaced this before release, preventing production bugs.

**Enhance user engagement features:** Implement real-time feedback systems beyond view counts — comments, upvotes/downvotes, and post editing/deletion from user profiles. This transforms the platform from a discovery feed into a collaborative community.

**Refine content structure:** A more robust Sanity schema could enforce stricter validation on pitch structure, support embedded media beyond images, and enable content templates to guide creators toward higher-quality submissions.

**Animate transitions strategically:** Use `tailwind-animate` and CSS `animation-timeline` for purposeful micro-interactions — card fades on scroll, form submission feedback, loading states — that enhance usability without creating visual noise.