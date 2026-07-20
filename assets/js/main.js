
const D = window.CC_SITE_DATA;
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];

function setLink(selector, url){ $$(selector).forEach(a => { a.href=url; if(url.startsWith('http')) {a.target='_blank'; a.rel='noopener';}}); }
setLink('[data-link="discord"]', D.links.discord);
setLink('[data-link="twitch"]', D.links.twitch);
setLink('[data-link="youtube"]', D.links.youtube);
setLink('[data-link="instagram"]', D.links.instagram);
setLink('[data-link="x"]', D.links.x);
setLink('[data-link="application"]', D.links.application);
$$('[data-email]').forEach(a => {a.href='mailto:'+D.links.contactEmail; a.textContent=D.links.contactEmail;});
$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

$('.menu-btn')?.addEventListener('click',()=>$('.nav-links')?.classList.toggle('open'));
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('.nav-links')?.classList.remove('open')));

const creatorGrid=$('[data-creators]');
if(creatorGrid) creatorGrid.innerHTML=D.creators.map((c,i)=>`
<article class="card creator-card reveal">
 <div class="creator-art">${c.initials}</div><div class="creator-copy">
 <span class="badge">${c.role.toUpperCase()}</span><h3>${c.name}</h3>
 <div class="muted">${c.focus}</div><p>${c.bio}</p>
 <a class="btn btn-secondary" href="${c.twitch}" target="_blank" rel="noopener">Visit Twitch</a>
 </div></article>`).join('');

const schedule=$('[data-schedule]');
if(schedule) schedule.innerHTML=D.schedule.map(s=>`
<div class="schedule-row"><strong>${s.day}</strong><div><b>${s.title}</b><div class="muted">${s.host}</div></div><span class="badge">${s.time}</span></div>`).join('');

const events=$('[data-events]');
if(events) events.innerHTML=D.events.map(e=>`
<article class="card event-card reveal"><div class="date">${e.date}</div><h3>${e.title}</h3>
<p class="muted">${e.location} • ${e.time}</p><p>${e.description}</p></article>`).join('');

const stats=$('[data-stats]');
if(stats) stats.innerHTML=D.stats.map(s=>`<div class="card stat"><b>${s.value}</b>${s.label}</div>`).join('');

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal').forEach(e=>observer.observe(e));
