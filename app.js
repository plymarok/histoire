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
  // Q1
  {
    f1:{q:"Depuis quand l’Europe colonise-t-elle les autres continents ?",a:"Depuis le XVe siècle.",src:"Depuis le <strong>XVe siècle</strong>, l’Europe colonise les autres continents. La France domine mais perd presque toutes ses colonies au XVIIIe siècle. L’Angleterre domine les mers. L’Espagne, le Portugal et la Hollande sont de grandes puissances coloniales mais affaiblies."},
    f2:{q:"Quelle puissance domine au départ ?",a:"La France.",src:"Depuis le XVe siècle, l’Europe colonise les autres continents. <strong>La France domine</strong> mais perd presque toutes ses colonies au XVIIIe siècle. L’Angleterre domine les mers. L’Espagne, le Portugal et la Hollande sont de grandes puissances coloniales mais affaiblies."},
    f3:{q:"Que devient cette puissance au XVIIIe siècle ?",a:"Elle perd presque toutes ses colonies.",src:"Depuis le XVe siècle, l’Europe colonise les autres continents. La France domine mais <strong>perd presque toutes ses colonies au XVIIIe siècle</strong>. L’Angleterre domine les mers. L’Espagne, le Portugal et la Hollande sont de grandes puissances coloniales mais affaiblies."}
  },
  // Q2
  {
    f1:{q:"Qui domine les mers ?",a:"L’Angleterre.",src:"Depuis le XVe siècle, l’Europe colonise les autres continents. La France domine mais perd presque toutes ses colonies au XVIIIe siècle. <strong>L’Angleterre domine les mers.</strong> L’Espagne, le Portugal et la Hollande sont de grandes puissances coloniales mais affaiblies."},
    f2:{q:"Quelles puissances sont affaiblies ?",a:"L’Espagne, le Portugal et la Hollande.",src:"Depuis le XVe siècle, l’Europe colonise les autres continents. La France domine mais perd presque toutes ses colonies au XVIIIe siècle. L’Angleterre domine les mers. <strong>L’Espagne, le Portugal et la Hollande</strong> sont de grandes puissances coloniales mais <strong>affaiblies</strong>."},
    f3:{q:"Qu’arrive-t-il à ces puissances ?",a:"Elles sont affaiblies.",src:"Depuis le XVe siècle, l’Europe colonise les autres continents. La France domine mais perd presque toutes ses colonies au XVIIIe siècle. L’Angleterre domine les mers. L’Espagne, le Portugal et la Hollande sont de grandes puissances coloniales mais <strong>affaiblies</strong>."}
  },
  // Q3
  {
    f1:{q:"Quel système les grandes compagnies obtiennent-elles ?",a:"Un système de l’exclusif.",src:"Elles obtiennent de l’État un système de <strong>l’exclusif</strong>, des monopoles commerciaux entre les colonies et la métropole."},
    f2:{q:"Quel type de privilèges commerciaux reçoivent-elles ?",a:"Des monopoles commerciaux.",src:"Elles obtiennent de l’État un système de l’exclusif, des <strong>monopoles commerciaux</strong> entre les colonies et la métropole."},
    f3:{q:"Avec qui les colonies doivent-elles commercer ?",a:"Uniquement avec la métropole.",src:"Elles obtiennent de l’État un système de l’exclusif, des monopoles commerciaux entre les colonies et <strong>la métropole</strong>."}
  },
  // Q4
  {
    f1:{q:"Qui s’enrichit très vite ?",a:"Les commerçants des grands ports européens.",src:"Ces <strong>commerçants des grands ports européens</strong> s’enrichissent très vite. Cette bourgeoisie devient très puissante et impose partout en Europe une nouvelle consommation exotique (café, sucre, coton)."},
    f2:{q:"Que devient cette bourgeoisie ?",a:"Très puissante.",src:"Ces commerçants des grands ports européens s’enrichissent très vite. Cette <strong>bourgeoisie devient très puissante</strong> et impose partout en Europe une nouvelle consommation exotique (café, sucre, coton)."},
    f3:{q:"Qu’impose-t-elle partout en Europe ?",a:"Une nouvelle consommation exotique.",src:"Ces commerçants des grands ports européens s’enrichissent très vite. Cette bourgeoisie devient très puissante et <strong>impose partout en Europe une nouvelle consommation exotique (café, sucre, coton)</strong>."}
  },
  // Q5
  {
    f1:{q:"Qu’alimente le marché européen ?",a:"Les plantations dans les colonies.",src:"<strong>Le marché européen est alimenté par des plantations dans les colonies.</strong> Pour répondre aux besoins de main-d’œuvre, on pratique à l’esclavage de masse, avec une main-d’œuvre venue d’Afrique."},
    f2:{q:"De quoi a-t-on besoin pour les plantations ?",a:"De main-d’œuvre.",src:"Le marché européen est alimenté par des plantations dans les colonies. <strong>Pour répondre aux besoins de main-d’œuvre</strong>, on pratique à l’esclavage de masse, avec une main-d’œuvre venue d’Afrique."},
    f3:{q:"D’où vient cette main-d’œuvre ?",a:"D’Afrique.",src:"Le marché européen est alimenté par des plantations dans les colonies. Pour répondre aux besoins de main-d’œuvre, on pratique à l’esclavage de masse, avec une <strong>main-d’œuvre venue d’Afrique</strong>."}
  },
  // Q6
  {
    f1:{q:"Qu’organise la traite atlantique ?",a:"Le commerce d’esclaves.",src:"Une véritable organisation se développe autour du <strong>commerce d’esclaves : la traite atlantique</strong>. 12 millions d’esclaves africains sont déportés vers les Amériques dans des navires négriers. Le statut des esclaves est établi dans le Code noir où ils sont considérés comme des objets."},
    f2:{q:"Combien d’esclaves africains ont été déportés ?",a:"12 millions.",src:"Une véritable organisation se développe autour du commerce d’esclaves : la traite atlantique. <strong>12 millions d’esclaves africains sont déportés</strong> vers les Amériques dans des navires négriers. Le statut des esclaves est établi dans le Code noir où ils sont considérés comme des objets."},
    f3:{q:"Dans quoi étaient-ils transportés ?",a:"Dans des navires négriers.",src:"Une véritable organisation se développe autour du commerce d’esclaves : la traite atlantique. 12 millions d’esclaves africains sont déportés vers les Amériques dans des <strong>navires négriers</strong>. Le statut des esclaves est établi dans le Code noir où ils sont considérés comme des objets."}
  },
  // Q7
  {
    f1:{q:"Quel texte définit le statut des esclaves ?",a:"Le Code noir.",src:"Le statut des esclaves est établi dans le <strong>Code noir</strong> où ils sont considérés comme des objets."},
    f2:{q:"Comment y sont-ils considérés ?",a:"Comme des objets.",src:"Le statut des esclaves est établi dans le Code noir où ils sont <strong>considérés comme des objets</strong>."},
    f3:{q:"À quoi sert ce texte ?",a:"À établir le statut des esclaves.",src:"<strong>Le statut des esclaves est établi dans le Code noir</strong> où ils sont considérés comme des objets."}
  },
  // Q8
  {
    f1:{q:"Qui s’indigne des conditions des esclaves ?",a:"Certains Européens.",src:"<strong>Certains Européens</strong> s’indignent des conditions des esclaves et dénoncent les crimes des esclavagistes. Ils militent pour l’abolition de la traite et de l’esclavage."},
    f2:{q:"Que dénoncent-ils ?",a:"Les crimes des esclavagistes.",src:"Certains Européens s’indignent des conditions des esclaves et <strong>dénoncent les crimes des esclavagistes</strong>. Ils militent pour l’abolition de la traite et de l’esclavage."},
    f3:{q:"Pour quoi militent-ils ?",a:"Pour l’abolition de la traite et de l’esclavage.",src:"Certains Européens s’indignent des conditions des esclaves et dénoncent les crimes des esclavagistes. Ils <strong>militent pour l’abolition de la traite et de l’esclavage</strong>."}
  },
  // Q9
  {
    f1:{q:"Quels produits exotiques étaient consommés en Europe ?",a:"Café, sucre, coton.",src:"Cette bourgeoisie devient très puissante et impose partout en Europe une nouvelle consommation exotique (<strong>café, sucre, coton</strong>)."},
    f2:{q:"Qui imposait cette consommation exotique ?",a:"La bourgeoisie marchande.",src:"Ces commerçants des grands ports européens s’enrichissent très vite. Cette <strong>bourgeoisie</strong> devient très puissante et impose partout en Europe une nouvelle consommation exotique (café, sucre, coton)."},
    f3:{q:"D’où venaient ces produits ?",a:"Des colonies.",src:"Ces commerçants des grands ports européens s’enrichissent très vite. Cette bourgeoisie devient très puissante et impose partout en Europe une nouvelle consommation exotique (<strong>café, sucre, coton</strong>)."}
  },
  // Q10
  {
    f1:{q:"Comment appelle-t-on la déportation d’esclaves vers les Amériques ?",a:"La traite atlantique.",src:"Une véritable organisation se développe autour du commerce d’esclaves : la <strong>traite atlantique</strong>. 12 millions d’esclaves africains sont déportés vers les Amériques dans des navires négriers."},
    f2:{q:"Combien d’esclaves environ ont été déportés ?",a:"12 millions.",src:"Une véritable organisation se développe autour du commerce d’esclaves : la traite atlantique. <strong>12 millions d’esclaves africains sont déportés</strong> vers les Amériques dans des navires négriers."},
    f3:{q:"Vers où ces esclaves étaient-ils envoyés ?",a:"Vers les Amériques.",src:"Une véritable organisation se développe autour du commerce d’esclaves : la traite atlantique. 12 millions d’esclaves africains sont déportés <strong>vers les Amériques</strong> dans des navires négriers."}
  },
  // Q11
  {
    f1:{q:"Qui militait pour l’abolition ?",a:"Les mouvements abolitionnistes européens.",src:"Certains Européens s’indignent des conditions des esclaves et dénoncent les crimes des esclavagistes. Ils <strong>militent pour l’abolition de la traite et de l’esclavage</strong>."},
    f2:{q:"Quelles deux pratiques voulaient-ils abolir ?",a:"La traite et l’esclavage.",src:"Certains Européens s’indignent des conditions des esclaves et dénoncent les crimes des esclavagistes. Ils militent pour l’abolition de la <strong>traite et de l’esclavage</strong>."},
    f3:{q:"Pourquoi s’opposaient-ils à l’esclavage ?",a:"À cause des conditions inhumaines et des crimes commis.",src:"<strong>Certains Européens s’indignent des conditions des esclaves</strong> et <strong>dénoncent les crimes des esclavagistes</strong>. Ils militent pour l’abolition de la traite et de l’esclavage."}
  },
  // Q12
  {
    f1:{q:"Dans quoi travaillaient les esclaves aux Amériques ?",a:"Dans les plantations.",src:"Les esclaves travaillent dans les <strong>plantations (sucre, café, coton, etc.)</strong> ; les produits coloniaux sont expédiés vers l’Europe, enrichissant compagnies et ports."},
    f2:{q:"Quels produits y étaient cultivés ?",a:"Sucre, café, coton.",src:"Les esclaves travaillent dans les plantations (<strong>sucre, café, coton</strong>, etc.) ; les produits coloniaux sont expédiés vers l’Europe, enrichissant compagnies et ports."},
    f3:{q:"Où étaient envoyés ces produits ?",a:"Vers l’Europe.",src:"Les esclaves travaillent dans les plantations (sucre, café, coton, etc.) ; les produits coloniaux sont expédiés <strong>vers l’Europe</strong>, enrichissant compagnies et ports."}
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
