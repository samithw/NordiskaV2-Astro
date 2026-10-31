const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function arrowLinkMarkup(label, href) {
  return `<a class="nordiska-arrow-link" href="${escape(href)}"><span>${escape(label)}</span><span class="nordiska-arrow-circle" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><path d="M9 31 31 9M18 9h13v13" stroke="currentColor" stroke-width="1.25"/></svg></span></a>`;
}
