const KEY="ffvn_teams",PKEY="ffvn_pending",PASS="ffvn2026";
function get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}} function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function login(){if(document.getElementById("password").value===PASS){sessionStorage.admin="1";show()}else document.getElementById("loginMsg").textContent="Sai mật khẩu."}
function logout(){sessionStorage.removeItem("admin");location.reload()}
function show(){document.getElementById("loginBox").hidden=true;document.getElementById("dashboard").hidden=false;render()}
function render(){let p=get(PKEY,[]),t=get(KEY,[]).sort((a,b)=>b.score-a.score);document.getElementById("countTeams").textContent=t.length;document.getElementById("countPending").textContent=p.length;
document.getElementById("pending").innerHTML=p.length?p.map(x=>`<div class="request"><div><strong>${esc(x.team)}</strong><div>Điểm đề xuất: <b>${x.score}</b> · Người gửi: ${esc(x.sender)}</div><small>${esc(x.note||"Không có ghi chú")} ${x.proof?`· <a href="${esc(x.proof)}" target="_blank">Bằng chứng</a>`:""}</small></div><div class="actions"><button class="approve" onclick="approve('${x.id}')">Duyệt</button><button onclick="reject('${x.id}')">Từ chối</button></div></div>`).join(""):"<p>Không có yêu cầu đang chờ.</p>";
document.getElementById("adminRanking").innerHTML=t.slice(0,100).map((x,i)=>`<div class="admin-row"><b>#${i+1}</b><b>${esc(x.team)}</b><input id="s-${x.id}" type="number" value="${x.score}"><button onclick="updateScore('${x.id}')">Lưu</button><button class="danger" onclick="removeTeam('${x.id}')">Xóa</button></div>`).join("")}
function approve(id){let p=get(PKEY,[]),x=p.find(a=>a.id===id);if(!x)return;let t=get(KEY,[]);t.push({id:x.id,team:x.team,score:x.score,logo:x.logo,updated:new Date().toLocaleDateString("vi-VN")});save(KEY,t);save(PKEY,p.filter(a=>a.id!==id));render()}
function reject(id){save(PKEY,get(PKEY,[]).filter(a=>a.id!==id));render()}
function updateScore(id){let t=get(KEY,[]),x=t.find(a=>a.id===id);if(x){x.score=Number(document.getElementById("s-"+id).value)||0;x.updated=new Date().toLocaleDateString("vi-VN");save(KEY,t);render()}}
function removeTeam(id){if(confirm("Xóa team này?")){save(KEY,get(KEY,[]).filter(x=>x.id!==id));render()}}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
if(sessionStorage.admin==="1")show();