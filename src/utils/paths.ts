/** Keep page and local asset URLs valid at the root or a GitHub Pages subpath. */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!base || path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}
