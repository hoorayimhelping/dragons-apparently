var GameController = Class.extend({
    init: function(canvas_element) {
        this.canvas = canvas_element;
        this.context = this.canvas.getContext('2d');

        this.update();
    },

    // game world updates go here 
    update: function() {
        requestAnimationFrame(this.update.bind(this));
        this.render();
    },

    // rendering calls go here 
    render: function() {
        
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
    },

    drawGrid: function() {
         for (var i = 0; i < this.canvas.width; i+= 5) {
                this.context.beginPath();
                this.context.moveTo(0,i);
                this.context.lineTo(i, this.canvas.height);
                this.context.fillColor = '#DDD';
                this.context.stroke();
         }
    }
});