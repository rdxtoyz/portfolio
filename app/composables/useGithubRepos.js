/**
 * useGithubRepos
 *
 * Fetches public repositories for a GitHub user, sorted by most recently pushed.
 * Uses useAsyncData + $fetch for reliable SSR/CSR fetching with proper
 * error handling and response validation.
 *
 * @param {string} username — GitHub username
 * @param {number} limit    — max repos to return (default 6)
 * @returns {{ repos: Ref, loading: ComputedRef<boolean>, error: Ref }}
 */
export function useGithubRepos(username = 'nayandas69', limit = 6) {
  /* GitHub REST API — public repos sorted by last push */
  const apiUrl = `https://api.github.com/users/${username}/repos`;

  const {
    data: repos,
    status,
    error,
  } = useAsyncData(
    `github-repos-${username}`,
    () =>
      $fetch(apiUrl, {
        params: {
          sort: 'pushed',
          per_page: limit,
          type: 'public',
        },
        headers: {
          Accept: 'application/vnd.github+json',
        },
      }),
    {
      /* Transform raw GitHub response into a clean, minimal shape */
      transform: (raw) => {
        /* Guard: ensure we received an array from GitHub */
        if (!Array.isArray(raw)) return [];

        return raw.map((repo) => ({
          name: repo.name,
          description: repo.description || 'No description provided.',
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          homepage: repo.homepage,
          pushedAt: repo.pushed_at,
          topics: repo.topics || [],
        }));
      },

      /* Fallback to empty array so the template never sees null */
      default: () => [],
    }
  );

  /* Derive a boolean loading state from Nuxt's status ref */
  const loading = computed(() => status.value === 'pending');

  return { repos, loading, error };
}
