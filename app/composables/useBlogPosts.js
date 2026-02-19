/**
 * useBlogPosts
 * Fetches recent blog posts from the Blogverse API.
 *
 * API endpoint: GET /api/v1/posts/recent?limit=N
 * Docs: https://blogverse-five-omega.vercel.app/api/v1
 *
 * @param {number} limit — number of recent posts (default 5)
 * @returns {{ posts, loading, error }}
 */
export function useBlogPosts(limit = 5) {
  const API_BASE = 'https://blogverse-five-omega.vercel.app/api/v1';
  const url = `${API_BASE}/posts/recent?limit=${limit}`;

  const {
    data: posts,
    status,
    error,
  } = useFetch(url, {
    key: `blog-posts-recent-${limit}`,

    /* Extract the data array from the API response wrapper */
    transform: (raw) => {
      if (!raw?.success || !raw?.data) return [];

      return raw.data.map((post) => ({
        slug: post.slug,
        title: post.frontmatter?.title || 'Untitled',
        description: post.frontmatter?.description || post.excerpt || '',
        date: post.frontmatter?.date || '',
        tags: post.frontmatter?.tags || [],
        readingTime: post.readingTime || 0,
        /* Direct link to the blog post on Blogverse */
        url: `https://blogverse-five-omega.vercel.app/blog/${post.slug}`,
      }));
    },
  });

  const loading = computed(() => status.value === 'pending');

  return { posts, loading, error };
}
