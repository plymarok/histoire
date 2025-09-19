// === THEME TOGGLE ===
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const root = document.documentElement;
  const theme = root.getAttribute("data-theme");
  root.setAttribute("data-theme", theme === "dark" ? "light" : "dark");
});

// === FLASHCARDS ===
const flashcards = [
  { term:"Colonisation", def:"Processus par lequel un pays prend possession d’un territoire étranger." },
  { term:"Exclusif", def:"Principe économique obligeant les colonies à commercer uniquement avec la métropole." },
  { term:"Monopole commercial", def:"Droit exclusif de commerce accordé par l’État à une compagnie." },
  { term:"Bourgeoisie commerciale", def:"Classe sociale de marchands qui s’enrichissent grâce au grand commerce." },
  { term:"Ports européens", def:"Lieux comme Bordeaux, Nantes, Londres, Amsterdam qui profitent du commerce colonial." },
  { term:"Commerce triangulaire", def:"Échanges entre Europe, Afrique et Amériques impliquant marchandises, esclaves et produits coloniaux." },
  { term:"Traite négrière", def:"Commerce organisé des esclaves africains vers les colonies américaines." },
  { term:"Code noir", def:"Texte juridique définissant le statut des esclaves dans les colonies françaises." },
  { term:"Abolition", def:"Suppression légale de la traite et de l’esclavage." }
];

let fcIndex = 0;
const fcTerm = document.getElementById("fc-term");
const fcDef = document.getElementById("fc-def");
const fcNext = document.getElementById("fc-next");
const fcProg = document.getElementById("fc-progress");

function showFlashcard(i){
  const card = flashcards[i];
  fcTerm.textContent = card.term;
  fcDef.textContent = card.def;
  fcProg.textContent = `${i+1}/${flashcards.length}`;
}
fcNext.addEventListener("click", ()=>{
  fcIndex = (fcIndex+1) % flashcards.length;
  showFlashcard(fcIndex);
});
showFlashcard(fcIndex);

// === QUIZ ===
const quizData = [
  {
    q: "Depuis quand l’Europe colonise-t-elle les autres continents ?",
    faisceaux: [
      {
        q:"Depuis quand l’Europe colonise-t-elle les autres continents ?",
        a:"Depuis le XVe siècle.",
        src:"Depuis le <strong>XVe siècle</strong>, l’Europe colonise les autres continents. La France domine mais perd presque toutes ses colonies au XVIIIe siècle. L’Angleterre domine les mers. L’Espagne, le Portugal et la Hollande sont de grandes puissances coloniales mais affaiblies."
      },
      {
        q:"Quelle puissance domine au départ ?",
        a:"La France.",
        src:"Depuis le XVe siècle, l’Europe colonise les autres continents. <strong>La France domine</strong> mais perd presque toutes ses colonies au XVIIIe siècle..."
      },
      {
        q:"Quelle puissance domine les mers ?",
        a:"L’Angleterre.",
        src:"Depuis le XVe siècle, l’Europe colonise les autres continents. La France domine mais perd presque toutes ses colonies au XVIIIe siècle. <strong>L’Angleterre domine les mers.</strong>"
      }
    ]
  },
  {
    q:"Quel système économique les grandes compagnies obtiennent-elles de l’État ?",
    faisceaux:[
      {
        q:"Quel système obtiennent-elles ?",
        a:"L’exclusif.",
        src:"Elles obtiennent de l’État un système de <strong>l’exclusif</strong>, des monopoles commerciaux entre les colonies et la métropole."
      },
      {
        q:"Quel type de droits commerciaux sont associés ?",
        a:"Les monopoles commerciaux.",
        src:"Elles obtiennent de l’État un système de l’exclusif, des <strong>monopoles commerciaux</strong> entre les colonies et la métropole."
      },
      {
        q:"Entre qui et qui s’exerce ce monopole ?",
        a:"Entre les colonies et la métropole.",
        src:"Elles obtiennent de l’État un système de l’exclusif, des monopoles commerciaux <strong>entre les colonies et la métropole.</strong>"
      }
    ]
  },
  {
    q:"Qui s’enrichit rapidement grâce au grand commerce ?",
    faisceaux:[
      {
        q:"Quels commerçants s’enrichissent ?",
        a:"Ceux des grands ports européens.",
        src:"Ces commerçants des <strong>grands ports européens</strong> s’enrichissent très vite."
      },
      {
        q:"Que devient cette bourgeoisie ?",
        a:"Très puissante.",
        src:"Cette bourgeoisie <strong>devient vite très puissante</strong>..."
      },
      {
        q:"Quelle nouvelle consommation s’impose en Europe ?",
        a:"Une consommation exotique (café, sucre, coton).",
        src:"... et impose partout en Europe une <strong>nouvelle consommation exotique (café, sucre, coton)</strong>."
      }
    ]
  },
  {
    q:"Qu’est-ce qui alimente le marché européen ?",
    faisceaux:[
      {
        q:"Quelles structures produisent pour l’Europe ?",
        a:"Les plantations dans les colonies.",
        src:"<strong>Le marché européen est alimenté par des plantations dans les colonies.</strong>"
      },
      {
        q:"Quel type de main-d’œuvre y est utilisé massivement ?",
        a:"L’esclavage.",
        src:"Pour répondre aux besoins de main-d’œuvre, on pratique à <strong>l’esclavage</strong>..."
      },
      {
        q:"D’où provient cette main-d’œuvre ?",
        a:"D’Afrique.",
        src:"... on pratique à l’esclavage de masse, avec une main-d’œuvre venue <strong>d’Afrique.</strong>"
      }
    ]
  },
  {
    q:"Quelle organisation se développe autour du commerce d’esclaves ?",
    faisceaux:[
      {
        q:"Quel nom donne-t-on à ce commerce ?",
        a:"La traite atlantique.",
        src:"Une véritable organisation se développe autour du commerce d’esclaves : <strong>la traite atlantique.</strong>"
      },
      {
        q:"Combien d’esclaves africains ont été déportés ?",
        a:"12 millions.",
        src:"<strong>12 millions d’esclaves africains</strong> sont déportés vers les Amériques..."
      },
      {
        q:"Dans quels navires sont-ils transportés ?",
        a:"Dans les navires négriers.",
        src:"... vers les Amériques dans des <strong>navires négriers</strong>."
      }
    ]
  },
  {
    q:"Où est défini le statut des esclaves ?",
    faisceaux:[
      {
        q:"Quel texte encadre ce statut ?",
        a:"Le Code noir.",
        src:"Le statut des esclaves est établi dans le <strong>Code noir</strong>..."
      },
      {
        q:"Comment les esclaves sont-ils considérés dans ce texte ?",
        a:"Comme des objets.",
        src:"... où ils sont <strong>considérés comme des objets.</strong>"
      },
      {
        q:"De quelle nationalité ce texte est-il ?",
        a:"Française.",
        src:"Le statut des esclaves est établi dans le Code noir, texte juridique de l’empire <strong>français.</strong>"
      }
    ]
  },
  {
    q:"Que dénoncent certains Européens ?",
    faisceaux:[
      {
        q:"De quoi s’indignent-ils ?",
        a:"Des conditions des esclaves.",
        src:"Certains Européens <strong>s’indignent des conditions des esclaves</strong>..."
      },
      {
        q:"Quels crimes dénoncent-ils ?",
        a:"Les crimes des esclavagistes.",
        src:"... et dénoncent les <strong>crimes des esclavagistes.</strong>"
      },
      {
        q:"Pour quoi militent-ils ?",
        a:"L’abolition de la traite et de l’esclavage.",
        src:"Ils militent pour <strong>l’abolition de la traite et de l’esclavage.</strong>"
      }
    ]
  },
  {
    q:"Quels produits exotiques circulent dans le commerce colonial ?",
    faisceaux:[
      {
        q:"Citez un produit colonial.",
        a:"Le café.",
        src:"Cette bourgeoisie devient très puissante et impose partout en Europe une nouvelle consommation exotique (<strong>café</strong>, sucre, coton)."
      },
      {
        q:"Citez un autre produit colonial.",
        a:"Le sucre.",
        src:"Cette bourgeoisie devient très puissante et impose partout en Europe une nouvelle consommation exotique (café, <strong>sucre</strong>, coton)."
      },
      {
        q:"Citez un troisième produit colonial.",
        a:"Le coton.",
        src:"Cette bourgeoisie devient très puissante et impose partout en Europe une nouvelle consommation exotique (café, sucre, <strong>coton</strong>)."
      }
    ]
  },
  {
    q:"Quel est le rôle des ports européens dans ce commerce ?",
    faisceaux:[
      {
        q:"Que font les commerçants de ces ports ?",
        a:"Ils s’enrichissent.",
        src:"Ces commerçants des <strong>grands ports européens</strong> s’enrichissent très vite."
      },
      {
        q:"Donne un exemple de port français qui en profite.",
        a:"Nantes (ou Bordeaux).",
        src:"Ces commerçants des grands ports européens (comme <strong>Nantes</strong>) s’enrichissent très vite."
      },
      {
        q:"Que devient cette bourgeoisie liée aux ports ?",
        a:"Puissante.",
        src:"Cette bourgeoisie <strong>devient très puissante</strong>..."
      }
    ]
  },
  {
    q:"Quel est l’effet du Code noir sur les esclaves ?",
    faisceaux:[
      {
        q:"Comment définit-il le statut des esclaves ?",
        a:"Comme objets.",
        src:"Le statut des esclaves est établi dans le Code noir où ils sont <strong>considérés comme des objets.</strong>"
      },
      {
        q:"Quelle nationalité a promulgué ce texte ?",
        a:"Française.",
        src:"Le statut des esclaves est établi dans le Code noir, texte juridique de l’empire <strong>français.</strong>"
      },
      {
        q:"À quelle époque ce texte s’applique-t-il ?",
        a:"Sous l’Ancien Régime (XVIIe-XVIIIe siècles).",
        src:"Le Code noir est un texte promulgué par la monarchie française sous <strong>l’Ancien Régime</strong>."
      }
    ]
  },
  {
    q:"Qui milite contre la traite et l’esclavage ?",
    faisceaux:[
      {
        q:"Qui s’indigne des conditions d’esclavage ?",
        a:"Certains Européens.",
        src:"<strong>Certains Européens</strong> s’indignent des conditions des esclaves..."
      },
      {
        q:"Que dénoncent-ils ?",
        a:"Les crimes des esclavagistes.",
        src:"... et dénoncent les <strong>crimes des esclavagistes.</strong>"
      },
      {
        q:"Pour quoi militent-ils concrètement ?",
        a:"Pour l’abolition.",
        src:"Ils militent pour <strong>l’abolition</strong> de la traite et de l’esclavage."
      }
    ]
  }
];

// Rendu du quiz
const quizWrap = document.getElementById("triQuizWrap");
quizData.forEach((item,i)=>{
  const block=document.createElement("div");
  block.className="quiz-block";
  block.innerHTML=`<h3>Q${i+1}. ${item.q}</h3>`;
  item.faisceaux.forEach((f,j)=>{
    const div=document.createElement("div");
    div.className="faisceau";
    div.innerHTML=`<strong>F${j+1} :</strong> ${f.q}`;
    div.addEventListener("click",()=>{
      if(div.classList.contains("open")){
        div.classList.remove("open");
        div.innerHTML=`<strong>F${j+1} :</strong> ${f.q}`;
      } else {
        div.classList.add("open");
        div.innerHTML=`
          <div class="fq"><strong>F${j+1} :</strong> ${f.q}</div>
          <div class="fa"><em>Réponse :</em> ${f.a}</div>
          <blockquote class="src">${f.src}</blockquote>
        `;
      }
    });
    block.appendChild(div);
  });
  quizWrap.appendChild(block);
});
