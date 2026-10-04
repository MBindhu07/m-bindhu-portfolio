const root=document.documentElement;
const themeButton=document.getElementById("themeButton");
const menuButton=document.getElementById("menuButton");
const navMenu=document.getElementById("navMenu");
const progress=document.getElementById("scrollProgress");

const saved=localStorage.getItem("bindhu-theme");
if(saved==="dark"){root.dataset.theme="dark";themeButton.textContent="☀";}

themeButton.addEventListener("click",()=>{
  const dark=root.dataset.theme==="dark";
  root.dataset.theme=dark?"light":"dark";
  themeButton.textContent=dark?"☾":"☀";
  localStorage.setItem("bindhu-theme",dark?"light":"dark");
});

menuButton.addEventListener("click",()=>{
  const open=navMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav-menu a").forEach(a=>a.addEventListener("click",()=>{
  navMenu.classList.remove("open");
  menuButton.setAttribute("aria-expanded","false");
}));

function updateProgress(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=max>0?`${(scrollY/max)*100}%`:"0%";
}
addEventListener("scroll",updateProgress,{passive:true});
updateProgress();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target);}
  });
},{threshold:.1});
document.querySelectorAll(".reveal").forEach((el,i)=>{
  el.style.transitionDelay=`${Math.min(i%4,3)*60}ms`;
  observer.observe(el);
});
document.getElementById("year").textContent=new Date().getFullYear();
