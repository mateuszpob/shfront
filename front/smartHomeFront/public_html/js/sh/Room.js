
/*
 * 
 * @type Room
 */
class Room extends DrawableItem {
    
    constructor (x, y, w, h, id) {
        super();
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.strokeStyle = '#000000';
    };
    activate () {
        this.strokeStyle = '#00ff00';
        // Ustaw panel na ten pokoj
        DrawController.navigate.roomNavPanel.init(this.id);
        return this;
    };
    deactivate () {
        this.strokeStyle = '#000000';
        // ukryj panel zarzadznia pokojem
        DrawController.navigate.roomNavPanel.final(this.id);

        return this;
    };
    update () {
        if (DrawController.mouseState.isDown()) {
            this.x = this.x + DrawController.mouseState.x - this.fx;
            this.y = this.y + DrawController.mouseState.y - this.fy;

        } else {
            this.fx = DrawController.mouseState.x;
            this.fy = DrawController.mouseState.y;
        }
        return this;
    };
    setStroke (stroke) {
        this.strokeStyle = stroke;
        return this;
    };
}