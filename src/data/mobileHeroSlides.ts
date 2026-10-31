import { cleantechHighlights } from './cleantechHighlights';
import { serviceExplorer } from './serviceExplorer';
import { expertiseInMotion } from './expertiseInMotion';
import { brandHighlights } from './brandHighlights';
import { nordiskaStory } from './nordiskaStory';
import { originalPhotos, originalSlides, photographyPhotos, photographySlides, photographyDetails } from './legacyHeroSlides';
import { withBase } from '../utils/paths';

export interface MobileHeroSlide {
 headline: string; image: string; alt: string; label: string; copy: string; cta: string; url: string;
}
interface Highlight {
 headline: string; editorialImage: string; imageAlt?: string; name: string; category: string;
 description: string; summary?: string; cta: string; url: string;
}
const normalize = (items: Highlight[]): MobileHeroSlide[] => items.map(item => ({
 headline: item.headline.replaceAll('\n', ' '), image: item.editorialImage,
 alt: item.imageAlt || item.name, label: item.category,
 copy: item.summary || item.description.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || item.description,
 cta: item.cta, url: item.url,
}));
export function mobileHeroSlides(variant: string): MobileHeroSlide[] {
 switch (variant) {
  case 'signal': return normalize(serviceExplorer);
  case 'story': return normalize(expertiseInMotion);
  case 'highlights': return normalize(brandHighlights);
  case 'narrative': return normalize(nordiskaStory);
  case 'original':
  case 'photography': {
   const photography = variant === 'photography';
   const photos: Record<string, string> = photography ? photographyPhotos : originalPhotos;
   const routes = ['/services/market-entry-strategy/', '/services/partner-search/', '/services/market-activation/', '/services/channel-sales-support/', '/industries/'];
   return (photography ? photographySlides : originalSlides).map((slide, i) => ({
    headline: photography ? photographyDetails[i][0] : slide.short,
    image: photos[slide.photo], alt: slide.alt, label: slide.category,
    copy: slide.copy, cta: slide.action, url: withBase(routes[i]),
   }));
  }
  default: return normalize(cleantechHighlights);
 }
}
