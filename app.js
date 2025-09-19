// === Thème clair/sombre ===
document.getElementById("themeToggle").addEventListener("click",()=>{
  const html=document.documentElement;
  html.dataset.theme = html.dataset.theme==="light" ? "dark" : "light";
});

// === Flashcards ===
const flashcards = [
  {t:"Colonisation", d:"Processus par lequel un pays prend possession d’un territoire étranger."},
  {t:"Exclusif", d:"Système obligeant les colonies à commercer uniquement avec la métropole."},
  {t:"Commerce triangulaire", d:"Échanges entre Europe, Afrique et Amériques."},
  {t:"Traite atlantique", d:"Commerce d’esclaves africains vers les Amériques."},
  {t:"Code noir", d:"Texte qui définit le statut des esclaves dans les colonies françaises."},
  {t:"Bourgeoisie marchande", d:"Classe sociale de commerçants enrichis par les échanges coloniaux."},
  {t:"Produits coloniaux", d:"Sucre, café, coton, etc."},
  {t:"Navires négriers", d:"Bateaux transportant les esclaves."},
  {t:"Abolitionnistes", d:"Mouvements et personnes militant contre l’esclavage."}
];
let fcIndex = 0;
const fcTerm=document.getElementById("fc-term");
const fcDef=document.getElementById("fc-def");
const fcProgress=document.getElementById("fc-progress");
const fcNext=document.getElementById("fc-next");
function updateCard(){
  const card=flashcards[fcIndex];
  fcTerm.textContent=card.t;
  fcDef.textContent="Définition : "+card.d;
  fcProgress.textContent=`${fcIndex+1}/${flashcards.length}`;
}
fcNext.addEventListener("click",()=>{fcIndex=(fcIndex+1)%flashcards.length;updateCard();});
updateCard();

// === Quiz ===
const triData=[
  {
    f1:{q:"Depuis quand l’Europe colonise-t-elle les autres continents ?",a:"Depuis le XVe siècle.",src:"Depuis le <strong>XVe siècle</strong>, l’Europe colonise les autres continents. La France domine mais perd presque toutes ses colonies au XVIIIe siècle. L’Angleterre domine les mers. L’Espagne, le Portugal et la Hollande sont de grandes puissances coloniales mais affaiblies."},
    f2:{q:"Quelle puissance domine au départ ?",a:"La France.",src:"Depuis le XVe siècle, l’Europe colonise les autres continents. <strong>La France domine</strong> mais perd presque toutes ses colonies au XVIIIe siècle. L’Angleterre domine les mers. L’Espagne, le Portugal et la Hollande sont de grandes puissances coloniales mais affaiblies."},
    f3:{q:"Que devient cette puissance au XVIIIe siècle ?",a:"Elle perd presque toutes ses colonies.",src:"Depuis le XVe siècle, l’Europe colonise les autres continents. La France domine mais <strong>perd presque toutes ses colonies au XVIIIe siècle</strong>. L’Angleterre domine les mers. L’Espagne, le Portugal et la Hollande sont de grandes puissances coloniales mais affaiblies."}
  }
  // ... à compléter avec les 11 autres questions
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
    f.innerHTML=`<strong>F${j+1} :</strong> ${item[key].q}`;
    f.addEventListener("click",()=>{
      f.classList.toggle("open");
      if(f.classList.contains("open")){
        f.innerHTML=`
          <div class="fq"><strong>F${j+1} :</strong> ${item[key].q}</div>
          <div class="fa"><em>Réponse :</em> ${item[key].a}</div>
          <blockquote class="src">${item[key].src}</blockquote>
        `;
      } else {
        f.innerHTML=`<strong>F${j+1} :</strong> ${item[key].q}`;
      }
    });
    card.appendChild(f);
  });
  quizDiv.appendChild(card);
});
