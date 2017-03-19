/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * object.onmousedown = function(){myScript};
 */

var DrawController = {
    canvas: null,
    ctx: null,
    canvasOffsetX: 10,
    canvasOffsetY: 10,
    init: function() {
        this.canvas = document.getElementById('home-canvas');
        this.ctx = this.canvas.getContext("2d");
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        
        this.canvasOffsetX = this.canvas.offsetLeft;
        this.canvasOffsetY = this.canvas.offsetTop;
        
        this.drawPrimitiveObject.rect(100, 100, 100, 100);
        this.drawPrimitiveObject.rect(210, 100, 200, 100);
        this.addEventListeners();
        
        setTimeout(function(){
            DrawController.run();
        }, 1);
        
    },
    btn: {
        addRoom: document.getElementById('addNewRoom'),
        submitRoom: document.getElementById('submitRoom')
    },
    mouseState: {
        eventCounter: 0, // do sprawdzania czy up czy down
        x: 0,
        y: 0,
        down: function() {
            this.eventCounter++;
        },
        up: function() {
            this.eventCounter--;
        },
        isDown: function() {
            if(this.eventCounter > 0)
                return true;
            return false;
        },
    },
    handleDrawing: {
        lastX: 0,
        lastY: 0,
        width: 0,
        height: 0,
        submitedX: 0,
        submitedY: 0,
        drawDynamicRect: function(e) { 
            var x = e.pageX-DrawController.canvasOffsetX;
            var y = e.pageY-DrawController.canvasOffsetY;
            
            if(DrawController.mouseState.isDown()){
                DrawController.ctx.clearRect(0, 0, DrawController.canvas.width, DrawController.canvas.height);
                DrawController.ctx.beginPath();
                
                DrawController.drawSubmited();
                
                
                DrawController.ctx.moveTo(this.lastX, this.lastY);
                DrawController.ctx.lineTo(this.lastX, y);
                
                
                DrawController.ctx.lineTo(x, y);
                
                DrawController.ctx.moveTo(this.lastX, this.lastY);
                DrawController.ctx.lineTo(x,this.lastY);
                
                DrawController.ctx.lineTo(x, y);
                
                
                DrawController.ctx.stroke();
                 
                this.submitedX = this.lastX;
                this.submitedY = this.lastY;
                this.width = x - this.lastX;
                this.height = y - this.lastY;
                
            }else{
//                DrawController.ctx.moveTo(x,y);
                this.lastX = x;
                this.lastY = y;
            }
        }
    },
    drawPrimitiveObject: {
        rect: function(x, y, w, h) {
            console.log('Draw rect: ', x, y, w, h)
            DrawController.ctx.beginPath();
            DrawController.ctx.moveTo(x, y);
            DrawController.ctx.lineTo(x+w, y);
            DrawController.ctx.lineTo(x+w, y+h);
            DrawController.ctx.lineTo(x, y+h);
            DrawController.ctx.lineTo(x, y);
            DrawController.ctx.stroke();
        },
        line: function(x, y, x1, y1) {
            DrawController.ctx.beginPath();
            DrawController.ctx.moveTo(x, y);
            DrawController.ctx.lineTo(x1, y1);
            DrawController.ctx.stroke();
        }
    },
    navigate: {
        addNewRoom: function(e) {
            e.target.style.display = 'none';
            DrawController.btn.submitRoom.style.display = 'block';
            DrawController.canvas.addEventListener('mousemove', function(e){DrawController.handleDrawing.drawDynamicRect(e)});
        },
        submitRoom: function(e) {
            DrawController.dataContainer.push({
                type: 'room',
                x: DrawController.handleDrawing.submitedX,
                y: DrawController.handleDrawing.submitedY,
                width: DrawController.handleDrawing.width,
                height: DrawController.handleDrawing.height,
            });
            e.target.style.display = 'none';
            DrawController.btn.addRoom.style.display = 'block';
        }
    },
    dataContainer: [],
    drawSubmited: function() {
        this.dataContainer.forEach(function(o, i) {
            if(o.type === 'room'){
                DrawController.drawPrimitiveObject.rect(o.x, o.y, o.width, o.height);
            }
        });
    },
    addEventListeners: function() {
        var inst = this;
        document.addEventListener('mousedown', function(e){inst.mouseState.down(e)});
        document.addEventListener('mouseup', function(e){inst.mouseState.up(e)});
        
        
        // Nav Buttons
        this.btn.addRoom.addEventListener('click', function(e){inst.navigate.addNewRoom(e)});
        this.btn.submitRoom.addEventListener('click', function(e){inst.navigate.submitRoom(e)});
    },
    
    
    
    
    run: function() {
//        while(true){
//            console.log('run');
//        }
    }
};


(function(){
    DrawController.init();
})();
