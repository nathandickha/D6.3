
const toggle=document.querySelector('.mobile-toggle');
const nav=document.querySelector('.main-nav');
toggle?.addEventListener('click',()=>nav?.classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));


const siteHeader = document.querySelector('.site-header');

function updateStickyHeader() {
  if (!siteHeader) return;
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
}

updateStickyHeader();
window.addEventListener('scroll', updateStickyHeader, { passive: true });
