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
var spelStatus = SPELEN;

//punten
var score = 0;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler

var img; //plaatje

var knopX = 
var knopY = 
var knopW = 
var knopH = 


//tetromino 
const Tetromino = [  // 7 soorten Tetromino stenen
    [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // Vierkant tetromino
    [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // Rechte tetromino
    [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]  // Z-tetromino
    [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // S-tetromino
    [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // L-tetromino
    [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // J-tetromino
    [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // T-tetromino
];

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler

  // vijand

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {

  //logo
  image(img, 500, 0, 250);

  // achtergrond

  // vijand

  // kogel

  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health

  // teken knop
  fill("grey");
  rect(knopX - )
  fill("black");
  ellipse(knopX, knopY, 10, 10);

};
/**
 * return true als het gameover is
 * anders return false
 */
var checkPauze = function() {
  // als pauze knop ingelikt dan return true
  return false;
};
/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
/**
 * preload
 * deze functie wordt één keer uitgevoerd voor setup
 * de p5 library, zodra het spel geladen is in de browser
 * we laden hier de plaatjes
 */
function preload() {
  img = loadImage('afbeeldingen/tetris.png');
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background("#282f70")
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    if (spelStatus === PAUZE) {
      // doe niks, behalve checken of hij van pauze af moet met mouseIsPressed
      // dubbelklikken vorkomen met
      // https://youtu.be/Q1Cl_PqVHMQ?list=PLpTljPS--R5CgvkhsT9EODw2ng4Rkp1HC
    } 
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
    if (checkPauze()) {
      spelStatus = PAUZE;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm

  }
}


