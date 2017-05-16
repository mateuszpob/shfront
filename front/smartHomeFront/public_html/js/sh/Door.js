/*
 * 
 * @type Door
 */
class Door extends DrawableItem {
    
    constructor (x, y, w) {
        super();
        this.roomId = 1;
        this.room = null;
        this.x = x;
        this.y = y;
        this.width = this.height = w;
        this.strokeStyle = '#000000';
    }; 
    draw () {
        DrawController.ctx.strokeStyle = this.strokeStyle;
        DrawController.ctx.beginPath();
        DrawController.ctx.arc(this.x, this.y + this.height, this.width, 0, DrawController.drawHelpers.degreesToRadians(270), true);
        DrawController.ctx.moveTo(this.x, this.y);
        DrawController.ctx.lineTo(this.x, this.y + this.height);
        DrawController.ctx.moveTo(this.x, this.y + this.height);
        DrawController.ctx.lineTo(this.x + this.width, this.y + this.height);
        DrawController.ctx.stroke();

    };
    attachToRoom () {
        var inst = this;
        DrawController.drawingObjects.forEach(function(o, i){
            if(o.id === inst.roomId){
                inst.room = o;
                return;
            }
        });
    };
    detectParentRoom () {
        var inst = this;
        DrawController.drawingObjects.forEach(function(o, i){
            if(o.id === inst.roomId){
                inst.room = o;
                return;
            }
        });
    }

}