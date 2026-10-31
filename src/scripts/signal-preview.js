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
:host .panel-signal .panel-copy{display:block;overflow:visible;-webkit-line-clamp:unset;max-height:none;font-size:16px;font-weight:400}
@container(max-width:700px){:host .panel-signal .panel-copy{display:block;font-size:14px;line-height:1.7;margin:12px 0}:host .panel-signal .panel-action{position:static}}
`;
shadow.append(adaptation);
// All concepts use the current main site's shared navigation.
shadow.querySelector('.topbar').remove();
const pageHeader=document.querySelector('header');
const syncHeaderHeight=()=>{
 explorer.style.setProperty('--sticky-top',pageHeader.offsetHeight+'px');
 explorer.request();
};
new ResizeObserver(syncHeaderHeight).observe(pageHeader);
syncHeaderHeight();

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
 contextual.innerHTML=entries.map(({name,url,photo})=>`<a class="context-card" href="${url}"><span class="context-photo"><img src="${photo}" alt="" /></span><span class="context-caption">${name}<span aria-hidden="true">↗</span></span></a>`).join('');
};
explorer.open=()=>window.location.assign(explorer.items[explorer.current].url);
explorer.update();
explorer._base=0;explorer._opening=false;
// Reuse BrandPositioning's existing orbit echoes and home.js continuation.
const positioning=document.querySelector('.positioning');
const orbitEchoes=[...document.querySelectorAll('.orbit-echo')];
orbitEchoes.forEach((echo,i)=>{echo.querySelector('img').src=items[i].editorialImage});
explorer.select=i=>{
 const count=explorer.items.length;
 explorer._base=Math.round(explorer.position+((i-explorer.position+count/2)%count+count)%count-count/2);
 explorer._opening=true;
 window.scrollTo({top:explorer.getBoundingClientRect().top+scrollY-(parseFloat(getComputedStyle(explorer.stage).top)||0),behavior:'instant'});
 explorer.request();
};
explorer.cards.forEach((card,i)=>{card.onclick=()=>explorer.select(i);card.setAttribute('aria-label',`View ${items[i].name} full screen`)});
// Measure the intended lines once, then fit them to each animated card.
const headlineContext=document.createElement('canvas').getContext('2d');
let headlineWidths=[];
const measureHeadlines=()=>{
 headlineContext.font="600 100px 'Barlow Condensed'";
 headlineWidths=items.map(item=>Math.max(...item.headline.split('\n').map(line=>headlineContext.measureText(line).width)));
};
explorer.cards.forEach((card,i)=>{
 const headline=card.querySelector('.headline');
 headline.replaceChildren(...items[i].headline.split('\n').map(line=>{
  const span=document.createElement('span');span.textContent=line;return span;
 }));
});
measureHeadlines();
document.fonts.ready.then(()=>{measureHeadlines();explorer.request()});
const clamp=v=>Math.max(0,Math.min(1,v));
const mix=(a,b,t)=>a+(b-a)*t;
explorer.render=function(now){
 this.frame=0;
 const w=this.stage.clientWidth,h=this.stage.clientHeight,mobile=w<=700;
 const stickyTop=parseFloat(getComputedStyle(this.stage).top)||0;
 const travel=Math.max(1,this.track.offsetHeight-h),p=clamp((stickyTop-this.track.getBoundingClientRect().top)/travel);
 // Same exit-speed easing as the original homepage's renderOrbit.
 const desktopOrbit=w>760&&!this.reduce.matches;
 const slowdownDistance=positioning?Math.max(1,h+positioning.offsetHeight*.85):1;
 const afterHero=Math.max(0,-this.track.getBoundingClientRect().top-travel);
 const slowdownProgress=positioning?clamp(afterHero/slowdownDistance):0;
 const exitSpeed=(this.items.length-1)/(.67*travel);
 const continuation=desktopOrbit?exitSpeed*slowdownDistance/3*(1-Math.pow(1-slowdownProgress,3)):0;
 const target=this._base+clamp((p-.28)/.67)*(this.items.length-1)+continuation;
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
 const continuationOffset=positioning?this.stage.getBoundingClientRect().top-positioning.getBoundingClientRect().top:0;
 this.cards.forEach((card,i)=>{
  const d=((i-this.position+count/2)%count+count)%count-count/2,angle=d*step;
  const x=mobile?ax:ax+radius*(Math.cos(angle)-1),y=mobile?ay:ay+radius*Math.sin(angle);
  const selected=Math.abs(d)<.5;
  card.style.width=(selected?mix(w,cw,zoom):cw)+'px';card.style.height=(selected?mix(h,ch,zoom):ch)+'px';
  card.style.left=mix(selected?w/2:x,x,zoom)+'px';card.style.top=mix(selected?h/2:(d<0?-h:2*h),y,zoom)+'px';
  card.style.setProperty('--tilt',(angle*180/Math.PI*zoom)+'deg');card.style.setProperty('--radius',(2*zoom)+'px');
  const cardWidth=selected?mix(w,cw,zoom):cw;
  const inset=mix(w*.045,cw*.05,zoom);
  const preferredHeadline=mix(Math.min(w*(mobile?.14:.074),125),Math.min(w*(mobile?.075:.032),48),zoom);
  const headlineSpace=mobile?cardWidth-inset*2:mix(Math.max(1,contextual.offsetLeft-inset-32),cardWidth-inset*2,zoom);
  card.style.setProperty('--headline',Math.min(preferredHeadline,headlineSpace*100/headlineWidths[i])+'px');
  card.style.setProperty('--inset',mix(w*.045,cw*.05,zoom)+'px');card.style.setProperty('--bottom',mix(h*(mobile?.45:.21),ch*.11,zoom)+'px');
  card.querySelector('.card-top').style.top=mix(mobile?100:112,ch*.09,zoom)+'px';card.classList.toggle('full',zoom<.65);card.style.zIndex=selected?'3':'2';
  const echo=orbitEchoes[i];
  if(echo){
   if(desktopOrbit){
    echo.style.left=card.style.left;
    echo.style.top=(continuationOffset+parseFloat(card.style.top))+'px';
    echo.style.width=card.style.width;echo.style.height=card.style.height;
    echo.style.setProperty('--echo-tilt',(angle*180/Math.PI*zoom)+'deg');
   }else echo.removeAttribute('style');
  }
  const visible=Math.abs(d)<2.2&&(!mobile||selected||zoom<.4);card.style.visibility=visible?'visible':'hidden';card.tabIndex=visible&&selected?0:-1;
 });
 if(this.position!==target||this.zoom!==z)this.request();
};
const refinements=document.createElement('style');
refinements.textContent=arrowLinkStyles+`
.progress,.edge-label,.card-top{display:none}
.panel-signal .nordiska-arrow-link{margin-top:10px}
.panel-signal .nordiska-arrow-circle{width:42px;height:42px}
.panel-signal .nordiska-arrow-circle svg{width:27px;height:27px}
.card-caption{right:var(--inset,30px);max-width:none}
.card-caption h2{max-width:none}
.card-caption .headline>span{display:block;white-space:nowrap}
.teaser{display:none!important}
.contextual-links{position:absolute;z-index:6;right:4%;bottom:17%;width:32%;display:grid;grid-template-columns:repeat(2,minmax(0,180px));justify-content:end;align-items:stretch;gap:24px;opacity:var(--intro,1)}
.context-card{display:flex;flex-direction:column;min-width:0;text-align:left;color:#2856a3;text-decoration:none;background:#eaf0f7;border:1px solid #bdcee2;box-shadow:0 4px 16px #102b5318;transition:border-color .2s,box-shadow .2s}
.context-card:only-child{grid-column:2}
.context-card small{display:block;margin-bottom:10px;font:9px/1.5 'IBM Plex Mono',monospace;letter-spacing:.1em}
.context-photo{display:block;width:100%;flex-shrink:0;overflow:hidden;aspect-ratio:4/3}
.context-photo img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s,filter .35s}
.context-caption{display:flex;align-items:start;justify-content:space-between;gap:10px;flex:1;padding:14px 12px;margin:0;background:#eaf0f7;transition:background .2s;font:500 18px/1.25 Manrope,sans-serif;letter-spacing:-.035em}
.context-caption>span{flex-shrink:0;font-size:22px;line-height:1;transition:transform .25s}
.context-card:hover{border-color:#8baecf;box-shadow:0 6px 20px #102b532b}
.context-card:hover .context-caption{background:#dce9f5}
.context-card:hover img{transform:scale(1.045);filter:brightness(1.08)}
.context-card:hover .context-caption>span{transform:translate(3px,-3px)}
.context-card:focus-visible{outline:2px solid #fff;outline-offset:4px;box-shadow:0 0 0 7px #2856a3}
/* Reuse the service card sizing; only the five-card arrangement differs. */
.contextual-links.industries-links{width:min(92%,588px);grid-template-columns:repeat(6,minmax(0,78px));gap:24px;bottom:15%}
.industries-links .context-card{grid-column:span 2}
.industries-links .context-card:nth-child(1){grid-column:3 / span 2}
.industries-links .context-card:nth-child(2){grid-column:5 / span 2}
@container(max-width:700px){.contextual-links{bottom:17%;width:76%;grid-template-columns:repeat(2,minmax(0,135px));gap:16px}.context-caption{font-size:12px;padding:10px;gap:6px}.context-caption>span{font-size:18px}.context-card small{font-size:7px;margin-bottom:6px}.contextual-links.industries-links{bottom:12%;width:92%;grid-template-columns:repeat(6,minmax(0,59.5px));gap:16px}.panel-signal .nordiska-arrow-link{font-size:14px;gap:22px}.panel-signal .nordiska-arrow-circle{width:42px;height:42px}}
@media(prefers-reduced-motion:reduce){.context-card,.context-caption,.context-photo img,.context-caption>span{transition:none}}
`;
shadow.append(refinements);
explorer.request();
