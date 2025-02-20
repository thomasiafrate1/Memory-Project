// src/store/defaultData.ts

export const defaultThemes = {
    Anglais: [
      { title: "Salutations", color: "blue" },
      { title: "Verbes", color: "red" }
    ],
    Histoire: [
      { title: "Révolution Française", color: "brown" },
      { title: "Première Guerre Mondiale", color: "black" }
    ],
    Mathématiques: [
      { title: "Algèbre", color: "orange" },
      { title: "Géométrie", color: "green" }
    ],
    Programmation: [
      { title: "JavaScript", color: "yellow" },
      { title: "Python", color: "blue" }
    ],
    Géographie: [
      { title: "Capitales du monde", color: "lightblue" },
      { title: "Fleuves et rivières", color: "aqua" }
    ],
    Français: [
      { title: "Grammaire", color: "purple" },
      { title: "Figures de style", color: "pink" }
    ],
    Marketing: [
      { title: "Publicité", color: "gold" },
      { title: "Stratégie de marque", color: "darkblue" }
    ],
    Luxe: [
      { title: "Marques de luxe", color: "goldenrod" },
      { title: "Produits de luxe", color: "silver" }
    ],
    Ecologie: [
      { title: "Réchauffement climatique", color: "green" },
      { title: "Énergies renouvelables", color: "darkgreen" }
    ],
    Politique: [
      { title: "Systèmes politiques", color: "gray" },
      { title: "Institutions internationales", color: "darkgray" }
    ]
  };
  
  export const defaultQuestions = {
    // Anglais
    Salutations: [
      { question: "Comment dit-on 'Bonjour' en anglais ?", answer: "Hello", color: "blue" },
      { question: "Comment dit-on 'Au revoir' en anglais ?", answer: "Goodbye", color: "blue" },
      { question: "Comment demande-t-on 'Comment ça va ?' ?", answer: "How are you?", color: "blue" }
    ],
    Verbes: [
      { question: "Quel est le verbe 'manger' en anglais ?", answer: "Eat", color: "red" },
      { question: "Quel est le verbe 'courir' en anglais ?", answer: "Run", color: "red" },
      { question: "Quel est le verbe 'voir' en anglais ?", answer: "See", color: "red" }
    ],
    
    // Histoire
    "Révolution Française": [
      { question: "En quelle année a commencé la Révolution Française ?", answer: "1789", color: "brown" },
      { question: "Qui était roi au début de la Révolution Française ?", answer: "Louis XVI", color: "brown" },
      { question: "Quel est le symbole de la Révolution Française ?", answer: "La guillotine", color: "brown" }
    ],
    "Première Guerre Mondiale": [
      { question: "En quelle année a commencé la Première Guerre Mondiale ?", answer: "1914", color: "black" },
      { question: "Quel traité a mis fin à la Première Guerre Mondiale ?", answer: "Le traité de Versailles", color: "black" },
      { question: "Quelle bataille est connue comme la plus longue de la guerre ?", answer: "La bataille de Verdun", color: "black" }
    ],
  
    // Mathématiques
    Algèbre: [
      { question: "Quel est le résultat de 5 + 7 ?", answer: "12", color: "orange" },
      { question: "Que représente x dans l'équation 2x = 10 ?", answer: "5", color: "orange" },
      { question: "Quelle est la formule du discriminant ?", answer: "b² - 4ac", color: "orange" }
    ],
    Géométrie: [
      { question: "Quelle est la somme des angles d'un triangle ?", answer: "180°", color: "green" },
      { question: "Comment appelle-t-on un triangle qui a deux côtés égaux ?", answer: "Un triangle isocèle", color: "green" },
      { question: "Quelle est la formule de l'aire d'un cercle ?", answer: "π × r²", color: "green" }
    ],
  
    // Programmation
    JavaScript: [
      { question: "Quel mot-clé est utilisé pour déclarer une variable ?", answer: "var, let, ou const", color: "yellow" },
      { question: "Quelle méthode permet d'ajouter un élément à un tableau ?", answer: ".push()", color: "yellow" },
      { question: "Comment afficher un message dans la console ?", answer: "console.log()", color: "yellow" }
    ],
    Python: [
      { question: "Quel symbole est utilisé pour les commentaires ?", answer: "#", color: "blue" },
      { question: "Quelle fonction permet d'afficher du texte ?", answer: "print()", color: "blue" },
      { question: "Comment déclarer une liste ?", answer: "ma_liste = [1, 2, 3]", color: "blue" }
    ],
  
    // Géographie
    "Capitales du monde": [
      { question: "Quelle est la capitale du Canada ?", answer: "Ottawa", color: "lightblue" },
      { question: "Quelle est la capitale de l'Australie ?", answer: "Canberra", color: "lightblue" },
      { question: "Quelle est la capitale du Brésil ?", answer: "Brasilia", color: "lightblue" }
    ],
    "Fleuves et rivières": [
      { question: "Quel est le plus long fleuve du monde ?", answer: "Le Nil", color: "aqua" },
      { question: "Quel fleuve traverse Paris ?", answer: "La Seine", color: "aqua" },
      { question: "Quel fleuve est le plus long d'Amérique du Sud ?", answer: "L'Amazone", color: "aqua" }
    ],
  
    // Français
    Grammaire: [
      { question: "Quels sont les 3 groupes de verbes ?", answer: "1er (-er), 2e (-ir), 3e (-re, -oir)", color: "purple" },
      { question: "Quel est le complément d’objet direct dans 'Je mange une pomme' ?", answer: "une pomme", color: "purple" },
      { question: "Quel est l'infinitif du verbe 'chanté' ?", answer: "Chanter", color: "purple" }
    ],
    "Figures de style": [
      { question: "Quelle figure de style compare avec 'comme' ?", answer: "Une comparaison", color: "pink" },
      { question: "Quelle figure de style exagère un propos ?", answer: "Une hyperbole", color: "pink" },
      { question: "Quelle figure de style remplace un mot par un autre ?", answer: "Une métonymie", color: "pink" }
    ]
  };
  