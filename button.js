class Button {
    constructor(text, x, y, width, height, boxColor, textColor, isImage) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.boxColor = boxColor;
        this.textColor = textColor;
        this.isImage = isImage;
    }

    clicked = false;
    onClick = function () { };

    display() {

        if (!this.isImage) {
            fill(this.boxColor)
            rect(this.x, this.y, this.width, this.height);
            fill(this.textColor)
            text(this.text, this.x + this.width / 2, this.y + this.height / 2)

        }
        else {
            image(this.text, this.x, this.y)
        }

        if (mouseIsPressed && !clickedd) {
            if (this.containsMousePosition()) {
                clickedd = true;
                this.onClick();
            }
        }
        else if (!mouseIsPressed) {
            clickedd = false
        }
    }


    containsMousePosition() {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            return true;
        }
        return false;
    }

}