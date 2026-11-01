import shortScreenStyles from '../styles/main/orbit-short-screen.css?inline';
import { brandHighlights as items } from '../data/brandHighlights';
import { arrowLinkMarkup } from '../components/links/arrowLink';
import arrowLinkStyles from '../styles/arrow-link.css?inline';
await customElements.whenDefined('orbit-explorer');
const explorer = /** @type {any} */ (document.querySelector('orbit-explorer'));
explorer.configure({brand:'Nordiska Solutions', collection:'NORDIC CLEANTECH / INTERNATIONAL GROWTH', kind:'Highlight', cta:'Explore the service', explore:'Explore the highlights', word:'FORWARD', meta:'Strategy / Partnership / Progress', type:'International growth', items});
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
// Use the original Header, Menu and navigation script from HighlightsPreviewBase.
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
const contextual=document.createElement('aside');
contextual.className='highlight-note';
contextual.setAttribute('aria-label','About this highlight');
explorer.stage.append(contextual);
const nativeUpdate=explorer.update.bind(explorer);
explorer.update=()=>{
 nativeUpdate();
 const item=explorer.items[explorer.current];
 const label=shadow.querySelector('.panel-label');
 label.textContent=item.name;
 const title=shadow.querySelector('.panel-title');
 title.textContent=item.panelHeading;
 shadow.querySelector('.panel-copy').textContent=item.description;
 const action=shadow.querySelector('.panel-action');
 const template=document.createElement('template');template.innerHTML=arrowLinkMarkup(item.cta,item.url);
 action.replaceWith(template.content.firstElementChild);
 contextual.replaceChildren();
 const kicker=document.createElement('p');kicker.className='highlight-note-label';kicker.textContent=`0${explorer.current+1} / ${item.name}`;
 const copy=document.createElement('p');copy.className='highlight-note-copy';copy.textContent=item.summary;
 contextual.append(kicker,copy);
 const templateLink=document.createElement('template');templateLink.innerHTML=arrowLinkMarkup(item.cta,item.url);
 contextual.append(templateLink.content);
 explorer.nav.querySelectorAll('button').forEach((button,i)=>{
  button.textContent=String(i+1).padStart(2,'0');button.setAttribute('aria-label',`Explore ${items[i].name}`);
 });
};
explorer.open=()=>window.location.assign(explorer.items[explorer.current].url);
explorer.update();
explorer._base=0;explorer._opening=false;
// Reuse BrandPositioning's existing orbit echoes and home.js continuation.
const positioning=document.querySelector('.positioning');
const orbitEchoes=[...document.querySelectorAll('.orbit-echo')];
orbitEchoes.forEach((echo,i)=>{if(items[i])echo.querySelector('img').src=items[i].editorialImage;else echo.hidden=true});
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
 headlineContext.font="500 100px Manrope";
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
 if(matchMedia('(max-width:760px)').matches)return;
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
 const cw=w*(mobile?.90:.59),ch=mobile?Math.min(h*.18,cw*.4):Math.min(h*.54,cw*.53);
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
  const headlineSpace=mobile?cardWidth-inset*2:mix(Math.max(1,w*.58-inset-40),cardWidth-inset*2,zoom);
  card.style.setProperty('--headline',Math.min(preferredHeadline,headlineSpace*100/Math.max(...headlineWidths))+'px');
  card.style.setProperty('--inset',mix(w*.045,cw*.05,zoom)+'px');card.style.setProperty('--bottom',mix((mobile?Math.max(h*.42,h-contextual.offsetTop+24):h*.17),ch*.11,zoom)+'px');
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

:host{--sticky-top:116px;--track-height:420svh}
.stage{top:var(--sticky-top);height:calc(100svh - var(--sticky-top))}
.left{left:5%!important;width:27%!important}
.panel-signal .panel-label{background:transparent!important;color:#2856a3!important;padding:0!important;font-size:11px!important;letter-spacing:.08em!important}
.panel-signal .panel-title{font-size:clamp(30px,3.05cqw,48px)!important;line-height:1.12!important}
.panel-signal .panel-copy{font-size:clamp(15px,1.15cqw,18px)!important;line-height:1.75!important}
.card:after{background:linear-gradient(180deg,#0a243c1a 10%,#0a243c15 35%,#0a243ca8 100%)}
.card img{filter:saturate(.72)}
.card-arrow{display:none}
.highlight-note{position:absolute;z-index:6;right:4.5%;bottom:17%;width:29%;max-width:380px;padding:26px 28px;background:#ffffffed;color:#112f50;border-top:3px solid #2856a3;opacity:var(--intro,1)}
.highlight-note-label{margin:0 0 16px;color:#2856a3;font:500 10px/1.5 'IBM Plex Mono',monospace;letter-spacing:.06em;text-transform:uppercase}
.highlight-note-copy{font-size:clamp(18px,1.65cqw,26px);line-height:1.4;letter-spacing:-.035em;margin:0 0 24px}
.highlight-note .nordiska-arrow-link{font-size:12px;gap:18px;justify-content:space-between;width:100%}
.highlight-note .nordiska-arrow-circle{width:34px;height:34px}
.highlight-note .nordiska-arrow-circle svg{width:20px;height:20px}
.nav{left:5%!important;width:27%!important;display:flex!important;gap:10px!important;bottom:6%!important}
.nav button{font:400 9px/1.5 'IBM Plex Mono',monospace!important;padding:10px 0 0!important;min-height:28px}
.intro-meta{left:4.5%;bottom:5%;gap:24px}
.intro-meta .mono{max-width:135px}
@container(max-width:1000px) and (min-width:701px){.highlight-note{width:31%;padding:20px}.highlight-note-copy{font-size:20px}.panel-signal .panel-title{font-size:30px!important}.panel-signal .panel-copy{font-size:14px!important}.nav button{font-size:10px!important}}
@container(max-width:760px){:host{--sticky-top:80px}}
@container(max-width:700px){
 :host{--sticky-top:80px;--track-height:390svh}
 .stage{top:var(--sticky-top);height:calc(100svh - var(--sticky-top));min-height:550px}
 .left{top:35px!important;left:6%!important;width:88%!important}
 .panel-signal .panel-label{margin-bottom:12px!important;font-size:10px!important}
 .panel-signal .panel-title{font-size:clamp(26px,7.5cqw,32px)!important;max-width:370px!important}
 .panel-signal .panel-copy{font-size:14px!important;line-height:1.65!important;margin:16px 0!important;max-width:400px}
 .panel-signal .nordiska-arrow-link{margin-top:0;font-size:13px}
 .highlight-note{left:6%;right:6%;bottom:14%;width:auto;max-width:none;padding:17px 19px}
 .highlight-note-label{font-size:9px;margin-bottom:8px}
 .highlight-note-copy{font-size:18px;line-height:1.4;margin-bottom:12px}
 .highlight-note .nordiska-arrow-link{font-size:12px}
 .nav{left:6%!important;width:88%!important;bottom:3%!important;gap:10px!important}
 .nav button{font-size:9px!important;min-height:28px}
 .intro-meta{left:6%;right:6%;bottom:3%;justify-content:space-between}
 .intro-meta .mono{font-size:7px;max-width:90px}
}
@media(prefers-reduced-motion:reduce){.highlight-note{transition:none}}

`;
shadow.append(refinements);
const shortScreenAdaptation=document.createElement('style');
shortScreenAdaptation.textContent=shortScreenStyles;
shadow.append(shortScreenAdaptation);
explorer.request();
