class toma {
    cats = [loadImage('assests/cats/DepressedCat.png'), loadImage('assests/cats/SadCat.png'), loadImage('assests/cats/NeutralCat.png'), loadImage('assests/cats/HappyCat.png'), loadImage('assests/cats/UltraHappyCat.png'), loadImage('assests/cats/FocusedCat.png')]
    tomaDisplay() {
        if (focused) {
            image(this.cats[5], 10, 180)
        }
        else if (happiness < 20 && happiness > 0) {
            image(this.cats[0], 20, 20)
        }
        else if (happiness < 40 && happiness > 19) {
            image(this.cats[1], 20, 140)
        }
        else if (happiness < 60 && happiness > 39) {
            image(this.cats[2], 20, 100)
        }
        else if (happiness < 90 && happiness > 59) {
            image(this.cats[3], 0, 140)
        }
        else if (happiness < 100 && happiness > 89) {
            image(this.cats[4], 20, 100)
        }
        else {
            console.warn('happiness not in range: ' + happiness);
        }
    }
    happinessLogic() {
        if (happinessTimer > 0) {
            happinessTimer = happinessTimer - deltaTime / 1000
        }
        else {
            happiness -= 1;
            happinessTimer += 300 * happinessMultiplier;
        }
        if (happiness <= 0) {
            happiness = 1
        }
        if (happiness >= 100) {
            happiness = 99
        }
    }
    toysImg = [
        [loadImage('assests/toys/toys1.png'), loadImage('assests/toys/toys2.png'), loadImage('assests/toys/toys3.png'), loadImage('assests/toys/toys4.png')],
        [loadImage('assests/toys/toys1G.png'), loadImage('assests/toys/toys2G.png'), loadImage('assests/toys/toys3G.png'), loadImage('assests/toys/toys4G.png')],
    ]
    toysButtonDisplay() {
        if (money >= 2 && toysPurchased[0] != 1 && inShopOrItem[1] || toysPurchased[0] == 1 && inShopOrItem[2] && this.toy1Disabled <= 0) {
            toy1Button.text = this.toysImg[0][0]
        }
        else { toy1Button.text = this.toysImg[1][0] }
        if (money >= 5 && toysPurchased[2] != 1 && inShopOrItem[1] || toysPurchased[2] == 1 && inShopOrItem[2] && this.toy2Disabled <= 0) {
            toy2Button.text = this.toysImg[0][2]
        }
        else { toy2Button.text = this.toysImg[1][2] }
        if (money >= 10 && toysPurchased[1] != 1 && inShopOrItem[1] || toysPurchased[1] == 1 && inShopOrItem[2] && this.toy3Disabled <= 0) {
            toy3Button.text = this.toysImg[0][1]
        }
        else { toy3Button.text = this.toysImg[1][1] }
        if (money >= 20 && toysPurchased[3] != 1 && inShopOrItem[1] || toysPurchased[3] == 1 && inShopOrItem[2] && this.toy4Disabled <= 0) {
            toy4Button.text = this.toysImg[0][3]
        }
        else { toy4Button.text = this.toysImg[1][3] }
        
        toy1Button.display();
        toy2Button.display();
        toy3Button.display();
        toy4Button.display();

        if (inShopOrItem[1]) {
            if (toysPurchased[0] == 0) { text('$1.99', 110, 130) }
            else { text('Purchased', 110, 130) }
            if (toysPurchased[2] == 0) { text('$4.99', 300, 130) }
            else { text('Purchased', 300, 130) }
            if (toysPurchased[1] == 0) { text('$9.99', 110, 310) }
            else { text('Purchased', 110, 310) }
            if (toysPurchased[3] == 0) { text('$39.99', 300, 310) }
            else { text('Purchased', 300, 310) }
        }
        if (inShopOrItem[2]) {
            text('Uses left: ' + this.toy1Uses, 110, 130)
            text('Uses left: ' + this.toy2Uses, 300, 130)
            text('Uses left: ' + this.toy3Uses, 110, 310)
            text('Uses left: ' + this.toy4Uses, 300, 310)
        }
        if (this.toy1Disabled > 0) {
            text(Math.floor(this.toy1Disabled), 110, 160)
        }
        if (this.toy2Disabled > 0) {
            text(Math.floor(this.toy2Disabled), 300, 160)
        }
        if (this.toy3Disabled > 0) {
            text(Math.floor(this.toy3Disabled), 110, 310)
        }
        if (this.toy4Disabled > 0) {
            text(Math.floor(this.toy4Disabled), 300, 310)
        }


    }


    toy1Disabled = 0
    toy1Uses = 0
    toy2Disabled = 0
    toy2Uses = 0
    toy3Disabled = 0
    toy3Uses = 0
    toy3Enabled = [0, 0]
    toy4Disabled = 0
    toy4Enabled = 0
    toy4Uses = 0
    disabledHappinessDecayCounter = 0
    toysLogic() {
        if (toysPurchased[0] == 2) {
            happiness += 3
            this.disabledHappinessDecayCounter += 180
            this.toy1Disabled += 900
            toysPurchased[0] = 1
            this.toy1Uses -= 1
            if (this.toy1Uses == 0) {
                toysPurchased[0] = 0
            }
        }
        if (toysPurchased[2] == 2) {
            happiness += 6
            this.disabledHappinessDecayCounter += 60
            this.toy2Disabled += 900
            toysPurchased[2] = 1
            this.toy2Uses -= 1
            if (this.toy2Uses == 0) {
                toysPurchased[2] = 0
            }
        }
        if (toysPurchased[1] == 2) {
            happiness += 6
            this.toy3Enabled[0] = 1200
            this.toy1Disabled += 1200
            toysPurchased[1] = 1
            happinessMultiplier += 0.2
            this.toy3Uses -= 1
            if (this.toy3Uses == 0) {
                toysPurchased[1] = 0
            }
        }
        if (this.toy3Enabled[0] > 0) {
            this.toy3Enabled[0] -= deltaTime / 1000
        }
        if (this.toy3Enabled[1] == 1) {
            happinessMultiplier -= 0.2
        }
        if (toysPurchased[3] == 2) {
            this.disabledHappinessDecayCounter += 600
            this.toy4Disabled = 1800
            toysPurchased[3] = 1
            this.toy4Uses -= 1
            if (this.toy4Uses == 0) {
                toysPurchased[3] = 0
                happinessMultiplier -= 0.2
            }
        }
        if (!this.toy4Enabled && toysPurchased[3] == 1) {
            this.toy4Enabled = true
            happinessMultiplier += 0.2
        }
        if (this.disabledHappinessDecayCounter > 0) {
            disabledHappinessDecay = true
            this.disabledHappinessDecayCounter -= deltaTime / 1000
        }
        if(this.disabledHappinessDecayCounter < 0) {
            this.disabledHappinessDecayCounter = 0
        }
        else {
            disabledHappinessDecay = false
        }

        if (this.toy1Disabled > 0) {
            this.toy1Disabled -= deltaTime / 1000
        }
        if (this.toy2Disabled > 0) {
            this.to21Disabled -= deltaTime / 1000
        }
        if (this.toy3Disabled > 0) {
            this.toy3Disabled -= deltaTime / 1000
        }
        if (this.toy4Disabled > 0) {
            this.toy4Disabled -= deltaTime / 1000
        }

    }
}