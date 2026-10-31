import { photographyPhotos as photos, photographySlides as heroSlides, photographyDetails as heroDetails } from '../../data/legacyHeroSlides';
import { withBase } from '../../utils/paths';
import { syncImageHeader } from './image-header';
const serviceRoutes=['/services/go-to-market-strategy/','/services/partner-search/','/services/market-activation/','/services/','/services/application-consultancy/','/services/on-site-training/','/services/aftersales-services/','/services/market-entry-strategy/'].map(withBase);

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
$('.deck-pagination').insertAdjacentHTML('beforebegin','<a class="story-link" id="story-link" href="#services">Explore our expertise <span>↗</span></a>');
$('.hero-images').innerHTML=heroSlides.map((s,i)=>`<img data-photo="${s.photo}" alt="${s.alt}"${i===0?' class="active"':''}>`).join('');
const sloganLines=[['Your next market.','A clear way in.'],['Close to the people','who matter.'],['From visibility','to opportunity.'],['A local presence.','A lasting advantage.'],['Good ideas deserve','to go further.']];
const sloganMarkup=i=>sloganLines[i].map(line=>`<span class="slogan-line">${line}</span>`).join('');
const previewCategories=['Market entry','Partnerships','Sales development','Local execution','Cleantech'];
$('.deck-cards').innerHTML=heroSlides.map((s,i)=>`<button class="deck-card" data-slide="${i}" aria-pressed="${i===0}" aria-label="Explore ${previewCategories[i].toLowerCase()}"><img data-photo="${s.photo}" alt=""><strong aria-hidden="true">${sloganMarkup(i)}</strong><span class="deck-arrow" aria-hidden="true">↗</span></button>`).join('');
$('.deck-pagination').innerHTML=heroSlides.map((s,i)=>`<button class="deck-dot${i===0?' active':''}" data-slide="${i}" aria-label="Show story ${i+1}: ${s.short}" aria-pressed="${i===0}">${String(i+1).padStart(2,'0')}</button>`).join('');
$$('[data-photo]').forEach(img=>img.src=photos[img.dataset.photo]);
const heroServiceGroups=[
 ['go-to-market-strategy','partner-search'],
 ['partner-search'],
 ['market-activation','channel-sales-support'],
 ['channel-sales-support'],
 ['go-to-market-strategy','channel-sales-support']
];
const heroCardTemplates=/** @type {HTMLTemplateElement} */ ($('#hero-service-templates'));
function selectSector(index){document.querySelectorAll('#industry-tabs [role=tab]')[index]?.click();}
$$('[data-contact]').forEach(b=>b.onclick=()=>window.location.assign(withBase('/contact/')));
let slide=0,baseSlide=0,orbitPosition=0,zoom=0,frame=0,opening=false,lastFrame=0;
const orbitCards=$$('.deck-card'), hero=$('.hero'),track=$('#hero-track');
const orbitEchoes=$$('.orbit-echo'),positioning=$('.positioning');
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const desktopOrbit=()=>innerWidth>760&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
function setSlide(i){
 slide=((i%heroSlides.length)+heroSlides.length)%heroSlides.length;
 $$('.hero-images img').forEach((im,j)=>im.classList.toggle('active',j===slide));
 $$('[data-slide]').forEach(b=>{const selected=Number(b.dataset.slide)===slide;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected))});
 const s=heroSlides[slide],detail=heroDetails[slide];
 $('#hero-headline').innerHTML=sloganMarkup(slide);$('#hero-description').textContent=detail[1];
 $('#deck-title').textContent=previewCategories[slide];$('#deck-description').textContent=detail[1];
 $('#story-link').innerHTML=detail[2]+' <span>↗</span>';$('#story-link').href=slide===0?serviceRoutes[7]:(s.service===null?withBase('/industries/'):serviceRoutes[s.service]);
 const relevant=heroServiceGroups[slide];
 $('#hero-service-cards').replaceChildren(...relevant.map(slug=>{
  const source=heroCardTemplates.content.querySelector(`[data-hero-service="${slug}"] .service-card`);
  return source.cloneNode(true);
 }));
 $('#hero-service-cards').classList.toggle('single',relevant.length===1);
 
 
 $('#value-sectors').innerHTML=s.service===null?'<button data-hero-sector="0">Water & wastewater</button><button data-hero-sector="1">Solid waste</button><button data-hero-sector="2">Bioenergy</button>':'';
 $$('[data-hero-sector]').forEach(b=>b.onclick=()=>{selectSector(Number(b.dataset.heroSector));$('#industries').scrollIntoView({behavior:'smooth'})});

}
function requestOrbit(){if(!frame)frame=requestAnimationFrame(renderOrbit)}
function chooseHero(i){
 if(!desktopOrbit()){setSlide(i);window.scrollTo({top:0,behavior:'smooth'});return}
 const count=heroSlides.length;
 baseSlide=orbitPosition+(((i-orbitPosition+count/2)%count+count)%count-count/2);
 baseSlide=Math.round(baseSlide);opening=true;
 window.scrollTo({top:0,behavior:'instant'});requestOrbit();
}
$$('[data-slide]').forEach(b=>b.onclick=()=>chooseHero(Number(b.dataset.slide)));
function renderOrbit(now){
 frame=0;
 if(matchMedia('(max-width:760px)').matches)return;
 if(!desktopOrbit()){
  orbitCards.forEach(b=>{b.removeAttribute('style');b.tabIndex=0});
  orbitEchoes.forEach(b=>b.removeAttribute('style'));
  $('.hero-value').inert=false;$('.hero-value').style.visibility='visible';
  hero.style.removeProperty('--story-opacity');
  hero.style.setProperty('--preview-copy-opacity',1);
  document.body.classList.toggle('hero-preview-cover',hero.getBoundingClientRect().top>=-80);
  $('.hero-fullscreen-copy').inert=false;
  $('.hero-fullscreen-copy').style.visibility='visible';
  syncImageHeader($('.hero-images'));
  return;
 }
 const h=hero.clientHeight,w=hero.clientWidth,top=parseFloat(getComputedStyle(hero).top)||0;
 const travel=Math.max(1,track.offsetHeight-h-top);
 const p=clamp((scrollY-track.offsetTop)/travel),zoomEnd=.20;
 // Match the hero's angular speed at its exit, then ease it to zero through
 // the Advantage section. This stays tied to scroll, including in reverse.
 const slowdownDistance=positioning?Math.max(1,h+positioning.offsetHeight*.85):1;
 const afterHero=Math.max(0,scrollY-track.offsetTop-travel);
 const slowdownProgress=positioning?clamp(afterHero/slowdownDistance):0;
 const exitSpeed=(heroSlides.length-1)/((1-zoomEnd)*travel);
 const continuation=exitSpeed*slowdownDistance/3*(1-Math.pow(1-slowdownProgress,3));
 const targetPosition=baseSlide+Math.max(0,(p-zoomEnd)/(1-zoomEnd))*(heroSlides.length-1)+continuation;
 const dt=Math.min(40,now-(lastFrame||now-16));lastFrame=now;
 const ease=1-Math.exp(-dt/(opening?135:85));
 orbitPosition+=(targetPosition-orbitPosition)*ease;
 if(Math.abs(targetPosition-orbitPosition)<.0005)orbitPosition=targetPosition;
 const targetZoom=opening&&Math.abs(targetPosition-orbitPosition)>.025?1:clamp(p/zoomEnd);
 zoom+=(targetZoom-zoom)*ease;
 if(Math.abs(targetZoom-zoom)<.0005)zoom=targetZoom;
 if(opening&&zoom===0)opening=false;
 const nearest=Math.round(orbitPosition);
 if(((nearest%heroSlides.length)+heroSlides.length)%heroSlides.length!==slide)setSlide(nearest);
 // Use the original homepage stage height so settled cards match it exactly.
 const orbitH=h-116;
 const cardW=w*.55,cardH=Math.min(orbitH*.54,cardW*.72);
 const radius=Math.max(w*2.2,h*2.5),step=(cardH+cardW*.20+72)/radius;
 const activeX=w*.39+cardW/2,activeY=116+orbitH*.50;
 const fullCopyOpacity=clamp(1-zoom/.45);
 hero.style.setProperty('--preview-copy-opacity',fullCopyOpacity);
 hero.style.setProperty('--preview-image-slogan-opacity',1);
 document.body.classList.toggle('hero-preview-cover',zoom<.28&&hero.getBoundingClientRect().bottom>116);
 $('.hero-fullscreen-copy').inert=fullCopyOpacity<.5;
 $('.hero-fullscreen-copy').style.visibility=fullCopyOpacity===0?'hidden':'visible';
 const storyOpacity=clamp((zoom-.48)/.35);
 hero.style.setProperty('--story-opacity',storyOpacity);
 const valueOpacity=clamp(1-zoom*3);
 hero.style.setProperty('--value-opacity',valueOpacity);
 $('.hero-value').inert=valueOpacity<.5;$('.hero-value').style.visibility=valueOpacity===0?'hidden':'visible';
 $('.deck-story').inert=storyOpacity<.5;
 $('.deck-story').style.visibility=storyOpacity===0?'hidden':'visible';
 $('.hero-deck').style.pointerEvents='auto';
 const continuationOffset=positioning?hero.getBoundingClientRect().top-positioning.getBoundingClientRect().top:0;
 orbitCards.forEach((b,i)=>{
  const n=heroSlides.length,delta=((i-orbitPosition+n/2)%n+n)%n-n/2;
  const angle=delta*step;
  const x=activeX+radius*(Math.cos(angle)-1),y=activeY+radius*Math.sin(angle);
  const selected=Math.abs(delta)<.5;
  const fullX=selected?w/2:x,fullY=selected?h/2:(delta<0?-h:h*2);
  const width=selected?w+(cardW-w)*zoom:cardW;
  const height=selected?h+(cardH-h)*zoom:cardH;
  const left=fullX+(x-fullX)*zoom,cy=fullY+(y-fullY)*zoom;
  const rotation=angle*180/Math.PI*zoom;
  b.style.left=left+'px';b.style.top=cy+'px';b.style.width=width+'px';b.style.height=height+'px';
  b.style.setProperty('--orbit-tilt',rotation+'deg');
  const echo=orbitEchoes[i];
  if(echo){
   echo.style.left=left+'px';echo.style.top=(continuationOffset+cy)+'px';
   echo.style.width=width+'px';echo.style.height=height+'px';
   echo.style.setProperty('--echo-tilt',rotation+'deg');
  }
  // Scale type by the same ratio as the image; explicit lines prevent reflow mid-zoom.
  b.style.setProperty('--slogan-size',(Math.min(w*.074,125)*width/w)+'px');
  b.style.setProperty('--slogan-max',(selected?(w*.56*(1-zoom)+cardW*.80*zoom):cardW*.80)+'px');
  b.style.setProperty('--slogan-inset',(selected?(w*.045*(1-zoom)+cardW*.05*zoom):cardW*.05)+'px');
  b.style.setProperty('--slogan-bottom',(selected?(h*.30*(1-zoom)+cardH*.11*zoom):cardH*.11)+'px');
  b.style.setProperty('--intro-opacity',selected?1-zoom:0);
  b.style.opacity='1';b.style.zIndex=selected?'3':'2';
  const visible=Math.abs(delta)<2.5;
  b.style.visibility=visible?'visible':'hidden';b.style.pointerEvents=visible?'auto':'none';
  b.tabIndex=visible&&(zoom>.85||selected)?0:-1;
 });
 syncImageHeader(orbitCards[slide], zoom);
 if(Math.abs(targetPosition-orbitPosition)>.0005||Math.abs(targetZoom-zoom)>.0005||opening)requestOrbit();
}
addEventListener('scroll',requestOrbit,{passive:true});addEventListener('resize',requestOrbit);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',requestOrbit);
setSlide(0);requestOrbit();
