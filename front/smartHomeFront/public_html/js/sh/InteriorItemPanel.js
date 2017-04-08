/*
 * 
 */
var InteriorItemPanel =  {
    items: [
        new Door(40, 40, 30),
        new Door(40, 120, 30)
    ],
    drawItemsOnPanel: function() {
        
        this.items.forEach(function(o, i){
            o.draw();
        });
    }
}