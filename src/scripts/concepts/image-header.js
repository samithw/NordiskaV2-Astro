// Use the same eased zoom value as the image, including reverse and click-to-expand.
export function syncImageHeader(image, zoom) {
 const body = document.body;
 if (!body.classList.contains('concept-image-overlay') || !image) return;
 const bounds = image.getBoundingClientRect();
 const header = document.querySelector('header');
 // Static/mobile photos fade as their top edge passes through the header.
 const progress = Math.min(1, Math.max(0, zoom ?? -bounds.top / header.offsetHeight));
 // Reach blue early, before the shrinking photo exposes the pale page beneath.
 const colourProgress = Math.min(1, progress / .22);
 body.style.setProperty('--image-header-colour', `${(1 - Math.pow(1 - colourProgress, 3)) * 100}%`);
 body.style.setProperty('--image-header-progress', `${progress * 100}%`);
 body.style.setProperty('--image-header-shade', String(1 - progress));
 body.toggleAttribute('data-image-cover', progress < 1);
}
