const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const COMMITS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        totalCommitContributions
        restrictedContributionsCount
      }
    }
  }
`;

export async function getGitHubStats() {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const [userRes, graphqlRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${process.env.GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(GITHUB_GRAPHQL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: COMMITS_QUERY,
          variables: { username: process.env.GITHUB_USERNAME },
        }),
        next: { revalidate: 3600 },
      }),
    ]);

    const user = await userRes.json();
    const { data } = await graphqlRes.json();
    const { totalCommitContributions, restrictedContributionsCount } =
      data.user.contributionsCollection;

    return {
      repos: user.public_repos as number,
      commits: (totalCommitContributions +
        restrictedContributionsCount) as number,
      since: new Date(user.created_at).getFullYear(),
    };
  } catch (error) {
    console.error(error);
    return {
      repos: null,
      commits: null,
      since: null,
    };
  }
}
