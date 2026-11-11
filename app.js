const KEY='minidrama_catalog_v1', WATCH='minidrama_watchlist_v1';
const starter=[
{id:'d1',title:'শেষ বিকেলের গল্প',category:'রোমান্স',description:'দুই অচেনা মানুষের জীবনে ঘটে যাওয়া এক অপ্রত্যাশিত গল্প।',episodes:[{title:'পর্ব ১',url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'},{title:'পর্ব ২',url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'}],c1:'#b65d6c',c2:'#281c3a',badge:'NEW'},
{id:'d2',title:'ভালোবাসার শেষ চিঠি',category:'রোমান্স',description:'একটি চিঠি বদলে দেয় জীবনের সব হিসাব।',episodes:[{title:'পর্ব ১',url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'}],c1:'#c08a58',c2:'#392039',badge:'HOT'},
{id:'d3',title:'অচেনা অধ্যায়',category:'রহস্য',description:'অতীতের গোপন সত্য ফিরে আসে বর্তমানের দরজায়।',episodes:[{title:'পর্ব ১',url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'}],c1:'#547b83',c2:'#171b32',badge:'NEW'},
{id:'d4',title:'ক্ষমতার খেলা',category:'থ্রিলার',description:'বিশ্বাস, প্রতিশোধ আর ক্ষমতার লড়াই।',episodes:[{title:'পর্ব ১',url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'}],c1:'#9b6846',c2:'#201729',badge:'VIP'},
{id:'d5',title:'এক মুঠো সুখ',category:'পারিবারিক',description:'পরিবারের ছোট ছোট মুহূর্তের বড় গল্প।',episodes:[{title:'পর্ব ১',url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'}],c1:'#82936b',c2:'#263b39',badge:'NEW'}
];
let catalog=JSON.parse(localStorage.getItem(KEY)||'null')||starter, active='সব';
const grid=document.querySelector('#dramaGrid'), chips=document.querySelector('#categoryChips'), search=document.querySelector('#searchInput');
function save(){localStorage.setItem(KEY,JSON.stringify(catalog))}
function render(){
 const cats=['সব',...new Set(catalog.map(x=>x.category))]; chips.innerHTML=cats.map(c=>`<button class="chip ${active===c?'active':''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
 const q=search.value.trim().toLowerCase(); const list=catalog.filter(d=>(active==='সব'||d.category===active)&&d.title.toLowerCase().includes(q));
 document.querySelector('#resultCount').textContent=`${list.length}টি নাটক`;
 grid.innerHTML=list.map(d=>`<article class="drama-card" data-id="${esc(d.id)}"><div class="cover" style="--c1:${esc(d.c1||'#8b4560')};--c2:${esc(d.c2||'#171727')}"><span class="tag">${esc(d.badge||'NEW')}</span><strong>${esc(d.title)}</strong></div><h3>${esc(d.title)}</h3><p>${esc(d.category)} · ${d.episodes?.length||0} পর্ব</p></article>`).join('')||'<p class="muted">কোনো নাটক পাওয়া যায়নি।</p>';
}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
chips.addEventListener('click',e=>{if(e.target.dataset.cat){active=e.target.dataset.cat;render()}});
search.addEventListener('input',render);
grid.addEventListener('click',e=>{const card=e.target.closest('[data-id]');if(card)openDrama(card.dataset.id)});
const modal=document.querySelector('#modal'), content=document.querySelector('#modalContent');
function openDrama(id){const d=catalog.find(x=>x.id===id);if(!d)return;content.innerHTML=`<p class="eyebrow">${esc(d.category)}</p><h2>${esc(d.title)}</h2><p>${esc(d.description)}</p><button class="secondary-btn" id="watchToggle">♡ Watchlist</button><h3>Episodes</h3><div class="episode-list">${(d.episodes||[]).map((ep,i)=>`<div class="episode"><span>${esc(ep.title||'পর্ব '+(i+1))}</span><button data-ep="${i}">▶ দেখুন</button></div>`).join('')}</div>`;content.querySelector('#watchToggle').onclick=()=>toggleWatch(d.id);content.querySelectorAll('[data-ep]').forEach(b=>b.onclick=()=>playEpisode(d,b.dataset.ep));modal.classList.remove('hidden')}
function toggleWatch(id){let w=JSON.parse(localStorage.getItem(WATCH)||'[]');w=w.includes(id)?w.filter(x=>x!==id):[...w,id];localStorage.setItem(WATCH,JSON.stringify(w));alert(w.includes(id)?'Watchlist-এ যোগ হয়েছে':'Watchlist থেকে সরানো হয়েছে')}
function playEpisode(d,i){const ep=d.episodes[i];content.innerHTML=`<button class="secondary-btn" id="back">← Episodes</button><h2>${esc(d.title)} — ${esc(ep.title||'পর্ব '+(+i+1))}</h2><video class="video" controls playsinline src="${esc(ep.url)}"></video><p class="muted">ভিডিও চালাতে সমস্যা হলে নেটওয়ার্ক বা ভিডিও URL পরীক্ষা করুন।</p>`;content.querySelector('#back').onclick=()=>openDrama(d.id)}
document.querySelector('#closeModal').onclick=()=>modal.classList.add('hidden');modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.add('hidden')});render();
