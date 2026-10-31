import { withBase } from '../../utils/paths';
import services from '../../data/services.json';
import { servicePhotos } from '../../data/servicePhotos';
import photos from '../../data/photos.json';
import { arrowLinkMarkup } from '../../components/main/links/arrowLink';
import arrowLinkStyles from '../../styles/main/arrow-link.css?inline';
const image = n => withBase(`/vendor/signal-orbit/assets/signal-0${n}.jpg`);
const items = [
  {name:'Market entry', category:'Strategy & opportunity', headline:'Your next market.\nA clear way in.', editorialImage:image(1), description:'We assess demand, competition and routes to market, then shape an entry plan with the positioning and priorities your technology needs to get started.', cta:'Explore market entry', url:withBase('/services/market-entry-strategy/'), tag:'MARKET ENTRY'},
  {name:'Partnerships', category:'The right connections', headline:'Close to the people\nwho matter.', editorialImage:image(2), description:'We identify and evaluate customers, distributors and strategic partners, helping you build relationships with the people who can represent your technology in a new market.', cta:'Find the right connections', url:withBase('/services/partner-search/'), tag:'PARTNERSHIPS'},
  {name:'Sales development', category:'Visibility & opportunity', headline:'From visibility\nto opportunity.', editorialImage:image(3), description:'We support your market communication, lead development and sales channels, helping your team reach potential buyers and develop promising conversations into commercial opportunities.', cta:'Explore sales support', url:withBase('/services/market-activation/'), tag:'SALES DEVELOPMENT'},
  {name:'Local execution', category:'From strategy to action', headline:'A local presence.\nA lasting advantage.', editorialImage:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=88', description:'We help partners and customers work confidently with your technology through application consultancy, on-site training and aftersales support, with practical guidance beyond the first sale.', cta:'Build your market presence', url:withBase('/services/channel-sales-support/'), tag:'LOCAL EXECUTION'},
  {name:'Cleantech', category:'Innovation & impact', headline:'Good ideas deserve\nto go further.', editorialImage:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=88', description:'Explore applications in water, wastewater, solid waste and clean energy, and see how our technical understanding connects your solution with customer needs and project requirements.', cta:'Discover our industries', url:withBase('/industries/'), tag:'CLEANTECH'}
];
const needHeadings = [
 ['Find the right approach', 'to entering a new market.'],
 ['Build a network of partners', 'suited to your business.'],
 ['Turn interest in your technology', 'into sales opportunities.'],
 ['Give your local teams', 'the support they need.'],
 ['Discover where your technology', 'can make a difference.'],
];
await customElements.whenDefined('orbit-explorer');
const explorer = /** @type {any} */ (document.querySelector('orbit-explorer'));
explorer.configure({brand:'Nordiska Solutions', collection:'EXPERTISE IN MOTION', kind:'Service', cta:'Explore the service', explore:'Explore our expertise', word:'FORWARD', meta:'Strategy / Partnership / Progress', type:'International growth', items});
const shadow=explorer.shadowRoot;
const adaptation=document.createElement('style');
adaptation.textContent=`
/* Content-preview typography; card slogans and image styling stay in the orbit component. */
:host .panel-signal .panel-figure{display:none}
:host .panel-signal .panel-label{display:inline-flex;width:max-content;max-width:100%;padding:12px 17px;margin-bottom:24px;background:#1c4dcc;color:white;font:500 12px/1.4 'IBM Plex Mono',monospace;letter-spacing:.025em;text-transform:uppercase}
:host .panel-signal .panel-title{font-size:clamp(28px,2.52cqw,48px);line-height:1.12;letter-spacing:-.05em;max-width:none;font-weight:500}
:host .panel-signal .panel-title span{display:inline;white-space:normal}
:host .panel-signal .panel-copy{display:block;overflow:visible;-webkit-line-clamp:unset;max-height:none;font-size:clamp(15px,1.2vw,19px);line-height:1.6;font-weight:400;margin:24px 0 26px}
@container(max-width:700px){:host .panel-signal .panel-title{font-size:clamp(26px,8.2cqw,32px)}:host .panel-signal .panel-label{font-size:10px;padding:9px 13px;margin-bottom:16px}:host .panel-signal .panel-copy{display:block;font-size:15px;line-height:1.6;margin:16px 0 18px}:host .panel-signal .panel-action{position:static}}
@media(max-height:740px) and (min-width:701px){:host .panel-signal .panel-copy{margin:18px 0;font-size:16px}:host .panel-signal .panel-label{margin-bottom:18px}}
`;
shadow.append(adaptation);
const links=[['Home','/'],['Who We Are','/about/'],['What We Do','/services/'],['Industries We Serve','/industries/'],['Our Locations','/locations/'],['Contact us','/contact/']];
const linkMarkup=links.map(([label,url])=>`<a href="${withBase(url)}">${label}</a>`).join('');
// Keep navigation outside the clipped, sticky orbit stage so it persists below it.
const headerHost=document.createElement('div');
headerHost.className='signal-fixed-header';
const headerShadow=headerHost.attachShadow({mode:'open'});
const headerStyles=document.createElement('style');
headerStyles.textContent=`
:host{position:fixed;inset:0 0 auto;z-index:60;display:block;font-family:Manrope,sans-serif}
*{box-sizing:border-box}
.topbar{position:relative;isolation:isolate;height:80px;color:white;background:transparent;border-bottom:1px solid transparent;transition:background .2s,color .2s,border-color .2s}
.topbar::before{content:'';position:absolute;inset:0 0 -40px;z-index:-1;pointer-events:none;background:linear-gradient(180deg,rgba(16,43,83,.32) 0%,rgba(16,43,83,.18) 65%,rgba(16,43,83,0) 100%);transition:opacity .2s}
.nav-inner{height:100%;width:100%;max-width:1440px;margin:0 auto;padding:0 var(--pad,clamp(22px,5vw,90px));display:flex;align-items:center;justify-content:space-between;gap:24px}
a{color:inherit;text-decoration:none;touch-action:manipulation}
.brand{display:block;flex:none}.brand img{display:block;width:106px;height:55px;object-fit:contain;filter:brightness(0) invert(1)}
.site-nav{display:flex;align-items:center;gap:clamp(16px,2.5vw,38px);font-size:12px;font-weight:500;text-shadow:0 1px 5px rgba(16,43,83,.24)}
.site-nav a:hover{text-decoration:underline;text-underline-offset:5px}
a:focus-visible,summary:focus-visible{outline:2px solid currentColor;outline-offset:5px}
.mobile-links{display:none}
.topbar[data-expanded]{color:#2856a3;background:#eaf0f7;border-bottom-color:#bdcee2}
.topbar[data-expanded]::before{opacity:0}
.topbar[data-expanded] .site-nav{text-shadow:none}
.topbar[data-expanded] .brand img{filter:brightness(0) saturate(100%) invert(29%) sepia(35%) saturate(1747%) hue-rotate(185deg) brightness(95%) contrast(91%)}
@media(max-width:850px){.site-nav{gap:14px;font-size:10px}}
@media(max-width:700px){.topbar{height:65px}.site-nav{display:none}.brand img{width:96px;height:48px}.mobile-links{display:block;font-size:12px}.mobile-links summary{cursor:pointer;touch-action:manipulation}.mobile-links nav{position:absolute;top:65px;left:0;right:0;display:grid;background:#eaf0f7;color:#2856a3;border-bottom:1px solid #bdcee2;padding:12px var(--pad,22px);max-height:calc(100svh - 65px);overflow-y:auto}.mobile-links nav a{padding:12px 0;font-size:13px}}
@media(prefers-reduced-motion:reduce){.topbar,.topbar::before{transition:none}}
`;
const fixedHeader=shadow.querySelector('.topbar');
fixedHeader.innerHTML=`<div class="nav-inner"><a class="brand" href="${withBase('/')}" aria-label="Nordiska Solutions home"><img src="${withBase('/nordiska-logo.png')}" alt="Nordiska Solutions"></a><nav class="site-nav" aria-label="Main navigation">${linkMarkup}</nav><details class="mobile-links"><summary>Menu ☰</summary><nav aria-label="Mobile navigation">${linkMarkup}</nav></details></div>`;
headerShadow.append(headerStyles,fixedHeader);
document.body.prepend(headerHost);
const mobileMenu=headerShadow.querySelector('.mobile-links');
mobileMenu.addEventListener('click',event=>{if(event.target.closest('a'))mobileMenu.open=false});
mobileMenu.addEventListener('keydown',event=>{if(event.key==='Escape'){mobileMenu.open=false;mobileMenu.querySelector('summary').focus()}});

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
 const label=shadow.querySelector('.panel-label');
 label.textContent=item.name;
 const title=shadow.querySelector('.panel-title');
 title.textContent=needHeadings[explorer.current].join(' ');
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
 window.scrollTo({top:explorer.getBoundingClientRect().top+scrollY,behavior:'instant'});
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
 const travel=Math.max(1,this.track.offsetHeight-h),p=clamp(-this.track.getBoundingClientRect().top/travel);
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
 fixedHeader.toggleAttribute('data-expanded',zoom>.12||this.track.getBoundingClientRect().bottom<=h);
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
  card.style.setProperty('--headline',Math.min(preferredHeadline,headlineSpace*100/Math.max(...headlineWidths))+'px');
  card.style.setProperty('--inset',mix(w*.045,cw*.05,zoom)+'px');card.style.setProperty('--bottom',mix((mobile?Math.max(h*.45,h-contextual.offsetTop+24):h*.21),ch*.11,zoom)+'px');
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
.contextual-links{--context-card-width:min(180px,calc((32cqw - 24px)/2));--context-gap:24px;position:absolute;z-index:6;right:4%;bottom:17%;width:32%;display:grid;grid-template-columns:repeat(2,var(--context-card-width));justify-content:end;align-items:stretch;gap:24px;opacity:var(--intro,1)}
.context-card{display:flex;flex-direction:column;min-width:0;text-align:left;color:#2856a3;text-decoration:none;background:#eaf0f7;border:1px solid #bdcee2;box-shadow:0 4px 16px #102b5318;transition:border-color .2s,box-shadow .2s}
.context-card:only-child{grid-column:2}
.context-card small{display:block;margin-bottom:10px;font:9px/1.5 'IBM Plex Mono',monospace;letter-spacing:.1em}
.context-photo{display:block;width:100%;flex-shrink:0;overflow:hidden;aspect-ratio:4/3;max-height:12svh}
.context-photo img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s,filter .35s}
.context-caption{display:flex;align-items:start;justify-content:space-between;gap:10px;flex:1;padding:14px 12px;margin:0;background:#eaf0f7;transition:background .2s;font:500 clamp(12px,calc(var(--context-card-width) * .1),18px)/1.25 Manrope,sans-serif;overflow-wrap:anywhere;letter-spacing:-.035em}
.context-caption>span{flex-shrink:0;font-size:22px;line-height:1;transition:transform .25s}
.context-card:hover{border-color:#8baecf;box-shadow:0 6px 20px #102b532b}
.context-card:hover .context-caption{background:#dce9f5}
.context-card:hover img{transform:scale(1.045);filter:brightness(1.08)}
.context-card:hover .context-caption>span{transform:translate(3px,-3px)}
.context-card:focus-visible{outline:2px solid #fff;outline-offset:4px;box-shadow:0 0 0 7px #2856a3}
/* All contextual links share one two-column grid, including industries. */
@container(max-width:700px){.contextual-links{--context-card-width:min(135px,calc((92cqw - 32px)/3));--context-gap:16px;bottom:17%;width:76%;grid-template-columns:repeat(2,var(--context-card-width));gap:var(--context-gap)}.context-caption{font-size:12px;padding:10px;gap:6px}.context-caption>span{font-size:18px}.context-card small{font-size:7px;margin-bottom:6px}.panel-signal .nordiska-arrow-link{font-size:14px;gap:22px}.panel-signal .nordiska-arrow-circle{width:42px;height:42px}}
@container(max-width:700px){.contextual-links.industries-links{width:calc(3 * var(--context-card-width) + 2 * var(--context-gap));grid-template-columns:repeat(3,var(--context-card-width))}}
@media(prefers-reduced-motion:reduce){.context-card,.context-caption,.context-photo img,.context-caption>span{transition:none}}
`;
shadow.append(refinements);
explorer.request();
