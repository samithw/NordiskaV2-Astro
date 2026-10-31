/** Route Classic page links within /classic/ while keeping shared assets at the site root. */
export function withBase(path: string): string {
 if (!path.startsWith('/') || path.startsWith('//')) return path;
 const base = import.meta.env.BASE_URL.replace(/\/$/, '');
 if (base && (path === base || path.startsWith(`${base}/`))) return path;
 if (path === '/classic' || path.startsWith('/classic/')) return `${base}${path}`;
 const page = /^\/(?:$|[?#]|(?:about|services|industries|locations|contact|privacy)(?:[/?#]|$))/.test(path);
 return `${base}${page ? '/classic' : ''}${path}`;
}
