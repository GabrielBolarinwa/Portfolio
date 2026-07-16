# Axiom — Scientific Calculator
---
## 1. Project Overview

Axiom is a browser-based scientific calculator built to support chained arithmetic and trigonometric expressions with a custom expression parser written entirely in vanilla JavaScript. It was built as part of a frontend engineering portfolio to demonstrate applied algorithmic thinking, accessible UI design, and production-level code organisation within a zero-dependency constraint.

---

## 2. Objectives & Constraints

The engineering standard targeted was production-grade frontend — meaning the build had to hold up to the same scrutiny applied to shipped work, not just function correctly.

Self-imposed constraints that shaped every decision:

- **Zero runtime dependencies** — no libraries, no frameworks, no expression evaluators
- **WCAG 2.1 AA compliance** — semantic HTML, ARIA attributes, keyboard operability
- **No `eval()`** — a custom parser was required to handle expression evaluation safely
- **Degree-only trig** — radian mode was scoped out as a known constraint, not an omission
- **Single-file output per concern** — HTML, CSS, and JS strictly separated

---

## 3. Process

Most of the consequential decisions were made early and informed everything downstream. The choice to avoid `eval()` was not primarily a security concern — it was an engineering standard. `eval()` executes arbitrary JavaScript, which means it conflates evaluation with execution and provides no control over what gets run. Replacing it required a real expression parser, which in turn required understanding operator precedence as a structural problem rather than a pattern-matching one.

The choice of vanilla JavaScript over a framework was straightforward: a calculator has no component tree, no shared reactive state between views, and no routing. A framework would have added abstraction with no architectural benefit. Similarly, math.js was evaluated and rejected — wrapping a library would have replaced one black box with another, producing a weaker portfolio artifact.

UI planning was constrained to a 5-column grid system that could accommodate both number keys and function buttons without breaking the spatial rhythm. Typography was split between Poppins for UI chrome and JetBrains Mono for the display output — the latter chosen for its monospaced clarity at numeric sizes and the visual signal it sends about the calculator's technical character.

---

## 4. Architecture & Structure

```
axiom/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

The JavaScript is organised as a linear pipeline with four distinct stages:

**1. Pre-processing**
Before tokenization, a set of `String.replace()` calls normalise display symbols into parser-compatible equivalents — `×` → `*`, `÷` → `/`, `√` → `sqrt`, `%` → `* 0.01`, `π` → `Math.PI.toString()`, and `e` (word-boundary matched with `\be\b`) → `Math.E.toString()`. This stage also runs `balanceExpression()`, which counts unmatched opening parentheses and appends the correct number of closing parens rather than rejecting the expression outright. Only a negative bracket count — more closing than opening — is treated as unrecoverable.

**2. Tokenization — `tokenize(expression: string): Token[]`**
The tokenizer walks the pre-processed string character by character and emits a typed token stream. Token types are `number`, `operator`, `function`, `paren`, and `unary`. The non-trivial case is unary minus detection: a `-` character is classified as `unary` (tagged `neg`) if no prior token exists, or if the prior token is an operator or an open parenthesis — otherwise it is a binary `operator`. This distinction is load-bearing for expressions like `-3 * 2` or `sin(-30)`.

**3. Shunting Yard — `shuntingYard(tokens: Token[]): Token[]`**
The Shunting Yard algorithm (Dijkstra, 1961) converts the infix token stream to postfix (Reverse Polish Notation), which is unambiguous and evaluable without precedence tracking. The algorithm maintains an operator stack and an output queue. Operators are popped from the stack to output when a lower-or-equal-precedence operator arrives, respecting right-associativity for exponentiation (`^`) and unary negation. Functions sit on the stack until their closing `)` triggers a flush. The precedence table is:

| Token | Precedence | Associativity |
|-------|------------|---------------|
| `+`, `-` | 1 | Left |
| `*`, `/` | 2 | Left |
| `^` | 3 | Right |
| `neg` | 4 | Right |

**4. Postfix Evaluation — `evaluatePostfix(tokens: Token[]): number`**
The postfix token stream is evaluated with a numeric stack. Numbers push directly. Operators pop two operands (right operand first — order matters for subtraction and division). Functions pop one operand and apply the corresponding `Math` method. Unary tokens pop one operand and negate it. The final stack value is the result.

The `ops` and `fns` lookup tables are defined at module scope, outside the evaluator function, so they are constructed once rather than on every invocation.

---

## 5. Stack & Tooling

| Tool | Role | Justification |
|------|------|---------------|
| Vanilla JavaScript (`type="module"`) | Application logic | No component model needed; module scope prevents global namespace pollution without a build step |
| HTML5 semantic elements | Structure | `<output>`, `<nav>`, `<main>`, `<section>` used for both meaning and ARIA landmark coverage |
| CSS custom properties | Design tokens | Font size defined as a `clamp()` value in `:root`; eliminates magic numbers in component styles |
| Google Fonts (Poppins, JetBrains Mono) | Typography | Poppins for UI legibility; JetBrains Mono for display output — signals precision, improves numeral readability |
| Vercel | Deployment | Zero-configuration static hosting; automatic HTTPS |

**Alternatives considered:**
- **math.js** — rejected; library evaluation was the exact capability being demonstrated
- **React / Vue** — rejected; no state management problem exists at this scale
- **`eval()`** — rejected on principle; see Objectives

---

## 6. Key Engineering Challenges

**1. Replacing `eval()` with a correct expression parser**

The naive path would have been a regex-based replacement layer on top of `eval()`. The problem is that regex cannot resolve scope — `sin30+2` is structurally ambiguous as a pattern match. Does the argument to `sin` end at `30` or at `30+2`? A stack-based parser resolves this structurally, not heuristically. Choosing Shunting Yard specifically was driven by its explicit handling of functions as first-class tokens — the algorithm has a defined path for pushing functions onto the stack and flushing them on `)`.

**2. Unary minus disambiguation**

Binary minus and unary minus are the same character at the input level. The tokenizer must determine which is intended from context — the prior token. The rule implemented is: if no prior token exists, or the prior token is an operator or `(`, the `-` is unary. This handles `-3`, `(-3)`, `5 * -3`, and `sin(-30)` correctly. The `neg` token is assigned the highest precedence and right-associativity so that `--3` resolves as expected.

**3. Floating point display**

JavaScript's IEEE 754 arithmetic produces results like `0.1 + 0.2 = 0.30000000000000004`. The fix applied was `parseFloat(result.toPrecision(10)).toString()` — `toPrecision(10)` rounds to 10 significant figures, eliminating floating point noise, and `parseFloat` strips trailing zeroes that `toPrecision` would otherwise leave (`4.000` → `4`).

**4. Bracket auto-completion**

The initial implementation rejected expressions with unbalanced brackets. This was replaced with `balanceExpression()` — a function that counts net open brackets and appends the missing closing parens silently. The motivation was UX: a user typing `sin(30` and pressing `=` should get a result, not an error. Only structurally unrecoverable inputs (negative bracket count) surface as errors.

---

## 7. Outcome & Reflections on the Objective

The zero-dependency constraint was met. The build ships no runtime libraries — the only external resources are two Google Fonts families loaded via CDN, which are presentation assets rather than runtime dependencies.

WCAG compliance was addressed through semantic landmarks, `aria-live` on the display output, `aria-label` on all non-obvious buttons, and full keyboard operability with a documented key mapping in the footer.

The `eval()` replacement was completed and verified — the parser correctly handles operator precedence, right-associativity, chained expressions, unary negation, trig functions in degrees, logarithms, square roots, percentages, and the mathematical constants π and e.

Lighthouse scores at deployment([full report](https://pagespeed.web.dev/analysis/https-gabrielbolarinwa-axiom-vercel-app/fmx3wjmfbz?form_factor=desktop)):

| Category | Score |
|----------|-------|
| Performance | 99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

_(Scores reflect production build on Vercel at time of submission)_

---

## 8. What I'd Do Differently

**Radian mode.** Scoping it out was the right call for timeline, but it's the most obvious missing feature for anyone doing serious scientific work. The implementation path is straightforward — a mode toggle that switches the degree-to-radian conversion coefficient — and it should have been in scope from the start.

**Error specificity.** The current error handling catches all parser failures and maps them to generic messages. A more useful implementation would propagate specific error types from the tokenizer and evaluator — `UnknownTokenError`, `DivisionByZeroError`, `EmptyExpressionError` — and surface messages that tell the user exactly what went wrong and where.

**Input validation before evaluation.** Currently the pipeline only catches errors at evaluation time. A validation pass after tokenization — checking for consecutive operators, empty function arguments, and similar malformed patterns — would give earlier, cleaner feedback.

**CSS architecture.** The stylesheet is a single flat file. At this scale it's manageable, but if the project were extended (history panel, settings modal, radian toggle), the absence of any layer or component structure would become a liability quickly.