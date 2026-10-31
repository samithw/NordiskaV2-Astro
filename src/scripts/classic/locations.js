const countries=['Finland','Malaysia','India','Vietnam','Philippines','UAE'];
const descriptions=['Nordic expertise and international business development.','A bridge to commercial opportunities across Southeast Asia.','Market insight and connections for growth in South Asia.','Partner development and opportunities in Vietnam.','Customer and partner connections in the Philippines.','A bridge to customers and partners across the Middle East.'];
const grid=document.querySelector('#location-grid');
grid.innerHTML=countries.map((c,i)=>`<a class="location-link" href="#${c.toLowerCase()}"><span><small>${['EUROPE','SOUTHEAST ASIA','SOUTH ASIA','SOUTHEAST ASIA','SOUTHEAST ASIA','MIDDLE EAST'][i]}</small>Nordiska ${c}</span><span class="arrow">→</span></a>`).join('');
function select(country){document.querySelector('#location-detail').textContent=descriptions[countries.indexOf(country)];document.querySelectorAll('.map-pin').forEach(b=>{const active=b.dataset.country===country;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))})}
document.querySelectorAll('.map-pin').forEach(b=>b.addEventListener('click',()=>select(b.dataset.country)));
