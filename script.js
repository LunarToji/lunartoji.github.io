// Loader
window.addEventListener('load', ()=>{ document.getElementById('loader').style.display='none'; });

// Favoris
let favs = JSON.parse(localStorage.getItem('favs')) || [];
document.querySelectorAll('.fav-btn').forEach((btn,i)=>{
  if(favs.includes(document.querySelectorAll('.card')[i].dataset.title)) btn.style.color='red';
  btn.onclick = ()=>{
    let title = document.querySelectorAll('.card')[i].dataset.title;
    if(favs.includes(title)){ favs=favs.filter(t=>t!==title); btn.style.color='white'; }
    else { favs.push(title); btn.style.color='red'; }
    localStorage.setItem('favs', JSON.stringify(favs));
  }
});

// Player
function openPlayer(url, title){
  document.getElementById('player').src = url;
  document.getElementById('playerModal').style.display = 'flex';
  // Reprendre l'épisode
  let resume = localStorage.getItem(title) || 0;
  document.getElementById('player').currentTime = resume;
  // Sauvegarde du temps toutes les 5 sec
  let interval = setInterval(()=>{
    if(document.getElementById('playerModal').style.display==='flex'){
      localStorage.setItem(title, document.getElementById('player').currentTime);
    } else clearInterval(interval);
  },5000);
}
function closePlayer(){
  document.getElementById('player').src='';
  document.getElementById('playerModal').style.display='none';
}

// Recherche animée
document.getElementById('search').addEventListener('input', e=>{
  let val = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(card=>{
    card.style.display = card.dataset.title.toLowerCase().includes(val)?'block':'none';
  });
});
