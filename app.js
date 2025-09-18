/* ===== Helpers & Theme ===== */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d){ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};

// Theme toggle (dark default)
(function initTheme(){
  const saved = store.get('theme', 'dark');
  document.documentElement.setAttribute('data-theme', saved);
  $('#themeToggle')?.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    store.set('theme', next);
  });
})();

/* ===== Flashcards ===== */
const deck = [
  {t:"Colonisation", d:"Prise de contrôle, par une puissance européenne, d’un territoire d’outre-mer."},
  {t:"Grandes compagnies commerciales", d:"Entreprises privilégiées par l’État, bénéficiant de l’exclusif et de monopoles pour gérer le commerce colonial."},
  {t:"Exclusif", d:"Obligation pour les colonies de commercer uniquement avec la métropole."},
  {t:"Monopole", d:"Droit exclusif de produire ou de commercer accordé à une compagnie."},
  {t:"Bourgeoisie marchande", d:"Négociants des grands ports européens, enrichis par le commerce atlantique."},
  {t:"Plantation", d:"Grande exploitation coloniale (sucre, café, coton) fondée sur une main-d’œuvre servile."},
  {t:"Traite atlantique", d:"Organisation de la déportation d’Africains vers les Amériques."},
  {t:"Navire négrier", d:"Bateau transportant des esclaves déportés."},
  {t:"Code noir", d:"Textes fixant le statut légal des esclaves dans les colonies françaises."},
  {t:"Abolitionnisme", d:"Mouvement militant pour l’abolition de la traite et de l’esclavage."},
  {t:"Produits coloniaux", d:"Biens issus des colonies et consommés en Europe : sucre, café, coton…"},
  {t:"Puissances coloniales (XVIIe–XVIIIe)", d:"Angleterre (domine les mers), France (perd l’essentiel), Espagne, Portugal, Hollande."}
];
let queue = store.get('fcQueue', deck.map((_,i)=>i));
let idx = 0, flipped = false;

const flip = $('#flip');
const term = $('#term');
const def  = $('#def');
const prog = $('#fcProgress');

function renderFlash(){
  if(queue.length === 0){
    term.textContent = "Bravo !";
    def.textContent = "Toutes les cartes de cette session sont acquises. Clique « Reprendre » pour recommencer.";
    prog.textContent = "";
    return;
  }
  const id = queue[idx % queue.length];
  term.textContent = deck[id].t;
  def.textContent  = deck[id].d;
  prog.textContent = `Cartes restantes : ${queue.length}`;
  flip.classList.remove('is-flipped'); flipped = false;
}
if(flip){ renderFlash(); }

flip?.addEventListener('click', ()=>{
  flipped = !flipped;
  flip.classList.toggle('is-flipped');
});
document.addEventListener('keydown', e=>{
  if(e.code === 'Space'){ e.preventDefault(); flip?.click(); }
});

$('#btnKnow')?.addEventListener('click', ()=>{
  if(queue.length === 0) return;
  const id = queue[idx % queue.length];
  queue = queue.filter(x => x !== id); // on retire la carte connue
  store.set('fcQueue', queue);
  idx = 0; renderFlash();
});
$('#btnDont')?.addEventListener('click', ()=>{
  if(queue.length === 0) return;
  idx = (idx + 1) % queue.length; // on revoira la carte plus tard
  renderFlash();
});
$('#btnReset')?.addEventListener('click', ()=>{
  queue = deck.map((_,i)=>i); idx = 0; store.set('fcQueue', queue); renderFlash();
});

/* ===== Quiz ===== */
const Q = [
  {q:"Au XVIIIe siècle, quelle puissance domine les mers ?", opts:["La France","L’Angleterre","Le Portugal","La Hollande"], a:1},
  {q:"L’« exclusif » signifie que…", opts:["La colonie commerçe librement","Les colonies commercent uniquement avec la métropole","La métropole achète au prix imposé","Les compagnies fixent les taxes"], a:1},
  {q:"Quels produits symbolisent la consommation coloniale ?", opts:["Blé, seigle, orge","Café, sucre, coton","Vin, huile, fromage","Charbon, acier, laine"], a:1},
  {q:"L’économie de plantation repose principalement sur…", opts:["Le salariat libre","Le servage","L’esclavage","La petite propriété"], a:2},
  {q:"La traite atlantique correspond à…", opts:["Échange entre ports européens","Déportation d’Africains vers les Amériques","Retour des colons","Migration volontaire d’artisans"], a:1},
  {q:"Quel texte fixe le statut des esclaves ?", opts:["La Charte des mers","Le Code noir","Le Pacte colonial","Le Traité d’Utrecht"], a:1},
  {q:"Ordre Afrique → Amériques :", opts:["Armes et tissus","Sucre","Esclaves","Métaux"], a:2, tip:"Afrique → Amériques : esclaves déportés"},
  {q:"Nombre approximatif d’Africains déportés :", opts:["1 million","5 millions","12 millions","25 millions"], a:2},
  {q:"Rôle des grandes compagnies commerciales :", opts:["Organiser l’exclusif et des monopoles","Interdire le commerce maritime","Supprimer les taxes","Organiser les révoltes"], a:0},
  {q:"Les mouvements abolitionnistes visent :", opts:["À étendre la traite","À améliorer les navires","À abolir traite et esclavage","À créer de nouvelles colonies"], a:2}
];

const quizWrap = $('#quizWrap');
function buildQuiz(){
  quizWrap.innerHTML = '';
  Q.forEach((item,i)=>{
    const box = document.createElement('div');
    box.className = 'q'; box.dataset.i = i;
    box.innerHTML = `<h4>Q${i+1}. ${item.q}</h4>` + item.opts.map((o,j)=>`<div class="opt" data-j="${j}">${o}</div>`).join('');
    quizWrap.appendChild(box);
  });
  const bar = document.createElement('div');
  bar.style.marginTop = '10px';
  bar.innerHTML = `
    <button class="btn" id="btnCorrect">Corriger</button>
    <button class="btn ghost" id="btnReplay">Recommencer</button>
    <span id="scoreText" class="muted"></span>
  `;
  quizWrap.appendChild(bar);

  quizWrap.addEventListener('click', e=>{
    if(e.target.classList.contains('opt')){
      const box = e.target.closest('.q');
      [...box.querySelectorAll('.opt')].forEach(o=>o.dataset.picked="false");
      e.target.dataset.picked = "true";
    }
  });
  $('#btnCorrect').onclick = ()=>{
    let ok = 0;
    $$('.q').forEach((box,k)=>{
      const pick = box.querySelector('.opt[data-picked="true"]');
      const right = Q[k].a;
      if(!pick){
        box.querySelectorAll('.opt')[right].dataset.state = 'right';
        return;
      }
      const pj = +pick.dataset.j;
      if(pj === right){ ok++; pick.dataset.state = 'right'; }
      else{
        pick.dataset.state = 'wrong';
        box.querySelectorAll('.opt')[right].dataset.state = 'right';
      }
    });
    const txt = `Score : ${ok}/${Q.length}`;
    $('#scoreText').textContent = txt;
    store.set('quizScore', {v:ok, t:Q.length, ts:Date.now()});
  };
  $('#btnReplay').onclick = buildQuiz;

  const s = store.get('quizScore', null);
  if(s){
    const d = new Date(s.ts);
    const info = document.createElement('div');
    info.className = 'muted'; info.style.marginBottom = '8px';
    info.textContent = `Dernier score : ${s.v}/${s.t} le ${d.toLocaleDateString()} à ${d.toLocaleTimeString()}`;
    quizWrap.prepend(info);
  }
}
buildQuiz();

/* ===== Récit minute ===== */
const recitText = $('#recitText');
const recitInfo = $('#recitInfo');
function loadRecit(){
  const val = store.get('recit', '');
  recitText.value = val || '';
  recitInfo.textContent = val ? 'Enregistré — tu pourras reprendre plus tard.' : '';
}
loadRecit();
$('#saveRecit').addEventListener('click', ()=>{ store.set('recit', recitText.value); loadRecit(); });
$('#clearRecit').addEventListener('click', ()=>{ store.set('recit', ''); loadRecit(); });

