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

// === Quiz triangulé (12 questions) ===
const triData=[
  {
    f1:{q:"Quand commence la colonisation européenne ?",a:"Au XVe siècle."},
    f2:{q:"Qui domine au départ ?",a:"Espagne et Portugal."},
    f3:{q:"Qui prend le relais au XVIIIe siècle ?",a:"L’Angleterre et la France."}
  },
  {
    f1:{q:"Quelle puissance domine les mers au XVIIIe siècle ?",a:"L’Angleterre."},
    f2:{q:"Pourquoi cette domination est-elle un atout ?",a:"Elle permet de contrôler le commerce mondial."},
    f3:{q:"Conséquence pour la France ?",a:"Perte d’influence et de colonies."}
  },
  {
    f1:{q:"Qu’est-ce que l’« exclusif » ?",a:"Un monopole commercial colonies ↔ métropole."},
    f2:{q:"Pourquoi enrichit-il la métropole ?",a:"Toutes les marchandises doivent passer par elle."},
    f3:{q:"Conséquence pour les colonies ?",a:"Elles restent dépendantes et limitées."}
  },
  {
    f1:{q:"Qui s’enrichit grâce aux ports coloniaux ?",a:"La bourgeoisie marchande."},
    f2:{q:"Pourquoi s’enrichit-elle vite ?",a:"Grâce aux échanges coloniaux."},
    f3:{q:"Conséquence sociale ?",a:"La bourgeoisie gagne en puissance politique."}
  },
  {
    f1:{q:"Quels produits exotiques s’imposent en Europe ?",a:"Café, sucre, coton."},
    f2:{q:"Pourquoi séduisent-ils ?",a:"Nouveauté, goût, prestige."},
    f3:{q:"Effet social ?",a:"Nouvelle consommation, mode bourgeoise."}
  },
  {
    f1:{q:"Qu’est-ce que le commerce triangulaire ?",a:"Échanges Europe ↔ Afrique ↔ Amériques."},
    f2:{q:"Pourquoi dit-on « triangulaire » ?",a:"Parce qu’il relie trois continents."},
    f3:{q:"But global ?",a:"Alimenter l’Europe grâce à l’esclavage."}
  },
  {
    f1:{q:"Combien d’Africains sont déportés ?",a:"Environ 12 millions."},
    f2:{q:"Quelles régions touchées ?",a:"Afrique de l’Ouest et centrale."},
    f3:{q:"Conséquence ?",a:"Appauvrissement démographique."}
  },
  {
    f1:{q:"Comment s’appellent les bateaux d’esclaves ?",a:"Les navires négriers."},
    f2:{q:"Conditions de transport ?",a:"Cales surchargées, insalubres."},
    f3:{q:"Conséquence ?",a:"Taux de mortalité très élevé."}
  },
  {
    f1:{q:"Quel texte fixe le statut des esclaves ?",a:"Le Code noir."},
    f2:{q:"Que dit-il ?",a:"Les esclaves sont des biens meubles."},
    f3:{q:"Ce que cela révèle ?",a:"Une déshumanisation juridique."}
  },
  {
    f1:{q:"Que dénoncent les abolitionnistes ?",a:"Les conditions des esclaves et la traite."},
    f2:{q:"Quelle valeur les motive ?",a:"Les valeurs humanistes et religieuses."},
    f3:{q:"Quel objectif concret ?",a:"Abolir la traite et l’esclavage."}
  },
  {
    f1:{q:"Quels produits sont cultivés dans les plantations ?",a:"Sucre, café, coton."},
    f2:{q:"Pourquoi ces cultures demandent-elles beaucoup de main-d’œuvre ?",a:"Elles sont intensives et destinées à l’export."},
    f3:{q:"Quel système de travail s’y impose ?",a:"L’esclavage."}
  },
  {
    f1:{q:"Quelles conséquences globales a le commerce triangulaire ?",a:"Il enrichit l’Europe."},
    f2:{q:"Conséquence pour l’Afrique ?",a:"Appauvrissement humain et guerres."},
    f3:{q:"Conséquence pour les Amériques ?",a:"Économie de plantation basée sur l’esclavage."}
  }
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
