import { withBase } from '../utils/paths';
import services from '../data/services.json';
import { servicePhotos } from '../data/servicePhotos';
import photos from '../data/photos.json';
import { arrowLinkMarkup } from '../components/links/arrowLink';
import arrowLinkStyles from '../styles/arrow-link.css?inline';
const image = n => withBase(`/vendor/signal-orbit/assets/signal-0${n}.jpg`);
const items = [
  {name:'Market entry', category:'Strategy & opportunity', headline:'Your next market.\nA clear way in.', editorialImage:image(1), description:'Growth starts with knowing where to go—and who to know. We evaluate your opportunity, shape your entry strategy and connect your technology with the people who can move it forward.', cta:'Explore market entry', url:withBase('/services/market-entry-strategy/'), tag:'MARKET ENTRY'},
  {name:'Partnerships', category:'The right connections', headline:'Close to the people\nwho matter.', editorialImage:image(2), description:'Every market has its own conversations, expectations and ways of doing business. We identify and evaluate customers, distributors and strategic partners, then help you build relationships with room to grow.', cta:'Find the right connections', url:withBase('/services/partner-search/'), tag:'PARTNERSHIPS'},
  {name:'Sales development', category:'Visibility & opportunity', headline:'From visibility\nto opportunity.', editorialImage:image(3), description:'A strong product needs a compelling position and the right conversations. We support your sales development, market communication and lead development to build commercial momentum.', cta:'Explore sales support', url:withBase('/services/market-activation/'), tag:'SALES DEVELOPMENT'},
  {name:'Local execution', category:'From strategy to action', headline:'A local presence.\nA lasting advantage.', editorialImage:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=88', description:'International growth takes practical follow-through. We work alongside your team to develop opportunities, strengthen sales channels and build partnerships with local market knowledge.', cta:'Build your market presence', url:withBase('/services/channel-sales-support/'), tag:'LOCAL EXECUTION'},
  {name:'Cleantech', category:'Innovation & impact', headline:'Good ideas deserve\nto go further.', editorialImage:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=88', description:'From water and waste to clean energy, we connect technology providers with commercial opportunities. Technical understanding helps align your solution with project requirements and the right stakeholders.', cta:'Discover our industries', url:withBase('/industries/'), tag:'CLEANTECH'}
];
await customElements.whenDefined('orbit-explorer');
const explorer = /** @type {any} */ (document.querySelector('orbit-explorer'));
explorer.configure({brand:'Nordiska Solutions', collection:'EXPERTISE IN MOTION', kind:'Service', cta:'Explore the service', explore:'Explore our expertise', word:'FORWARD', meta:'Strategy / Partnership / Progress', type:'International growth', items});
const shadow=explorer.shadowRoot;
const adaptation=document.createElement('style');
adaptation.textContent=`
/* Requested content adaptations only; all orbit styling and motion comes from Signal. */
:host .panel-signal .panel-figure{display:none}
:host .panel-signal .panel-copy{display:block;overflow:visible;-webkit-line-clamp:unset;max-height:none}
.topbar .brand{text-decoration:none}
.brand img{display:block;width:106px;height:55px;object-fit:contain;filter:brightness(0) invert(1)}
.stage[data-expanded] .brand img{filter:brightness(0) saturate(100%) invert(29%) sepia(35%) saturate(1747%) hue-rotate(185deg) brightness(95%) contrast(91%)}
.site-nav{display:flex;align-items:center;gap:clamp(16px,2.5vw,38px);font:600 12px Manrope,sans-serif}
.site-nav a{text-decoration:none}.site-nav a:hover{text-decoration:underline;text-underline-offset:5px}
.mobile-links{display:none}
@container(max-width:850px){.site-nav{gap:14px;font-size:10px}}
@container(max-width:700px){.site-nav{display:none}.mobile-links{display:block}.mobile-links summary{cursor:pointer;font-size:12px}.mobile-links nav{position:absolute;top:65px;left:0;right:0;display:grid;gap:0;background:var(--paper);color:var(--text);border-bottom:1px solid var(--line);padding:12px 6%}.mobile-links nav a{padding:12px 0;text-decoration:none;font-size:13px}.brand img{width:96px;height:48px}:host .panel-signal .panel-copy{display:block;font-size:11px;line-height:1.7;margin:12px 0}:host .panel-signal .panel-action{position:static}}
`;
shadow.append(adaptation);
const links=[['Home','/'],['Who We Are','/about/'],['What We Do','/services/'],['Industries We Serve','/industries/'],['Our Locations','/locations/'],['Contact us','/contact/']];
const linkMarkup=links.map(([label,url])=>`<a href="${withBase(url)}">${label}</a>`).join('');
shadow.querySelector('.topbar').innerHTML=`<a class="brand" href="${withBase('/')}" aria-label="Nordiska Solutions home"><img src="${withBase('/nordiska-logo.png')}" alt="Nordiska Solutions"></a><nav class="site-nav" aria-label="Main navigation">${linkMarkup}</nav><details class="mobile-links"><summary>Menu ☰</summary><nav aria-label="Mobile navigation">${linkMarkup}</nav></details>`;

// Nordiska interaction layer: keep the supplied Signal presentation and add
// the original homepage's click-to-full-screen behavior and contextual links.
const arrow='<span class="action-arrow" aria-hidden="true">↗</span>';
const relevant=[['go-to-market-strategy','partner-search'],['partner-search'],['market-activation','channel-sales-support'],['channel-sales-support']];
const industries=[['Water & wastewater','water-wastewater'],['Solid waste','solid-waste'],['Bioenergy','bioenergy'],['Green hydrogen','green-hydrogen'],['Solar energy','solar-energy']];
const contextual=document.createElement('aside');
contextual.className='contextual-links';contextual.setAttribute('aria-label','Relevant Nordiska expertise');
explorer.stage.append(contextual);
const nativeUpdate=explorer.update.bind(explorer);
explorer.update=()=>{
 nativeUpdate();
 const item=explorer.items[explorer.current];
 const action=shadow.querySelector('.panel-action');
 const template=document.createElement('template');template.innerHTML=arrowLinkMarkup(item.cta,item.url);
 action.replaceWith(template.content.firstElementChild);
 const industryPhotos=[photos.water,photos.waste,photos.bio,photos.hydrogen,photos.solar];
 const entries=explorer.current===4?industries.map(([name,slug],i)=>({name,url:withBase(`/industries/${slug}/`),photo:industryPhotos[i]})):relevant[explorer.current].map(slug=>{const service=services.find(s=>s.slug===slug);return{name:service.name,url:withBase(`/services/${slug}/`),photo:servicePhotos[slug]}});
 contextual.classList.toggle('industries-links',explorer.current===4);
 contextual.innerHTML=entries.map(({name,url,photo},i)=>`<a class="context-card" href="${url}"><small>IN FOCUS / ${String(i+1).padStart(2,'0')}</small><span class="context-photo"><img src="${photo}" alt="" /></span><span class="context-caption">${name}<span aria-hidden="true">↗</span></span></a>`).join('');
};
explorer.open=()=>window.location.assign(explorer.items[explorer.current].url);
explorer.update();
explorer._base=0;explorer._opening=false;
explorer.select=i=>{
 const count=explorer.items.length;
 explorer._base=Math.round(explorer.position+((i-explorer.position+count/2)%count+count)%count-count/2);
 explorer._opening=true;
 window.scrollTo({top:explorer.getBoundingClientRect().top+scrollY,behavior:'instant'});
 explorer.request();
};
explorer.cards.forEach((card,i)=>{card.onclick=()=>explorer.select(i);card.setAttribute('aria-label',`View ${items[i].name} full screen`)});
const clamp=v=>Math.max(0,Math.min(1,v));
const mix=(a,b,t)=>a+(b-a)*t;
explorer.render=function(now){
 this.frame=0;
 const w=this.stage.clientWidth,h=this.stage.clientHeight,mobile=w<=700;
 const travel=Math.max(1,this.track.offsetHeight-h),p=clamp(-this.track.getBoundingClientRect().top/travel);
 const target=this._base+clamp((p-.28)/.67)*(this.items.length-1);
 const dt=Math.min(40,now-(this.last||now-16));this.last=now;
 const ease=this.reduce.matches?1:1-Math.exp(-dt/85);
 this.position=mix(this.position,target,ease);
 if(Math.abs(this.position-target)<.0003)this.position=target;
 const z=this.reduce.matches?1:this._opening&&Math.abs(this.position-target)>.025?1:clamp(p/.22);
 this.zoom=mix(this.zoom,z,ease);
 if(Math.abs(this.zoom-z)<.0003)this.zoom=z;
 if(this.zoom===0)this._opening=false;
 const count=this.items.length,nearest=((Math.round(this.position)%count)+count)%count;
 if(nearest!==this.current){this.current=nearest;this.update()}
 const zoom=this.zoom,details=clamp((zoom-.6)/.38),intro=clamp(1-zoom*2.5);
 this.stage.style.setProperty('--details',details);this.stage.style.setProperty('--intro',intro);this.stage.style.setProperty('--bar',zoom);this.stage.style.setProperty('--progress',(p*100)+'%');
 this.stage.toggleAttribute('data-expanded',zoom>.12);
 this.left.classList.toggle('ready',details>.01);this.left.inert=details<.7;
 this.nav.classList.toggle('ready',details>.01);this.nav.inert=details<.7;
 for(const selector of ['.intro-meta','.teaser']){this.q(selector).inert=intro<.5;this.q(selector).style.visibility=intro===0?'hidden':'visible'}
 contextual.inert=intro<.5;contextual.style.visibility=intro===0?'hidden':'visible';
 const cw=w*(mobile?.90:.59),ch=mobile?Math.min(h*.26,cw*.58):Math.min(h*.54,cw*.53);
 const radius=Math.max(w*2.2,h*2.5),step=(ch+cw*.20+72)/radius;
 const ax=w*(mobile?.50:.665),ay=h*(mobile?.73:.48);
 this.cards.forEach((card,i)=>{
  const d=((i-this.position+count/2)%count+count)%count-count/2,angle=d*step;
  const x=mobile?ax:ax+radius*(Math.cos(angle)-1),y=mobile?ay:ay+radius*Math.sin(angle);
  const selected=Math.abs(d)<.5;
  card.style.width=(selected?mix(w,cw,zoom):cw)+'px';card.style.height=(selected?mix(h,ch,zoom):ch)+'px';
  card.style.left=mix(selected?w/2:x,x,zoom)+'px';card.style.top=mix(selected?h/2:(d<0?-h:2*h),y,zoom)+'px';
  card.style.setProperty('--tilt',(angle*180/Math.PI*zoom)+'deg');card.style.setProperty('--radius',(2*zoom)+'px');
  card.style.setProperty('--headline',mix(Math.min(w*(mobile?.14:.074),125),Math.min(w*(mobile?.075:.032),48),zoom)+'px');
  card.style.setProperty('--inset',mix(w*.045,cw*.05,zoom)+'px');card.style.setProperty('--bottom',mix(h*(mobile?.45:.21),ch*.11,zoom)+'px');
  card.querySelector('.card-top').style.top=mix(mobile?100:112,ch*.09,zoom)+'px';card.classList.toggle('full',zoom<.65);card.style.zIndex=selected?'3':'2';
  const visible=Math.abs(d)<2.2&&(!mobile||selected||zoom<.4);card.style.visibility=visible?'visible':'hidden';card.tabIndex=visible&&selected?0:-1;
 });
 if(this.position!==target||this.zoom!==z)this.request();
};
const refinements=document.createElement('style');
refinements.textContent=arrowLinkStyles+`
.site-nav,.mobile-links{color:#fff;font-weight:500;transition:color .2s}
.stage[data-expanded] .site-nav,.stage[data-expanded] .mobile-links{color:#2856a3}
.brand img{filter:brightness(0) invert(1)}
.stage[data-expanded] .brand img{filter:brightness(0) saturate(100%) invert(29%) sepia(35%) saturate(1747%) hue-rotate(185deg) brightness(95%) contrast(91%)}
.panel-signal .nordiska-arrow-link{margin-top:10px}
.teaser{display:none!important}
.contextual-links{position:absolute;z-index:6;right:4%;bottom:17%;width:32%;display:grid;grid-template-columns:repeat(2,minmax(0,180px));justify-content:end;align-items:start;gap:24px;opacity:var(--intro,1)}
.context-card{display:block;min-width:0;text-align:left;color:#f1f2e9;text-decoration:none}
.context-card:only-child{grid-column:2}
.context-card small{display:block;margin-bottom:10px;font:9px/1.5 'IBM Plex Mono',monospace;letter-spacing:.1em}
.context-photo{display:block;overflow:hidden;aspect-ratio:4/3}
.context-photo img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s,filter .35s}
.context-caption{display:flex;align-items:start;justify-content:space-between;gap:10px;margin-top:12px;font:500 18px/1.2 Manrope,sans-serif;letter-spacing:-.035em}
.context-caption>span{flex-shrink:0;font-size:30px;line-height:1;transition:transform .25s}
.context-card:hover img{transform:scale(1.045);filter:brightness(1.08)}
.context-card:hover .context-caption>span{transform:translate(3px,-3px)}
.context-card:focus-visible{outline:2px solid white;outline-offset:6px}
.contextual-links.industries-links{grid-template-columns:repeat(2,minmax(0,150px));gap:18px 24px;bottom:15%}
.industries-links .context-photo{aspect-ratio:2/1}
.industries-links .context-caption{font-size:14px;margin-top:8px}
.industries-links .context-card:last-child{grid-column:2}
.industries-links .context-card small{font-size:8px;margin-bottom:6px}
@container(max-width:700px){.contextual-links{bottom:17%;width:76%;grid-template-columns:repeat(2,minmax(0,135px));gap:16px}.context-caption{font-size:12px;margin-top:8px}.context-caption>span{font-size:23px}.context-card small{font-size:7px;margin-bottom:6px}.contextual-links.industries-links{bottom:15%;width:76%;grid-template-columns:repeat(2,minmax(0,125px));gap:12px 16px}.industries-links .context-caption{font-size:11px}.industries-links .context-photo{aspect-ratio:3/1}.industries-links .context-card small{display:none}.panel-signal .nordiska-arrow-link{font-size:14px;gap:22px}.nordiska-arrow-circle{width:46px;height:46px}}
@media(prefers-reduced-motion:reduce){.context-photo img,.context-caption>span,.site-nav,.mobile-links{transition:none}}
`;
shadow.append(refinements);
explorer.request();
