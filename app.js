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
let fcIndex=0;
const term=document.getElementById("term"),def=document.getElementById("def"),
fcProgress=document.getElementById("fcProgress");
function updateCard(){
  term.textContent=flashcards[fcIndex].t;
  def.textContent="Définition : " + flashcards[fcIndex].d;
  fcProgress.textContent=`${fcIndex+1}/${flashcards.length}`;
}
document.getElementById("btnNext").onclick=()=>{
  fcIndex=(fcIndex+1)%flashcards.length;
  updateCard();
};
updateCard();

// === Quiz (12 questions fidèles au cours) ===
const triData=[
  {
    f1:{q:"Depuis quand l’Europe colonise-t-elle les autres continents ?",a:"Depuis le XVe siècle."},
    f2:{q:"Quelle puissance domine au départ ?",a:"La France."},
    f3:{q:"Que devient cette puissance au XVIIIe siècle ?",a:"Elle perd presque toutes ses colonies."}
  },
  {
    f1:{q:"Qui domine les mers ?",a:"L’Angleterre."},
    f2:{q:"Pourquoi est-ce important ?",a:"Parce que cela assure la maîtrise du commerce maritime."},
    f3:{q:"Quelle conséquence pour la France ?",a:"Elle perd en influence coloniale."}
  },
  {
    f1:{q:"Quelles puissances coloniales sont affaiblies ?",a:"L’Espagne, le Portugal et la Hollande."},
    f2:{q:"Que cela signifie-t-il ?",a:"Elles ne sont plus dominantes."},
    f3:{q:"Qui prend alors l’avantage ?",a:"La France et l’Angleterre."}
  },
  {
    f1:{q:"Qu’obtiennent les grandes compagnies commerciales ?",a:"L’exclusif et des monopoles commerciaux."},
    f2:{q:"Que signifie l’exclusif ?",a:"Les colonies doivent commercer uniquement avec la métropole."},
    f3:{q:"Pourquoi cela enrichit-il la métropole ?",a:"Tout le commerce passe par elle."}
  },
  {
    f1:{q:"Qui s’enrichit dans les grands ports européens ?",a:"Les commerçants."},
    f2:{q:"Comment appelle-t-on cette classe ?",a:"La bourgeoisie commerciale."},
    f3:{q:"Que gagne cette bourgeoisie ?",a:"Puissance économique et sociale."}
  },
  {
    f1:{q:"Quels produits exotiques s’imposent en Europe ?",a:"Le café, le sucre et le coton."},
    f2:{q:"Pourquoi séduisent-ils ?",a:"Nouveauté et prestige social."},
    f3:{q:"Conséquence ?",a:"Nouvelles habitudes de consommation."}
  },
  {
    f1:{q:"Qu’est-ce qui alimente le marché européen ?",a:"Les plantations coloniales."},
    f2:{q:"Quelle main-d’œuvre est utilisée ?",a:"Des esclaves venus d’Afrique."},
    f3:{q:"Pourquoi ce recours massif ?",a:"Les cultures exigent beaucoup de bras."}
  },
  {
    f1:{q:"Comment appelle-t-on le commerce d’esclaves africains ?",a:"La traite atlantique."},
    f2:{q:"Combien de personnes déportées ?",a:"Environ 12 millions."},
    f3:{q:"Sur quels bateaux ?",a:"Les navires négriers."}
  },
  {
    f1:{q:"Quel texte fixe le statut des esclaves ?",a:"Le Code noir."},
    f2:{q:"Que dit-il des esclaves ?",a:"Ils sont considérés comme des objets."},
    f3:{q:"Conséquence ?",a:"Institutionnalisation de la déshumanisation."}
  },
  {
    f1:{q:"Qui dénonce les conditions des esclaves ?",a:"Certains Européens."},
    f2:{q:"Comment appelle-t-on ces personnes ?",a:"Les abolitionnistes."},
    f3:{q:"Que réclament-ils ?",a:"L’abolition de la traite et de l’esclavage."}
  },
  {
    f1:{q:"Quels produits coloniaux arrivent en Europe ?",a:"Sucre, café, coton."},
    f2:{q:"Pourquoi sont-ils produits ?",a:"Pour alimenter la consommation européenne."},
    f3:{q:"Qui profite de ce commerce ?",a:"Les ports et compagnies européennes."}
  },
  {
    f1:{q:"Comment s’appelle le système reliant 3 continents ?",a:"Le commerce triangulaire."},
    f2:{q:"Que transporte l’Europe vers l’Afrique ?",a:"Des marchandises (armes, tissus, alcool)."},
    f3:{q:"Que reviennent des Amériques vers l’Europe ?",a:"Les produits coloniaux."}
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
