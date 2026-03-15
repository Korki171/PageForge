// cursor
const cur = document.getElementById('cur');
let mx=0,my=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cur.style.transform=`translate(${mx-5}px,${my-5}px)`;
});
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='36px';cur.style.height='36px';cur.style.borderRadius='0';});
  el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';cur.style.borderRadius='50%';});
});

// reveal
const io=new IntersectionObserver(es=>es.forEach((e,i)=>{
  if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),i*65);
}),{threshold:.08,rootMargin:'0px 0px -28px 0px'});
document.querySelectorAll('.ri').forEach(el=>io.observe(el));

// nav
window.addEventListener('scroll',()=>{
  document.getElementById('nav').style.borderBottomColor=window.scrollY>40?'var(--ink)':'var(--ink)';
});

// mobile menu
const burger=document.getElementById('burger');
const mob=document.getElementById('mobMenu');
let open=false;
burger.addEventListener('click',()=>{
  open=!open;
  mob.classList.toggle('open',open);
  const s=burger.querySelectorAll('span');
  if(open){s[0].style.transform='translateY(6.5px) rotate(45deg)';s[1].style.transform='translateY(-6.5px) rotate(-45deg)';}
  else{s[0].style.transform='';s[1].style.transform='';}
});
function closeMob(){
  open=false; mob.classList.remove('open');
  const s=burger.querySelectorAll('span');
  s[0].style.transform='';s[1].style.transform='';
}

// faq
function faq(btn){
  const item=btn.closest('.fq');
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.fq.open').forEach(el=>el.classList.remove('open'));
  if(!isOpen) item.classList.add('open');
}
