const KEY="ffvn_teams", PKEY="ffvn_pending";
const seed=[
["ALPHA",985],["BRAVO",920],["CHARLIE",875],["DELTA",840],["EAGLES",815],["FALCON",790],["GENESIS",765],["HUNTERS",740],["INFERNO",720],["JOKER",700]
];
function get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
if(!localStorage.getItem(KEY)) save(KEY,seed.map((x,i)=>({id:crypto.randomUUID(),team:x[0],score:x[1],updated:"29/08/2026"})));
function teams(){return get(KEY,[]).sort((a,b)=>b.score-a.score)}
function render(filter=""){let arr=teams().filter(x=>x.team.toLowerCase().includes(filter.toLowerCase())).slice(0,100), body=document.getElementById("rankingBody"); if(!body)return;
body.innerHTML=arr.map((x,i)=>`<tr><td class="${i<3?"rank-top":""}">${i+1}</td><td><b>${esc(x.team)}</b></td><td>${Number(x.score).toLocaleString("vi-VN")}</td><td>${x.updated||"—"}</td></tr>`).join("")||`<tr><td colspan="4">Chưa có dữ liệu.</td></tr>`;
let t=teams(); [["top1","score1"],["top2","score2"],["top3","score3"]].forEach((p,i)=>{if(t[i]){document.getElementById(p[0]).textContent=t[i].team;document.getElementById(p[1]).textContent=t[i].score}})}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
document.getElementById("search")?.addEventListener("input",e=>render(e.target.value));
document.getElementById("submitForm")?.addEventListener("submit",e=>{e.preventDefault();let f=new FormData(e.target), p=get(PKEY,[]);p.push({id:crypto.randomUUID(),team:f.get("team"),logo:f.get("logo"),score:Number(f.get("score")),sender:f.get("sender"),proof:f.get("proof"),note:f.get("note"),created:new Date().toLocaleString("vi-VN")});save(PKEY,p);e.target.reset();document.getElementById("submitMsg").textContent="✓ Đã gửi. Admin sẽ kiểm tra trước khi công khai.";});
render();