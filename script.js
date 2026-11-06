const checkoutUrl = 'https://pay.hotmart.com/U106572068H?off=jrk767gy&checkoutMode=10';

function updateClock(){
  const now=new Date();
  const end=new Date(now); end.setHours(23,59,59,999);
  const ms=Math.max(0,end-now);
  const h=String(Math.floor(ms/3600000)).padStart(2,'0');
  const m=String(Math.floor(ms%3600000/60000)).padStart(2,'0');
  const s=String(Math.floor(ms%60000/1000)).padStart(2,'0');
  document.querySelector('#countdown').textContent=`${h}:${m}:${s}`;
  document.querySelector('#today').textContent=new Intl.DateTimeFormat('es',{day:'2-digit',month:'2-digit',year:'numeric'}).format(now);
}
updateClock(); setInterval(updateClock,1000);
document.querySelector('#year').textContent=new Date().getFullYear();

document.querySelectorAll('.checkout').forEach(link=>link.href=checkoutUrl);

const carousel=document.querySelector('#pagesCarousel');
const items=[...carousel.querySelectorAll('img')];
let autoTimer;
function step(direction=1){
  const width=(items[0]?.getBoundingClientRect().width||300)+18;
  const max=carousel.scrollWidth-carousel.clientWidth;
  if(direction>0 && carousel.scrollLeft>=max-12){carousel.scrollTo({left:0,behavior:'smooth'});return;}
  if(direction<0 && carousel.scrollLeft<=12){carousel.scrollTo({left:max,behavior:'smooth'});return;}
  carousel.scrollBy({left:width*direction,behavior:'smooth'});
}
document.querySelector('.arrow.next').addEventListener('click',()=>step(1));
document.querySelector('.arrow.prev').addEventListener('click',()=>step(-1));
function startAuto(){clearInterval(autoTimer);autoTimer=setInterval(()=>step(1),4200)}
['pointerdown','touchstart','mouseenter'].forEach(evt=>carousel.addEventListener(evt,()=>clearInterval(autoTimer),{passive:true}));
['pointerup','touchend','mouseleave'].forEach(evt=>carousel.addEventListener(evt,startAuto,{passive:true}));
startAuto();

const testimonialTrack=document.querySelector('#testimonialTrack');
const testimonialItems=[...testimonialTrack.querySelectorAll('img')];
function stepTestimonial(direction=1){
  const width=(testimonialItems[0]?.getBoundingClientRect().width||360)+22;
  const max=testimonialTrack.scrollWidth-testimonialTrack.clientWidth;
  if(direction>0 && testimonialTrack.scrollLeft>=max-12){testimonialTrack.scrollTo({left:0,behavior:'smooth'});return;}
  if(direction<0 && testimonialTrack.scrollLeft<=12){testimonialTrack.scrollTo({left:max,behavior:'smooth'});return;}
  testimonialTrack.scrollBy({left:width*direction,behavior:'smooth'});
}
document.querySelector('.testimonial-next').addEventListener('click',()=>stepTestimonial(1));
document.querySelector('.testimonial-prev').addEventListener('click',()=>stepTestimonial(-1));
