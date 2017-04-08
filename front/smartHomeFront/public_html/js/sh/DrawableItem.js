/*
 * Draw functions definition.
 */
class DrawableItem {
    construct() {
        this.dragStarted = false;
    }
    draw () {
        DrawController.ctx.strokeStyle = this.strokeStyle;
        DrawController.ctx.beginPath();
        DrawController.ctx.moveTo(this.x, this.y);
        DrawController.ctx.lineTo(this.x + this.width, this.y);
        DrawController.ctx.lineTo(this.x + this.width, this.y + this.height);
        DrawController.ctx.lineTo(this.x, this.y + this.height);
        DrawController.ctx.lineTo(this.x, this.y);
        DrawController.ctx.stroke();
        return this;
    };
    clickOnSomeObject (cx, cy) {
        if (cx >= this.x && cx <= this.x + this.width
                && cy >= this.y && cy <= this.y + this.height) {
            this.activate();
        } else {
            this.deactivate();
        }
        return this;
    };
    downOnSomeObject (cx, cy) { //console.log(cx, cy, this.x, this.y, this.width)
        if (cx >= this.x && cx <= this.x + this.width
                && cy >= this.y && cy <= this.y + this.height) {
            return true;
            //this.startDrag(cx, cy);
        } else {
            return false;
            //this.stopDrag();
        }
        return this;
    };
    activate () {
        this.strokeStyle = '#00ff00';
    };
    deactivate () {
        this.strokeStyle = '#000000';
    };
    startDrag (x, y) {
//        console.log('Start Drag', this.getStartDragX(), DrawController.mouseState.dragStartX, x);
        this.x = this.getStartDragX() - DrawController.mouseState.dragStartX + x;
        this.y = this.getStartDragY() - DrawController.mouseState.dragStartY + y;
        
        
        
    };
    getStartDragX () {
        if(!this.tempX){
            this.tempX = this.x;
        }
        return this.tempX;
    };
    getStartDragY () {
        if(!this.tempY){
            this.tempY = this.y;
        }
        return this.tempY;
    };
    stopDrag () {
        this.tempX = this.x;
        this.tempY = this.y;
    };
}

