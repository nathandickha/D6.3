
const toggle=document.querySelector('.mobile-toggle');
const nav=document.querySelector('.main-nav');
toggle?.addEventListener('click',()=>nav?.classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
