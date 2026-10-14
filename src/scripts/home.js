import { withBase } from '../utils/paths';
const industryRoutes=['/industries/water-wastewater/','/industries/solid-waste/','/industries/bioenergy/','/industries/green-hydrogen/','/industries/solar-energy/'].map(withBase);
const serviceRoutes=['/services/go-to-market-strategy/','/services/partner-search/','/services/market-activation/','/services/','/services/application-consultancy/','/services/on-site-training/','/services/aftersales-services/','/services/market-entry-strategy/'].map(withBase);

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const photos={
fjord:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=88',
coast:'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2000&q=88',
mountains:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=88',
wind:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=88',
city:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=85',
people:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85',
office:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
strategy:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85',
sales:'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=85',
water:'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1200&q=85',
waste:'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=85',
bio:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85',
hydrogen:'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=85',
solar:'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=85',
forest:'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=88',
lake:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=88',
desert:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2000&q=88',
peaks:'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=88'};
const heroSlides=[
{photo:'fjord',label:'01 / MARKET ENTRY',title:'Make the next market <span>yours.</span>',short:'Make the next market yours.',copy:'Identify the right market, shape your entry strategy and find a clear route to new customers.',service:0,category:'Market entry & go-to-market strategy',action:'Explore market entry',alt:'Quiet alpine lake beneath distant mountains'},
{photo:'coast',label:'02 / PARTNERSHIPS',title:'Local insight. <span>Global possibility.</span>',short:'Local insight. Global possibility.',copy:'Connect with customers, distributors and strategic partners who are right for your technology—and your ambition.',service:1,category:'Partner & customer search',action:'Find the right connections',alt:'Minimal coastline meeting the open sea'},
{photo:'mountains',label:'03 / SALES DEVELOPMENT',title:'Build growth that <span>lasts.</span>',short:'Build growth that lasts.',copy:'Turn market visibility into meaningful conversations with focused sales development, positioning and local support.',service:2,category:'International sales & marketing',action:'Explore sales support',alt:'Layered mountain landscape beneath a pale sky'},
{photo:'lake',label:'04 / LOCAL EXECUTION',title:'Stronger together, <span>across borders.</span>',short:'Stronger together, across borders.',copy:'Move from strategy to action with hands-on support for opportunities, sales channels and partnerships in your next market.',service:3,category:'Business development',action:'Build your market presence',alt:'Mountain lake framed by forested slopes'},
{photo:'wind',label:'05 / CLEANTECH',title:'Turn ambition into <span>impact.</span>',short:'Turn ambition into impact.',copy:'Bring water, waste and clean energy solutions closer to the projects, partners and customers that need them.',service:null,category:'Industry expertise for cleantech',action:'Discover our industries',alt:'Electricity transmission towers across an open landscape'}
];
const heroDetails=[
['Your next market. A clear way in.','Growth starts with knowing where to go—and who to know. We evaluate your opportunity, shape your entry strategy and connect your technology with the people who can move it forward.','Explore market entry','#services'],
['Close to the people who matter.','Every market has its own conversations, expectations and ways of doing business. We identify and evaluate customers, distributors and strategic partners, then help you build relationships with room to grow.','Find the right connections','#services'],
['From visibility to opportunity.','A strong product needs a compelling position and the right conversations. We support your sales development, market communication and lead development to build commercial momentum.','Explore sales support','#services'],
['A local presence. A lasting advantage.','International growth takes practical follow-through. We work alongside your team to develop opportunities, strengthen sales channels and build partnerships with local market knowledge.','Build your market presence','#services'],
['Good ideas deserve to go further.','From water and waste to clean energy, we connect technology providers with commercial opportunities. Technical understanding helps align your solution with project requirements and the right stakeholders.','Discover our industries','#industries']
];
$('.deck-pagination').insertAdjacentHTML('beforebegin','<a class="story-link" id="story-link" href="#services">Explore our expertise <span>↗</span></a>');
$('.hero-images').innerHTML=heroSlides.map((s,i)=>`<img data-photo="${s.photo}" alt="${s.alt}"${i===0?' class="active"':''}>`).join('');
$('.deck-cards').innerHTML=heroSlides.map((s,i)=>`<button class="deck-card" data-slide="${i}" aria-pressed="${i===0}" aria-label="Show ${s.short} full screen"><img data-photo="${s.photo}" alt=""><span class="deck-index">NORDISKA — ${s.label}</span><strong>${s.short}</strong><span class="deck-arrow">↗</span><span class="card-scroll">SCROLL TO EXPLORE YOUR NEXT OPPORTUNITY ↓</span></button>`).join('');
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
const sectors=[
['Water & wastewater','Making the right connections for better water solutions.','We help water technology providers connect with end users, EPC contractors and engineering partners. Technical understanding aligns the right technology with real project requirements.','water'],
['Solid waste','Create commercial value from resource recovery.','We support companies in recycling, reuse, material recovery and waste-to-value applications, connecting them with buyers, operators, contractors and project opportunities.','waste'],
['Bioenergy','Bring bioenergy innovation to new markets.','Connect with project developers, utilities, industrial customers and strategic partners through market insight and hands-on business development.','bio'],
['Green hydrogen','Find your place in an emerging market.','Commercial strategy, application understanding and local networks help hydrogen technology companies identify viable opportunities and build market presence.','hydrogen'],
['Solar energy','Build new opportunities for solar technology.','We support solar technology companies with partner search, customer development and international sales. Nordiska enables the commercial growth of technology providers.','solar']];
let sectorIndex=0;
const sectorSpecialisms=['Water treatment|Wastewater|Project partners','Recycling|Resource recovery|Waste-to-value','Biomass|Project development|Industrial applications','Market strategy|Application fit|Local networks','Partner search|Customer development|International sales'];
$('#industry-tabs').innerHTML=sectors.map((s,i)=>'<button role="tab" id="sector-'+i+'" aria-controls="industry-panel" aria-label="'+s[0]+'" data-sector="'+i+'"><img src="'+photos[s[3]]+'" loading="lazy" alt=""><span class="sector-number">0'+(i+1)+'</span><span class="sector-name">'+s[0]+'</span><span class="sector-invite" aria-hidden="true">EXPLORE THE POSSIBILITIES <span>↗</span></span></button>').join('');
function selectSector(i){sectorIndex=i;const s=sectors[i];$$('[data-sector]').forEach((b,j)=>{b.classList.toggle('active',j===i);b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1});$('#industry-more').href=industryRoutes[i];$('#industry-panel').setAttribute('aria-labelledby','sector-'+i);$('#industry-label').textContent=s[0];$('#industry-title').textContent=s[1];$('#industry-copy').textContent=s[2];$('#industry-number').textContent='0'+(i+1);$('#industry-specialisms').innerHTML=sectorSpecialisms[i].split('|').map(t=>'<span>'+t+'</span>').join('')}
$$('[data-sector]').forEach((b,i)=>{b.onclick=()=>selectSector(i);b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?4:(i+(e.key==='ArrowRight'?1:4))%5;selectSector(n);$$('[data-sector]')[n].focus()}});selectSector(0);




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
 $('#hero-headline').innerHTML=s.title;$('#hero-description').textContent=s.copy;
 $('#deck-title').textContent=detail[0];$('#deck-description').textContent=detail[1];
 $('#story-link').innerHTML=detail[2]+' <span>↗</span>';$('#story-link').href=slide===0?serviceRoutes[7]:(s.service===null?withBase('/industries/'):serviceRoutes[s.service]);
 const relevant=heroServiceGroups[slide];
 $('#hero-service-cards').replaceChildren(...relevant.map(slug=>{
  const source=heroCardTemplates.content.querySelector(`[data-hero-service="${slug}"] .service-card`);
  return source.cloneNode(true);
 }));
 $('#hero-service-cards').classList.toggle('single',relevant.length===1);
 
 
 $('#value-sectors').innerHTML=s.service===null?'<button data-hero-sector="0">Water & wastewater</button><button data-hero-sector="1">Solid waste</button><button data-hero-sector="2">Bioenergy</button>':'';
 $$('[data-hero-sector]').forEach(b=>b.onclick=()=>{selectSector(Number(b.dataset.heroSector));$('#industries').scrollIntoView({behavior:'smooth'})});
 $('#deck-label').textContent=s.label;$('#deck-count').textContent=String(slide+1).padStart(2,'0')+' / '+String(heroSlides.length).padStart(2,'0');
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
 if(!desktopOrbit()){
  orbitCards.forEach(b=>{b.removeAttribute('style');b.tabIndex=0});
  orbitEchoes.forEach(b=>b.removeAttribute('style'));
  $('.hero-value').inert=false;$('.hero-value').style.visibility='visible';
  hero.style.removeProperty('--story-opacity');return;
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
 const cardW=w*.55,cardH=Math.min(h*.54,cardW*.72);
 const radius=Math.max(w*2.2,h*2.5),step=(cardH+cardW*.20+72)/radius;
 const activeX=w*.39+cardW/2,activeY=h*.50;
 const storyOpacity=clamp((zoom-.60)/.34);
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
  b.style.setProperty('--slogan-size',(selected?(Math.min(w*.056,90)*(1-zoom)+Math.min(w*.038,61)*zoom):Math.min(w*.038,61))+'px');
  b.style.setProperty('--slogan-max',(selected?(w*.43*(1-zoom)+cardW*.80*zoom):cardW*.80)+'px');
  b.style.setProperty('--slogan-inset',(selected?(w*.05*(1-zoom)+cardW*.065*zoom):cardW*.065)+'px');
  b.style.setProperty('--slogan-bottom',(selected?(h*.23*(1-zoom)+cardH*.1*zoom):cardH*.1)+'px');
  b.style.setProperty('--intro-opacity',selected?1-zoom:0);
  b.style.opacity='1';b.style.zIndex=selected?'3':'2';
  const visible=Math.abs(delta)<2.5;
  b.style.visibility=visible?'visible':'hidden';b.style.pointerEvents=visible?'auto':'none';
  b.tabIndex=visible&&(zoom>.85||selected)?0:-1;
 });
 if(Math.abs(targetPosition-orbitPosition)>.0005||Math.abs(targetZoom-zoom)>.0005||opening)requestOrbit();
}
addEventListener('scroll',requestOrbit,{passive:true});addEventListener('resize',requestOrbit);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',requestOrbit);
setSlide(0);requestOrbit();
