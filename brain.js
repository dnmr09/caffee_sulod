const MENU=[
 {c:"Coffee",e:"☕",n:"Iloilo Iced Latte",d:"Double espresso, fresh milk, muscovado syrup.",p:140,t:"Signature"},
 {c:"Coffee",e:"🥛",n:"Flat White",d:"Velvety microfoam over a ristretto base.",p:130},
 {c:"Coffee",e:"🧊",n:"Cold Brew",d:"Steeped 18 hours, smooth and low-acid.",p:135},
 {c:"Coffee",e:"🫖",n:"Barako Pour-over",d:"Bold Philippine liberica, hand-poured.",p:150},
 {c:"Specials",e:"🥥",n:"Coconut Kape",d:"Espresso, coconut milk, toasted coconut flakes.",p:150,t:"New"},
 {c:"Specials",e:"🍫",n:"Tablea Mocha",d:"Local tablea chocolate with espresso.",p:155},
 {c:"Specials",e:"🥭",n:"Mango Cloud",d:"Cold foam over iced mango and espresso.",p:160},
 {c:"Bites",e:"🥐",n:"Butter Croissant",d:"Baked fresh every morning.",p:95},
 {c:"Bites",e:"🍰",n:"Ube Cheesecake",d:"Creamy, purple and unapologetically sweet.",p:145},
 {c:"Bites",e:"🥪",n:"Chicken Pesto Panini",d:"Pressed hot, with a side of greens.",p:185}
];
const HOURS=[["Sunday",8,22],["Monday",7,22],["Tuesday",7,22],["Wednesday",7,22],["Thursday",7,22],["Friday",7,23],["Saturday",8,23]];
const $=s=>document.querySelector(s);
const cats=["All",...new Set(MENU.map(m=>m.c))];
let active="All";
function renderMenu(){
  $("#tabs").innerHTML=cats.map(c=>`<button class="tab" aria-pressed="${c===active}" data-c="${c}">${c}</button>`).join("");
  $("#cards").innerHTML=MENU.filter(m=>active==="All"||m.c===active).map(m=>
    `<article class="card">${m.t?`<span class="tag">${m.t}</span>`:""}<div class="em">${m.e}</div><h3>${m.n}</h3><p>${m.d}</p><span class="price">₱${m.p}</span></article>`).join("");
}
$("#tabs").addEventListener("click",e=>{const b=e.target.closest(".tab");if(b){active=b.dataset.c;renderMenu();}});
renderMenu();

const fmt=h=>{const x=h%12||12;return x+(h<12||h===24?" AM":" PM")};
function manilaNow(){
  const p=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Manila",weekday:"long",hour:"numeric",hour12:false}).formatToParts(new Date());
  return {day:p.find(x=>x.type==="weekday").value,hour:parseInt(p.find(x=>x.type==="hour").value)%24};
}
function renderHours(){
  const {day,hour}=manilaNow();
  $("#hours").innerHTML=HOURS.map(([d,o,c])=>`<tr class="${d===day?"today":""}"><td>${d}</td><td>${fmt(o)} – ${fmt(c)}</td></tr>`).join("");
  const t=HOURS.find(h=>h[0]===day);
  const open=hour>=t[1]&&hour<t[2];
  $("#dot").className="dot"+(open?" on":"");
  $("#statusText").textContent=open?`Open now · until ${fmt(t[2])}`:`Closed now · opens ${fmt(t[1])}`;
}
renderHours();setInterval(renderHours,60000);

$("#burger").addEventListener("click",()=>{
  const o=$("#links").classList.toggle("open");$("#burger").setAttribute("aria-expanded",o);
});
$("#links").addEventListener("click",e=>{if(e.target.tagName==="A"){$("#links").classList.remove("open");$("#burger").setAttribute("aria-expanded","false");}});
$("#form").addEventListener("submit",e=>{e.preventDefault();$("#thanks").style.display="block";e.target.reset();});
$("#yr").textContent=new Date().getFullYear();