/* ===== Helpers & Theme ===== */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d){ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};

// Thème (dark par défaut)
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

/* ===========================
   FLASHCARDS (enrichies)
   =========================== */
const deck = [
  {t:"Colonisation", d:"Processus par lequel, dès le XVe siècle, des puissances européennes s’emparent de territoires d’outre-mer pour les diriger et en tirer profit."},
  {t:"Colonies", d:"Territoires dominés par une puissance européenne ; elles fournissent des matières premières et achètent aux marchés de la métropole (exclusif)."},
  {t:"Métropole", d:"Pays européen qui possède et dirige des colonies, et fixe les règles du commerce colonial."},
  {t:"Grandes compagnies commerciales", d:"Entreprises privilégiées par l’État, recevant l’exclusif et des monopoles pour organiser le commerce entre colonies et métropole."},
  {t:"Exclusif (pacte colonial)", d:"Règle obligeant les colonies à commercer uniquement avec la métropole afin de contrôler les flux et enrichir la puissance européenne."},
  {t:"Monopoles commerciaux", d:"Droits exclusifs accordés à une compagnie pour produire ou commercer certains biens sur un espace donné."},
  {t:"Bourgeoisie marchande", d:"Négociants des grands ports européens, très enrichis par le commerce atlantique et de plus en plus influents."},
  {t:"Grands ports européens", d:"Plaques tournantes du commerce ; la richesse y renforce la bourgeoisie marchande."},
  {t:"Consommation coloniale", d:"Diffusion en Europe de produits exotiques issus des colonies : café, sucre, coton."},
  {t:"Plantation", d:"Grande exploitation coloniale tournée vers l’exportation (sucre, café, coton), fondée sur une main-d’œuvre servile."},
  {t:"Esclavage", d:"Système où des personnes sont privées de liberté et considérées comme des biens ; base de la main-d’œuvre des plantations."},
  {t:"Traite atlantique", d:"Commerce organisé d’esclaves entre Afrique, Amériques et Europe aux XVIIe–XVIIIe siècles."},
  {t:"Déportation", d:"Transport forcé d’Africains vers les Amériques dans des navires négriers ; ~12 millions de personnes."},
  {t:"Navire négrier", d:"Bateau servant au transport d’esclaves ; traversée souvent inhumaine et mortelle."},
  {t:"Code noir", d:"Textes fixant le statut des esclaves dans les colonies françaises, où ils sont considérés comme des objets."},
  {t:"Abolitionnisme", d:"Mouvement d’Européens dénonçant l’esclavage et la traite afin d’obtenir leur abolition."},
  {t:"Commerce triangulaire", d:"Europe→Afrique: marchandises ; Afrique→Amériques: esclaves ; Amériques→Europe: produits coloniaux."},
  {t:"Produits coloniaux", d:"Biens venus des colonies et consommés en Europe : sucre, café, coton."},
  {t:"Puissances coloniales", d:"Angleterre (domine les mers au XVIIIe), France (perd presque toutes ses colonies), Espagne, Portugal, Hollande (affaiblies)."},
  {t:"Période étudiée", d:"Du XVe siècle (début de l’expansion européenne) au XVIIIe siècle (apogée du commerce atlantique et débats sur l’abolition)."}
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
    def.textContent  = "Toutes les cartes de cette session sont acquises. Clique « Reprendre » pour recommencer.";
    prog.textContent = "";
    return;
  }
  const id = queue[idx % queue.length];
  term.textContent = deck[id].t;
  def.textContent  = deck[id].d;
  prog.textContent = `Cartes restantes : ${queue.length}`;
  flip.classList.remove('is-flipped'); flipped = false;
}
if(flip) renderFlash();

flip?.addEventListener('click', ()=>{
  flipped = !flipped;
  flip.classList.toggle('is-flipped');
});
document.addEventListener('keydown', e=>{
  if(e.code === 'Space'){ e.preventDefault(); flip?.click(); }
});

// Suivant : défilement simple
$('#btnNext')?.addEventListener('click', ()=>{
  if(queue.length === 0) return;
  idx = (idx + 1) % queue.length;
  renderFlash();
});

// Je savais : retirer la carte
$('#btnKnow')?.addEventListener('click', ()=>{
  if(queue.length === 0) return;
  const id = queue[idx % queue.length];
  queue = queue.filter(x => x !== id);
  store.set('fcQueue', queue);
  if(idx >= queue.length) idx = 0;
  renderFlash();
});

// Je ne savais pas : replanifier plus tard
$('#btnDont')?.addEventListener('click', ()=>{
  if(queue.length === 0) return;
  const id = queue[idx % queue.length];
  queue.splice(idx % queue.length, 1);
  queue.push(id);
  store.set('fcQueue', queue);
  if(idx >= queue.length) idx = 0;
  renderFlash();
});

$('#btnReset')?.addEventListener('click', ()=>{
  queue = deck.map((_,i)=>i); idx = 0; store.set('fcQueue', queue); renderFlash();
});

/* ===========================
   QUIZ — 30 questions
   =========================== */
const Q = [
  {q:"Au XVIIIe siècle, quelle puissance domine les mers ?", opts:["La France","L’Angleterre","Le Portugal","La Hollande"], a:1},
  {q:"La France, au XVIIIe siècle, perd…", opts:["Toutes ses colonies","Presque toutes ses colonies","Aucune colonie","Seulement ses ports"], a:1},
  {q:"Citez une puissance coloniale affaiblie mais importante :", opts:["Espagne","Suède","Russie","Autriche"], a:0},
  {q:"L’« exclusif » signifie que…", opts:["Les colonies commercent uniquement avec la métropole","La métropole achète au prix imposé","Les colonies fixent librement leurs taxes","Les ports sont libres-échange"], a:0},
  {q:"Les grandes compagnies reçoivent de l’État…", opts:["Des privilèges d’exclusif et des monopoles","Le droit de voter","Des soldats permanents","Des évêchés"], a:0},
  {q:"La bourgeoisie marchande s’enrichit surtout grâce…", opts:["À l’agriculture européenne","Au commerce atlantique","Aux guerres","À l’artisanat rural"], a:1},
  {q:"Exemples de produits de consommation coloniale :", opts:["Blé, seigle, orge","Sucre, café, coton","Fer, charbon, acier","Lait, beurre, fromage"], a:1},
  {q:"L’économie de plantation est…", opts:["Une petite paysannerie libre","Une grande exploitation tournée vers l’exportation","Un marché local fermé","Une coopérative ouvrière"], a:1},
  {q:"La main-d’œuvre des plantations repose sur…", opts:["Le salariat","Le servage","L’esclavage","Le bénévolat"], a:2},
  {q:"La traite atlantique correspond à…", opts:["Échanges entre ports européens","Déportation d’Africains vers les Amériques","Migration volontaire d’artisans africains","Retour des colons"], a:1},
  {q:"Ordre du commerce triangulaire Europe→Afrique :", opts:["Esclaves","Produits coloniaux","Marchandises (armes, tissus, alcool)","Navires"], a:2},
  {q:"Ordre Afrique→Amériques :", opts:["Esclaves","Sucre","Armes et tissus","Métaux"], a:0},
  {q:"Ordre Amériques→Europe :", opts:["Textiles","Esclaves","Produits coloniaux (sucre, café, coton)","Bois"], a:2},
  {q:"Environ combien d’Africains sont déportés ?", opts:["1 million","5 millions","12 millions","25 millions"], a:2},
  {q:"Un navire négrier est…", opts:["Un bateau de guerre","Un bateau transportant des esclaves","Un bateau postal","Un baleinier"], a:1},
  {q:"Le Code noir…", opts:["Est une carte maritime","Fixe le statut des esclaves considérés comme des objets","Crée des ports francs","Interdit l’esclavage"], a:1},
  {q:"Les mouvements abolitionnistes…", opts:["Soutiennent la traite","Visent l’abolition de la traite et de l’esclavage","Créent de nouvelles colonies","Suppriment les taxes portuaires"], a:1},
  {q:"La métropole est…", opts:["La ville principale d’une colonie","Le pays européen qui dirige les colonies","Une capitale américaine","Une route commerciale"], a:1},
  {q:"Les colonies doivent, avec l’exclusif…", opts:["Vendre et acheter à la métropole","Vendre à n’importe qui","N’acheter qu’en Afrique","Produire seulement du blé"], a:0},
  {q:"Quel trio résume la consommation coloniale ?", opts:["Café, sucre, coton","Fer, acier, charbon","Thé, pommes, blé","Or, argent, cuivre"], a:0},
  {q:"Les grands ports européens deviennent riches, ce qui…", opts:["Affaiblit la bourgeoisie","Renforce la bourgeoisie marchande","Supprime les compagnies","Réduit le commerce"], a:1},
  {q:"Pourquoi met-on en place des plantations ?", opts:["Pour l’autoconsommation locale","Pour alimenter le marché européen","Pour expérimenter des plantes","Pour éviter la traite"], a:1},
  {q:"La période étudiée commence…", opts:["Au XIIe siècle","Au XVe siècle","Au XIXe siècle","Au XXIe siècle"], a:1},
  {q:"Au XVIIIe, l’Angleterre…", opts:["Domine les mers","Ferme ses ports","Abolit immédiatement la traite","Abandonne ses colonies"], a:0},
  {q:"Les traites négrières sont…", opts:["Des voyages de découverte","Une organisation commerciale autour des esclaves","Des échanges d’ambassadeurs","Des foires agricoles"], a:1},
  {q:"Dans la leçon, les esclavagistes sont…", opts:["Les personnes réduisant des êtres humains en esclavage","Les juges des ports","Les prêtres","Les paysans"], a:0},
  {q:"L’exclusif sert d’abord à…", opts:["Protéger les esclaves","Contrôler les flux coloniaux et enrichir la métropole","Financer des écoles","Importer des métaux précieux"], a:1},
  {q:"Les compagnies commerciales reçoivent leurs privilèges…", opts:["Des villes portuaires","De l’État","Des esclaves affranchis","Des artisans"], a:1},
  {q:"La bourgeoisie marchande « impose » en Europe…", opts:["Une nouvelle consommation exotique","La fin des échanges","Le retour à la terre","L’interdiction du café"], a:0},
  {q:"Le lien logique majeur de la leçon est :", opts:[
      "Colonisation → compagnies & bourgeoisies → plantations → traite → abolition",
      "Abolition → traite → colonisation → ports",
      "Plantations → abolition → colonisation → compagnies",
      "Ports → métropole → Europe → Asie"], a:0}
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

/* ===========================
   Récit minute
   =========================== */
const recitText = $('#recitText');
const recitInfo = $('#recitInfo');
function loadRecit(){
  const val = store.get('recit', '');
  recitText.value = val || '';
  recitInfo.textContent = val ? 'Enregistré — tu pourras reprendre plus tard.' : '';
}
loadRecit();
$('#saveRecit')?.addEventListener('click', ()=>{ store.set('recit', recitText.value); loadRecit(); });
$('#clearRecit')?.addEventListener('click', ()=>{ store.set('recit', ''); loadRecit(); });
