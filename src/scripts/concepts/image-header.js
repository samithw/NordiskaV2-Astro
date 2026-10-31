// Keep the shared header white only while a full-width photo covers it.
export function syncImageHeader(image) {
 const body = document.body;
 if (!body.classList.contains('concept-image-overlay') || !image) return;
 const bounds = image.getBoundingClientRect();
 const header = document.querySelector('header');
 body.toggleAttribute('data-image-cover', bounds.top <= 1 && bounds.left <= 1 && bounds.right >= document.documentElement.clientWidth - 1 && bounds.bottom >= header.offsetHeight);
}
