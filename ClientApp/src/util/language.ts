type Language = {
  navbar: string;
};

type LangStringList = {
  [key: string]: any;
};

export const strings: LangStringList = {
  en: {
    navbar: {
      problems: 'Problems',
      settings: 'Settings',
      game: 'Game'
    },
    errorpage: {
      title: 'Not found',
      main: "We couldn't find the page you were looking for :(",
      quokka: ['Here is a happy ', 'rainbow', ' ROYAL Quokka to cheer you up']
    },
    problemspage: {
      size: 'Size:',
      problem: 'Problem'
    },
    gamepage: {
      moves: 'Moves',
      minimum: 'Minimum',
      yes: 'YES ',
      no: 'NO ',
      question: [
        'This will reset all your changes and start playing unstoppable solution animation!',
        'Are you sure you want to proceed?'
      ],
      victory: ['You finished the problem in ', ' moves!']
    },
    settingspage: {
      language: 'Language',
      speed: ['Animation speed', 'Speed '],
      slider: ['Slow ', ' Fast'],
      alt: ['Croatian flag', 'British flag', 'German flag']
    },
    homepage: {
      title: 'Welcome to the Container Relocate!',
      what: [
        'What is Container Relocate?',
        'Container relocate is a game used to learn the algorithm for the gantry crane container relocation problem.',
        'Currently it contains ',
        ' problems and solutions. ',
        ' problems have been solved by visitors.',
        "The application was developed as a bachelor's degree final project at the University of Rijeka Faculty of Engineering."
      ]
    }
  },
  hr: {
    navbar: {
      problems: 'Problemi',
      settings: 'Postavke',
      game: 'Igra'
    },
    errorpage: {
      title: 'Stranica nije pronađena',
      main: 'Nismo mogli pronaći stranicu koju ste tražili :(',
      quokka: ['Ali smo pronašli ', 'šarenu', ' KRALJEVSKU Quokku da vam podigne raspoloženje']
    },
    problemspage: {
      size: 'Veličina:',
      problem: 'Problem'
    },
    gamepage: {
      moves: 'Potezi',
      minimum: 'Minimalno',
      yes: 'DA ',
      no: 'NE ',
      question: [
        'Ovo će resetirati vaš napredak i pokrenuti nezaustavljivu animaciju rješenja!',
        'Jeste li sigurni da želite nastaviti?'
      ],
      victory: ['Riješili ste problem u ', ' poteza!']
    },
    settingspage: {
      language: 'Jezik',
      speed: ['Brzina animacije', 'Brzina '],
      slider: ['Sporo ', ' Brzo'],
      alt: ['Hrvatska zastava', 'Britanska zastava', 'Njemačka zastava']
    },
    homepage: {
      title: 'Dobro došli u Container Relocate!',
      what: [
        'Što je Container Relocate?',
        'Container relocate je obrazovna igra koja služi za učenje algoritma optimalnog premještanja kontejnera pomoću pokretne dizalice.',
        'Trenutno je dostupno ',
        ' problema s rješenjima. ',
        ' problema su riješili korisnici aplikacije.',
        'Aplikacija je razvijena kao završni rad na Tehničkom Fakultetu Sveučilišta u Rijeci'
      ]
    }
  },
  de: {
    navbar: {
      problems: 'Probleme',
      settings: 'Einstellungen',
      game: 'Spiel'
    },
    errorpage: {
      title: 'Die Seite wurde nicht gefunden',
      main: 'Wir könnten diese Seite nicht finden ☹',
      quokka: [' Aber wir haben', 'bunte', 'KÖNIGLICHE Quokka gefunden um ihre Stimmung zu heben']
    },
    problemspage: {
      size: 'Größe',
      problem: 'Problem'
    },
    gamepage: {
      moves: 'Züge',
      minimum: 'Minimal',
      yes: 'JA',
      no: 'NEIN',
      question: [
        'Das wird Ihren Fortschritt zurücksetzen und eine unaufhaltsame Animationslösung zeigen!',
        'Sind Sie sicher, dass Sie fortfahren möchten?'
      ],
      victory: ['Sie haben das Problem in ', ' Zügen gelöst!']
    },
    settingspage: {
      language: 'Sprache',
      speed: ['Geschwindigkeit der Animation', 'Geschwindigkeit '],
      slider: ['Langsam', 'Schnell'],
      alt: ['Kroatische Flagge', 'Flagge des Vereinigten Königreichs', 'Deutsche Flagge']
    },
    homepage: {
      title: 'Wilkommen zu Container Relocate!',
      what: [
        'Was ist Container Relocate?',
        'Container Relocate ist ein Lernspiel, mit dem der Algorithmus für die optimale Bewegung von Containern mithilfe eines Mobilkrans erlernt wird.',
        'Derzeit verfügbar ',
        ' Probleme mit Lösungen. ',
        ' Probleme wurden von den Benutzern der App gelöst.',
        'Diese App wurde als Abschlussarbeit an der Technischen Fakultät der Universität von Rijeka entwickelt'
      ]
    }
  }
};
