const route=document.querySelector('.journey-route');
const svg=route.querySelector('.journey-path');
const paths=[...svg.querySelectorAll('path')];
const progress=svg.querySelector('.journey-path-progress');
const stages=[...route.querySelectorAll('.journey-stage')];
const links=[...document.querySelectorAll('[data-stage-link]')];
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let frame=0,length=0,points=[];
function draw(){
 const bounds=route.getBoundingClientRect();
 svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
 points=stages.map(stage=>{const r=stage.querySelector('.journey-stop').getBoundingClientRect();return{x:r.left+r.width/2-bounds.left,y:r.top+r.height/2-bounds.top}});
 const end=route.querySelector('.journey-end').getBoundingClientRect();
 const mobile=innerWidth<=760;
 const last={x:mobile?points[0].x:bounds.width/2,y:end.top-bounds.top+12};
 let d=`M ${points[0].x} 0 L ${points[0].x} ${points[0].y}`;
 [...points.slice(1),last].forEach((point,i)=>{const previous=points[i];const bend=mobile?0:(i%2?58:-58);const middle=(previous.y+point.y)/2;d+=` C ${previous.x+bend} ${middle}, ${point.x-bend} ${middle}, ${point.x} ${point.y}`});
 paths.forEach(path=>path.setAttribute('d',d));
 length=progress.getTotalLength();progress.style.strokeDasharray=String(length);
 update();
}
function update(){
 frame=0;const bounds=route.getBoundingClientRect();
 const cursor=innerHeight*.48-bounds.top;
 const ratio=Math.max(0,Math.min(1,cursor/Math.max(1,bounds.height)));
 progress.style.strokeDashoffset=String(reduce.matches?0:length*(1-ratio));
 let current=-1;
 stages.forEach((stage,i)=>{const reached=cursor>=points[i].y;stage.toggleAttribute('data-reached',reached||reduce.matches);if(reached)current=i});
 links.forEach((link,i)=>{if(i===current)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current')});
}
function request(){if(!frame)frame=requestAnimationFrame(update)}
new ResizeObserver(draw).observe(route);
addEventListener('scroll',request,{passive:true});
reduce.addEventListener('change',request);
document.fonts.ready.then(draw);
draw();
