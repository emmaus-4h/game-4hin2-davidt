/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */
/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const HOME = 0
const SPELEN = 1;
const GAMEOVER = 2;
const PAUZE = 3;
var spelStatus = SPELEN;

//punten
var score = 0;

var rVergoeding1;
var rVergoeding2;

var img; //plaatje

// start + pauze knop
var knopX = 1070;
var knopY = 250;
var knopW = 120;
var knopH = 25;
var mouseIsPressedLastTime = false;


//deze arrays bevatten de positie van de blokken
var Blok = Array.from(Array(4), () => new Array(4));

var positieBlok = new Array(6);

// tetris bord
var bord = Array.from(Array(20), () => new Array(10));

//tetromino 
const Tetromino = [  // 7 soorten Tetromino stenen
  [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // Vierkant tetromino
  [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // Rechte tetromino
  [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],  // Z-tetromino
  [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // S-tetromino
  [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // L-tetromino
  [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // J-tetromino
  [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // T-tetromino
];

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Genereer een nieuwe Tetromino-blok
 */
var generateTetromino = function() {
  var type = Math.floor(Math.random() * Tetromino.length);
  var rotation = Math.floor(Math.random() * 4);
  var x = 3; // Startpositie van het blok op het bord
  var y = 0;
  
  positieBlok[0] = x;
  positieBlok[1] = y;
  positieBlok[2] = rotation;
  positieBlok[3] = type;
};

/**
 * Tekent het Tetris-bord en de Tetromino-blokken
 */
var tekenBord = function() {
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 10; j++) {
      if (bord[i][j] === 1) {
        // Teken een gevuld blokje
        fill("blue");
        rect(j * 30, i * 30, 30, 30);
      } else {
        // Teken een leeg blokje
        fill("#282f70");
        rect(j * 30, i * 30, 30, 30);
      }
    }
  }

  var type = positieBlok[3];
  var rotation = positieBlok[2];
  var x = positieBlok[1];
  var y = positieBlok[0];

  // Teken het huidige Tetromino-blok
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (Tetromino[type][rotation][i][j] === 1) {
        fill("red");
        rect((j + x) * 30, (i + y) * 30, 30, 30);
      }
    }
  }
};

/**
 * Controleer of het Tetromino-blok kan bewegen
 * @param {number} dx - Verandering in x-positie
 * @param {number} dy - Verandering in y-positie
 * @param {number} rotation - Rotatie van het blok
 * @returns {boolean} - True als het blok kan bewegen, anders False
 */
var kanBlokBewegen = function(dx, dy, rotation) {
  var type = positieBlok[3];
  var x = positieBlok[1] + dx;
  var y = positieBlok[0] + dy;

  // Controleer of het blok binnen het bord blijft
  if (x < 0 || x >= 10 || y >= 20) {
    return false;
  }

  // Controleer op botsingen met andere blokken op het bord
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (Tetromino[type][rotation][i][j] === 1) {
        var nx = x + j;
        var ny = y + i;

        if (ny >= 0 && (ny >= 20 || bord[ny][nx] === 1)) {
          return false;
        }
      }
    }
  }

  return true;
};

/**
 * Draai het Tetromino-blok met de klok mee
 */
var draaiBlok = function() {
  var type = positieBlok[3];
  var rotation = positieBlok[2];
  var newRotation = (rotation + 1) % 4;

  if (kanBlokBewegen(0, 0, newRotation)) {
    positieBlok[2] = newRotation;
  }
};

/**
 * Verplaats het Tetromino-blok naar links
 */
var verplaatsLinks = function() {
  if (kanBlokBewegen(-1, 0, positieBlok[2])) {
    positieBlok[1] -= 1;
  }
};

/**
 * Verplaats het Tetromino-blok naar rechts
 */
var verplaatsRechts = function() {
  if (kanBlokBewegen(1, 0, positieBlok[2])) {
    positieBlok[1] += 1;
  }
};

/**
 * Verplaats het Tetromino-blok naar beneden
 */
var verplaatsBeneden = function() {
  if (kanBlokBewegen(0, 1, positieBlok[2])) {
    positieBlok[0] += 1;
  } else {
    verwerkBlok();
  }
};

/**
 * Verwerk het Tetromino-blok nadat het niet verder kan bewegen
 */
var verwerkBlok = function() {
  var type = positieBlok[3];
  var rotation = positieBlok[2];
  var x = positieBlok[1];
  var y = positieBlok[0];

  // Voeg het Tetromino-blok toe aan het bord
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (Tetromino[type][rotation][i][j] === 1) {
        var nx = x + j;
        var ny = y + i;

        if (ny >= 0) {
          bord[ny][nx] = 1;
        }
      }
    }
  }

  // Controleer of er volle rijen zijn
  for (var i = 0; i < 20; i++) {
    var volleRij = true;

    for (var j = 0; j < 10; j++) {
      if (bord[i][j] === 0) {
        volleRij = false;
        break;
      }
    }

    if (volleRij) {
      // Verwijder de volle rij en verplaats de rijen erboven omlaag
      for (var k = i; k > 0; k--) {
        for (var j = 0; j < 10; j++) {
          bord[k][j] = bord[k - 1][j];
        }
      }

      // Maak de bovenste rij leeg
      for (var j = 0; j < 10; j++) {
        bord[0][j] = 0;
      }

      // Verhoog de score
      score += 10;
    }
  }

  // Genereer een nieuw Tetromino-blok
  generateTetromino();

  // Controleer of het spel voorbij is
  if (!kanBlokBewegen(0, 0, positieBlok[2])) {
    spelStatus = GAMEOVER;
  }
};

/**
 * Tekent het Tetris-spel
 */
var tekenSpel = function() {
  // Teken het bord en het Tetromino-blok
  tekenBord();

  // Teken de score
  fill(255);
  textSize(20);
  text("Score: " + score, 420, 50);
};

/**
 * Reset het spel
 */
var resetSpel = function() {
  // Initialiseer het bord
  bord = Array.from(Array(20), () => new Array(10));

  // Initialiseer de score
  score = 0;

  // Genereer het eerste Tetromino-blok
  generateTetromino();

  // Zet de spelstatus op SPELEN
  spelStatus = SPELEN;
};

/* ********************************************* */
/* p5 functies die je gebruikt in je game         */
/* ********************************************* */

/**
 * Setup functie wordt één keer uitgevoerd door p5 bij het starten van de game
 */
function setup() {
  createCanvas(1200, 600);
  frameRate(30);
  generateTetromino();
}

/**
 * draw functie wordt continu uitgevoerd door p5
 */
function draw() {
  background(0);

  // Controleer de huidige spelstatus
  if (spelStatus === SPELEN) {
    tekenSpel();
  } else if (spelStatus === GAMEOVER) {
    // Teken het einde van het spel
    fill(255);
    textSize(40);
    text("Game Over", 500, 300);
    textSize(20);
    text("Druk op de spatiebalk om opnieuw te spelen", 440, 350);
  } else if (spelStatus === PAUZE) {
    // Teken de pauze-tekst
    fill(255);
    textSize(40);
    text("Pauze", 540, 300);
  }

  // Controleer of de muis is ingedrukt
  if (mouseIsPressed) {
    // Controleer of de muis net is ingedrukt
    if (!mouseIsPressedLastTime) {
      // Controleer of de muis in het gebied van de start + pauze knop is
      if (
        mouseX >= knopX &&
        mouseX <= knopX + knopW &&
        mouseY >= knopY &&
        mouseY <= knopY + knopH
      ) {
        // Pauzeer of hervat het spel
        if (spelStatus === SPELEN) {
          spelStatus = PAUZE;
        } else if (spelStatus === PAUZE) {
          spelStatus = SPELEN;
        } else if (spelStatus === GAMEOVER) {
          // Start het spel opnieuw
          resetSpel();
        }
      }
    }

    // Houd de staat van de muis ingedrukt bij
    mouseIsPressedLastTime = true;
  } else {
    // Houd de staat van de muis niet ingedrukt bij
    mouseIsPressedLastTime = false;
  }
}

/**
 * KeyPressed functie wordt uitgevoerd wanneer een toets wordt ingedrukt
 */
function keyPressed() {
  if (spelStatus === SPELEN) {
    // Verplaats het blok op basis van de toets
    if (keyCode === LEFT_ARROW) {
      verplaatsLinks();
    } else if (keyCode === RIGHT_ARROW) {
      verplaatsRechts();
    } else if (keyCode === DOWN_ARROW) {
      verplaatsBeneden();
    } else if (keyCode === UP_ARROW) {
      draaiBlok();
    }
  } else if (spelStatus === GAMEOVER) {
    // Reset het spel bij het indrukken van de spatiebalk
    if (keyCode === 32) {
      resetSpel();
    }
  }
}
 