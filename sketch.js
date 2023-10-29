let happiness, money;
let firstRun;
let moneyImg, shopImg, itemImg, backgroundImg;
let inShopOrItem = [false, false, false];
let focused;
let helpScreenS = 0;
let happinessTimer = 300;
let debug = false;
let happinessMultiplier = 1;
let disabledHappinessDecay = false;
let clickedd = false
let toysPurchased = [0, 0, 0, 0]
let thecode = [
    [68, 69, 66, 85, 71],
    [0, 0, 0, 0, 0]
]
let RDEBUG = false;

function setup() {
    createCanvas(800, 600);
    textAlign(CENTER, CENTER);
    moneyImg = loadImage("assests/coin.png");
    shopImg = loadImage("assests/shop.png");
    itemImg = loadImage("assests/item.png")
    // backgroundImg = loadImage("assests/background.jpg")
    tomaLogic = new toma;
    timerLogic = new timer;
    happiness = JSON.parse(localStorage.getItem("happiness"));
    firstRun = JSON.parse(localStorage.getItem("firstRun"));
    money = JSON.parse(localStorage.getItem("money"));
    textSize(30);
    toyButton = new Button(shopImg, 50, 450, 100, 100, '', '', true);
    toyButton.onClick = function () { inShopOrItem[0] = true; inShopOrItem[1] = true };
    itemButton = new Button(itemImg, 250, 450, 100, 100, '', '', true);
    itemButton.onClick = function () { inShopOrItem[0] = true; inShopOrItem[2] = true };
    backButton = new Button('Go back', 250, 15, 120, 60, color('white'), color('black'), false);
    backButton.onClick = function () { inShopOrItem[0] = false; inShopOrItem[1] = false; inShopOrItem[2] = false };
    helpButton = new Button('Help', 120, 15, 120, 60, color('white'), color('black'), false)
    helpButton.onClick = function () { if (helpScreenS == 0) { helpScreenS = 1 } else { helpScreenS = 0 } }
    plus5Button = new Button('+5', 440, 300, 150, 75, color('white'), color('black'), false)
    plus5Button.onClick = function () { if (!timerLogic.timerON) { timerLogic.timer[0] += 5 }; console.log('heheheh')}
    plus10Button = new Button('+10', 610, 300, 150, 75, color('white'), color('black'), false)
    plus10Button.onClick = function () { if (!timerLogic.timerON) { timerLogic.timer[0] += 10 } }
    button25 = new Button('25', 610, 400, 150, 75, color('white'), color('black'), false)
    button25.onClick = function () { if (!timerLogic.timerON) { timerLogic.timer[0] = 25; timerLogic.timer[1] = 0; } }
    button0 = new Button('0', 440, 400, 150, 75, color('white'), color('black'), false)
    button0.onClick = function () { if (!timerLogic.timerON) { timerLogic.timer[0] = 0; timerLogic.timer[1] = 0; } }
    stopButton = new Button('Stop', 440, 200, 150, 75, color('white'), color('black'), false)
    stopButton.onClick = function () { timerLogic.timerON = false; focused = false; timerLogic.timer[0] = 0; timerLogic.timer[1] = 0; timerLogic.timesCountedDown = 0 }
    startButton = new Button('Start', 610, 200, 150, 75, color('white'), color('black'), false)
    startButton.onClick = function () {console.log('heheh'); if (timerLogic.timer[0] > 0 || timerLogic.timer[1] > 0 && timerLogic.timerON == false) { timerLogic.timerON = true; focused = true; timerLogic.startFix = true } }
    toy1Button = new Button(tomaLogic.toysImg[0][0], 10, 150, 200, 200, '', '', true)
    toy2Button = new Button(tomaLogic.toysImg[0][2], 220, 140, 150, 150, '', '', true)
    toy3Button = new Button(tomaLogic.toysImg[0][1], 20, 370, 200, 200, '', '', true)
    toy4Button = new Button(tomaLogic.toysImg[0][3], 220, 340, 150, 200, '', '', true)
    toy1Button.onClick = function () { if (money >= 2 && toysPurchased[0] == 0 && inShopOrItem[1]) { money -= 2; toysPurchased[0] = 1; tomaLogic.toy1Uses = 3 } else if (toysPurchased[0] == 1 && toysPurchased[0] != 2 && tomaLogic.toy1Disabled <= 0) { toysPurchased[0] = 2 } }
    toy2Button.onClick = function () { if (money >= 5 && toysPurchased[2] == 0 && inShopOrItem[1]) { money -= 5; toysPurchased[2] = 1; tomaLogic.toy2Uses = 5 } else if (toysPurchased[2] == 1 && toysPurchased[2] != 2 && tomaLogic.toy2Disabled <= 0) { toysPurchased[2] = 2 } }
    toy3Button.onClick = function () { if (money >= 10 && toysPurchased[1] == 0 && inShopOrItem[1]) { money -= 10; toysPurchased[1] = 1; tomaLogic.toy3Uses = 8 } else if (toysPurchased[1] == 1 && toysPurchased[1] != 2 && tomaLogic.toy3Disabled <= 0) { toysPurchased[1] = 2 } }
    toy4Button.onClick = function () { if (money >= 40 && toysPurchased[3] == 0 && inShopOrItem[1]) { money -= 40; toysPurchased[3] = 1; tomaLogic.toy4Uses = 15 } else if (toysPurchased[3] == 1 && toysPurchased[3] != 2 && tomaLogic.toy4Disabled <= 0) { toysPurchased[3] = 2 } }
    happinessTimer = happinessTimer * happinessMultiplier
    if (firstRun || debug) {
        happiness = 50;
        money = 0;
        firstRun = false;
        localStorage.setItem("firstRun", JSON.stringify(firstRun));
    };
}

function draw() {
    if (RDEBUG) {
        background(180)
    }
    else { background(220); }
    // image(backgroundImg,0,0)
    line(400, 0, 400, 600);
    image(moneyImg, 20, 20);
    text(money, 90, 45);
    if (timerLogic.timerON) {
        inShopOrItem[0] = false
        inShopOrItem[1] = false
        inShopOrItem[2] = false
    }
    if (inShopOrItem[0]) {
        backButton.display();
        helpButton.display();
        if (helpScreenS == 1) {
            textSize(14)
            text('Has 3 uses', 100, 160)
            text('disables happiness decay', 100, 180)
            text('for 2 minutes', 100, 200)
            text('boosts happiness a small bit', 100, 220)
            text('can be used every 15 minutes', 100, 240)
            text('has 5 uses', 300, 160)
            text('disables happiness decay', 300, 180)
            text('for 1 minute', 300, 200)
            text('boosts happiness a fair bit', 300, 220)
            text('has 8 uses', 100, 360)
            text('slows happiness decay', 100, 380)
            text('for 20 minutes', 100, 400)
            text('boosts happiness a fair bit', 100, 420)
            text('slows happiness decay', 300, 360)
            text('a small bit permanently', 300, 380)
            text('on use disables happiness', 300, 400)
            text('decay for 10 minutes', 300, 420)
            text('has 15 uses')
            textSize(30)
        }
        else {
            tomaLogic.toysButtonDisplay()
        }
    }
    if (!inShopOrItem[0] && !focused) {
        toyButton.display();
        itemButton.display();
    }
    if (!inShopOrItem[0]) {
        tomaLogic.tomaDisplay();
    }
    if (!focused && !disabledHappinessDecay) {
        tomaLogic.happinessLogic();
    }
    plus5Button.display();
    plus10Button.display();
    button25.display();
    button0.display();
    stopButton.display();
    startButton.display();
    if (mouseIsPressed && !clickedd) {
            clickedd = true;
        }
    else if (!mouseIsPressed) {
        clickedd = false
    }
    timerLogic.timerLogic();
    timerLogic.timerDisplay();
    tomaLogic.toysLogic();
    localStorage.setItem("happiness", JSON.stringify(happiness));
    localStorage.setItem("money", JSON.stringify(money));



    // DEBUG MODE
    if (RDEBUG) {
        textSize(15)
        text(' *DEBUG MODE* press 1 for coins, press 2 for happiness (+5), press 3 for unhappiness (-5) *DEBUG MODE*', 400, 620)
        text('happiness level: ' + happiness, 400, 640)
        text('happiness timer remaining: ' + Math.floor(happinessTimer) + ' with happiness duration multiplier of:' + happinessMultiplier, 400, 660)
        if (debug) {
            text('Old debug is enabled. All local storage will be reset', 400, 680)
        }
        else {
            text('Old debug is not enabled. All local storage will not be reset', 400, 680)
        }
        text('Disabled happiness decay counter ' + tomaLogic.disabledHappinessDecayCounter, 400, 700)
        textSize(30)
    }
}
function keyPressed() {
    if (!RDEBUG) {
        if (keyCode == 68 && thecode[1][0] == 0) {
            thecode[1][0] = 1
        }
        else if (keyCode == 69 && thecode[1][0] == 1) {
            thecode[1][1] = 1
        }
        else if (keyCode == 66 && thecode[1][1] == 1) {
            thecode[1][2] = 1
        }
        else if (keyCode == 85 && thecode[1][2] == 1) {
            thecode[1][3] = 1
        }
        else if (keyCode == 71 && thecode[1][3] == 1) {
            thecode[1][4] = 1
            RDEBUG = true;
            resizeCanvas(800, 800)
            console.warn('debug is now enabled')
            console.info('press delete to exit')
        }
        else {
            thecode[1] = [0, 0, 0, 0, 0]

        }
    }
    else {
        if (keyCode == 46) {
            RDEBUG = false;
            resizeCanvas(800, 600)
            thecode[1] = [0, 0, 0, 0, 0]
            console.warn('debug is now disabled')
        }
        if (keyCode == 52) {
            if (debug) {
                debug = false
            }
            else {
                debug = true
            }
        }
        if (keyCode == 49) {
            money += 5
        }
        if (keyCode == 50) {
            happiness += 5
        }
        if (keyCode == 51) {
            happiness -= 5
        }
        if (keyCode == 53) {
            money -= 5
        }
    }

}

