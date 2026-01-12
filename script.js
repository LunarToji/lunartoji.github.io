// Loader
window.addEventListener('load', ()=>{ document.getElementById('loader').style.display='none'; });

// Favoris
let favs = JSON.parse(localStorage.getItem('favs')) || [];
document.querySelectorAll('.fav-btn').forEach((btn,i)=>{
  let card=document.querySelectorAll('.card')[i];
  if(favs.includes(card.dataset.title)) btn.style.color='red';
  btn.onclick = ()=>{
    let title=card.dataset.title;
    if(favs.includes(title)){ favs=favs.filter(t=>t!==title); btn.style.color='#0f0f0f'; }
    else { favs.push(title); btn.style.color='red'; }
    localStorage.setItem('favs', JSON.stringify(favs));
  }
});

// Player
function openPlayer(url, title){
  let player=document.getElementById('player');
  document.getElementById('playerModal').style.display='flex';
  player.src=url;
  // Reprendre l'épisode
  let resume = localStorage.getItem(title) || 0;
  player.currentTime = resume;
  let interval = setInterval(()=>{
    if(document.getElementById('playerModal').style.display==='flex'){
      localStorage.setItem(title, player.currentTime);
    } else clearInterval(interval);
  },5000);
}

function closePlayer(){
  document.getElementById('player').src='';
  document.getElementById('playerModal').style.display='none';
}

// Recherche animée
document.getElementById('search').addEventListener('input', e=>{
  let val=e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(card=>{
    card.style.display=card.dataset.title.toLowerCase().includes(val)?'block':'none';
  });
});
