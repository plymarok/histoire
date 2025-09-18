// === Thème clair/sombre ===
document.getElementById("themeToggle").addEventListener("click",()=>{
  const html=document.documentElement;
  html.dataset.theme = html.dataset.theme==="light" ? "dark" : "light";
});

// === Flashcards ===
const flashcards=[
  {t:"Colonisation",d:"Processus par lequel un pays prend possession d’un territoire étranger."},
  {t:"Exclusif",d:"Système obligeant les colonies à commercer uniquement avec la métropole."},
  {t:"Commerce triangulaire",d:"Échanges entre Europe, Afrique et Amériques."},
  {t:"Traite atlantique",d:"Commerce d’esclaves africains vers les Amériques."},
  {t:"Code noir",d:"Texte qui définit le statut des esclaves dans les colonies françaises."},
  {t:"Bourgeoisie marchande",d:"Classe sociale de commerçants enrichis par les échanges coloniaux."},
  {t:"Produits coloniaux",d:"Sucre, café, coton, etc."},
  {t:"Navires négriers",d:"Bateaux transportant les esclaves."},
  {t:"Abolitionnistes",d:"Mouvements et personnes militant contre l’esclavage."},
];
let fcIndex=0,known=0;
const term=document.getElementById("term"),def=document.getElementById("def"),
fcProgress=document.getElementById("fcProgress"),card=document.getElementById("flip");
function updateCard(){term.textContent=flashcards[fcIndex].t;def.textContent=flashcards[fcIndex].d;
fcProgress.textContent=`${fcIndex+1}/${flashcards.length} (su: ${known})`;}
card.addEventListener("click",()=>card.classList.toggle("is-flipped"));
document.getElementById("btnNext").onclick=()=>{fcIndex=(fcIndex+1)%flashcards.length;card.classList.remove("is-flipped");updateCard();}
document.getElementById("btnKnow").onclick=()=>{known++;fcIndex=(fcIndex+1)%flashcards.length;card.classList.remove("is-flipped");updateCard();}
document.getElementById("btnDont").onclick=()=>{fcIndex=(fcIndex+1)%flashcards.length;card.classList.remove("is-flipped");updateCard();}
document.getElementById("btnReset").onclick=()=>{fcIndex=0;known=0;card.classList.remove("is-flipped");updateCard();}
updateCard();

// === Quiz triangulé ===
const triData=[ /* les 20 questions F1/F2/F3 comme déjà fourni */ 
  {
    f1:{q:"Au XVIIIe siècle, quelle puissance domine les mers ?",a:"L’Angleterre."},
    f2:{q:"Pourquoi la domination maritime anglaise est-elle un atout économique ?",a:"Parce qu’elle permet de contrôler le commerce mondial et les routes coloniales."},
    f3:{q:"Quelles conséquences cette domination a-t-elle pour la France ?",a:"Elle perd une partie de son influence et de ses colonies."}
  },
  {
    f1:{q:"Qu’appelle-t-on l’« exclusif » dans le commerce colonial ?",a:"Un système de monopoles commerciaux entre colonies et métropole."},
    f2:{q:"Pourquoi l’exclusif enrichit-il surtout la métropole ?",a:"Parce que toutes les marchandises coloniales doivent passer par elle."},
    f3:{q:"Quels effets l’exclusif a-t-il sur les colonies ?",a:"Elles ne peuvent pas commercer librement et restent dépendantes."}
  },
  // ... (18 autres blocs identiques à ceux que je t’ai donnés)
];
const quizDiv=document.getElementById("triQuizWrap");
triData.forEach((item,i)=>{
  const card=document.createElement("div");
  card.className="tri-card";
  const title=document.createElement("h4");
  title.textContent=`Q${i+1}. ${item.f1.q}`;
  card.appendChild(title);
  ["f1","f2","f3"].forEach((key,j)=>{
    const f=document.createElement("div");
    f.className="faisceau";
    f.innerHTML=`<strong>F${j+1}:</strong> ${item[key].q}`;
    f.addEventListener("click",()=>{
      f.classList.toggle("open");
      if(f.classList.contains("open")){
        f.innerHTML=`<strong>F${j+1}:</strong> ${item[key].q}<br><em>Réponse:</em> ${item[key].a}`;
      }else{
        f.innerHTML=`<strong>F${j+1}:</strong> ${item[key].q}`;
      }
    });
    card.appendChild(f);
  });
  quizDiv.appendChild(card);
});
