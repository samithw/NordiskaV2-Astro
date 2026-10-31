import { withBase } from '../../utils/paths';
import services from '../../data/services.json';
import industries from '../../data/industries.json';
const $ = s => document.querySelector(s);
const buttons = [];
const countries = ['Finland','Malaysia','India','Vietnam','Philippines','UAE'];
const menus = {
  about: {title:'Who we are',copy:'We take Nordic cleantech global. Nordiska Solutions turns regional innovation into international commercial impact.',links:[['About Nordiska','/about/'],['Our story','/about/#our-story'],['How we work','/about/#approach'],['Our values','/about/#values']],feature:['Explore our expertise →','/services/']},
  services: {title:'What we do',copy:'From research-driven market entry strategies to hands-on execution, we turn global ambitions into actionable growth plans.',links:[['All services','/services/'],...services.map(s=>[s.name,`/services/${s.slug}/`])],feature:['Explore market entry →','/services/market-entry-strategy/']},
  industries: {title:'Industries we serve',copy:'Specialized expertise for a sustainable future. We connect cleantech innovators with the markets, partners and projects that need them.',links:[['All industries','/industries/'],...industries.map(s=>[s.name,`/industries/${s.slug}/`])],feature:['Explore water & wastewater →','/industries/water-wastewater/']},
  locations: {title:'Our locations',copy:'International perspective, connected to local market knowledge. Explore our network across Europe, Asia and the Middle East.',links:[['Our global presence','/locations/'],...countries.map(c=>[`Nordiska ${c}`,`/locations/#${c.toLowerCase()}`])],feature:['Discuss your target market →','/contact/']},
  mobile: {title:'Explore Nordiska',copy:'Connecting technology with global opportunity.',links:[['Home','/'],['Who we are','/about/'],['What we do','/services/'],['Industries we serve','/industries/'],['Our locations','/locations/'],['Contact us','/contact/']],feature:['Explore our presence →','/locations/']}
};
let opener = null, key = null;
function closeMenu(){
  if($('#mega').hidden)return;
  $('#mega').hidden=true; document.body.classList.remove('menu-open');document.body.style.overflow='';
  $('main').inert=false;$('footer').inert=false;
  buttons.forEach(b=>b.setAttribute('aria-expanded','false'));key=null;opener?.focus();
  document.dispatchEvent(new CustomEvent('nordiska:menu-change',{detail:{open:false}}));
}
function openMenu(next,button){
  if(key===next){closeMenu();return;}
  key=next;opener=button;const m=menus[next];
  $('#menu-title').textContent=m.title;$('#menu-copy').textContent=m.copy;
  $('#menu-links').replaceChildren(...m.links.map(([label,href])=>{const a=document.createElement('a');a.href=withBase(href);a.append(document.createTextNode(label));const arrow=document.createElement('span');arrow.textContent='→';a.append(arrow);return a}));
  $('#menu-feature-link').href=withBase(m.feature[1]);$('#menu-feature-link').textContent=m.feature[0];
  $('#mega').hidden=false;document.body.classList.add('menu-open');document.body.style.overflow='hidden';
  $('main').inert=true;$('footer').inert=true;
  buttons.forEach(b=>b.setAttribute('aria-expanded',String(b===button)));$('.mega-close').focus();
  document.dispatchEvent(new CustomEvent('nordiska:menu-change',{detail:{open:true}}));
}
export function bindMenuButtons(root=document){
  root.querySelectorAll('[data-menu]').forEach(button=>{
    if(buttons.includes(button))return;
    buttons.push(button);
    button.addEventListener('click',()=>openMenu(button.dataset.menu,button));
  });
}
bindMenuButtons();
$('.mega-close').addEventListener('click',closeMenu);
$('#mega').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{
  if($('#mega').hidden)return;
  if(e.key==='Escape')closeMenu();
  if(e.key==='Tab'){
    const items=[...document.querySelectorAll('#mega a,#mega button')].filter(el=>el.getClientRects().length);
    const first=items[0],last=items.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
});
