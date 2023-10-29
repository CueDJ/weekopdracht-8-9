class timer {
    timer = [0, 0] // pos 0 is the minutes, pos 1 is the seconds
    timerDisplayed = [0,0]
    timerON = false // this is a true or false check to see if the timer is on
    timesCountedDown = 0 // this is used for getting coins, after 5 minutes have past this should be on 5 and it will add a coin and reset itself.

    startFix = false // this fixes the issue that timesCountedDown will immediately get counted up. 

    timerLogic() {
        if (this.timerON) {

            if (this.timer[1] > 0) {
                this.timer[1] -= deltaTime / 1000
            }
            else if (this.timer[0] > 0) {
                this.timer[0] -= 1
                this.timer[1] = 60
                if (this.startFix) {
                    this.startFix = false
                }
                else {
                    this.timesCountedDown += 1
                }
            }
            else {
                this.timer[0] = 0
                this.timer[1] = 0
                this.timerON = false
                focused = false
                this.timesCountedDown += 1
                
            }
            if (this.timesCountedDown >= 5) {
                money += 1
                happiness += 1
                this.timesCountedDown = 0
            }
        }
    }
    timerDisplay() {
        if(this.timer[0] < 10) {
            this.timerDisplayed[0] = 0
        }
        else {
            this.timerDisplayed[0] = ''
            
        }
        if(this.timer[1] < 10) {
            this.timerDisplayed[1] = 0
        }
        else {
            this.timerDisplayed[1] = ''
        }
        textSize(60)
        text('' + this.timerDisplayed[0] + Math.floor(this.timer[0]) + ':' + this.timerDisplayed[1] + Math.floor(this.timer[1]), 600, 150)
        textSize(30)
    }
}