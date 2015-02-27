var Segment = Class.extend({
    init: function(start, end) {
        this.start = start;
        this.end = end;
        this.length = Math.sqrt(Math.pow((this.end[1] - this.start[1]), 2) + Math.pow(this.end[0] - this.start[0], 2));
    },

    getDirection: function() {
        epsilon = 0.0001
        var dx = this.end[0] - this.start[0];
        var dy = this.end[1] - this.start[1];

        if (Math.abs(dx) < epsilon) {
            if (dy < 0) {
                return 90;
            } else {
                return 270;
            }
        }

        if (Math.abs(dy) < epsilon) {
            if (dx < 0) {
                return 180;
            } else {
                return 0;
            }
        }

        if (dx < 0) {
            if (dy < 0) {                
                return 225;
            } else {
                return 135; // quadrant 
            }
        } else {
            if (dy < 0) {
                return 315; // quadrant 2
            } else {
                return 45; // quadrant 1
            }
        }
    },

    getRadians: function() {
        return Math.PI * 2 * (this.getDirection() / 360);
    },

    splitStart: function() {
        return [this.start[0], this.start[1]];
    },

    splitSegment: function(split_direction) {
        //SPLIT_DIRECTION is going to be -PI/4 or PI/4
        var new_direction = split_direction + this.getRadians();
        var new_point_x = this.start[0] + Math.sin(new_direction) * this.length * 0.7071;
        var new_point_y = this.start[1] + Math.cos(new_direction) * this.length * 0.7071;
        return [new Segment([this.start[0], this.start[1]], [new_point_x, new_point_y]),
            new Segment([new_point_x, new_point_y], [this.end[0], this.end[1]])
        ];

    }
})

var GameController = Class.extend({
    init: function(canvas_element) {
        this.canvas = canvas_element;
        this.context = this.canvas.getContext('2d');
        this.direction = false;

        this.segments = [
            new Segment([0,0], [this.canvas.width/2, this.canvas.height]),
            new Segment([this.canvas.width/2, this.canvas.height], [this.canvas.width, 0])
        ];

        this.update();
        this.iteration = 0;
    },

    // game world updates go here 
    update: function() {
        requestAnimationFrame(this.update.bind(this));
        var new_segments = [];
        var direction;
        for (var i = 0; i < this.segments.length; i++) {
            if (i % 2) {
                direction = Math.PI/4;
            } else {
                direction = -1 * Math.PI/4;
            }
            new_segments = new_segments.concat(this.segments[i].splitSegment(direction));
            //console.log(new_segments);
            console.log("new segments length: ", new_segments.length);
        }
        this.segments = new_segments;
        console.log("segment lengths: ", this.segments.length);


        // var segments = [];

        // for (var i = 0; i < this.segments.length; i++) {
        //     var segment = this.segments[i];
        //     switch(segment.getDirection()) {
        //         0:
        //         var length = Math.abs(segment.end[0] - segment.start[0]);
        //         if (this.direction) {
        //             segments.push([segment.start[0], segment.end[0]], [segment.end[1]-length/2]);
        //             segments.push([segment.end[1]-length/2], [segment.end[1]-length/2])
        //         } else {
        //             segments.push([], []);
        //             segments.push([], []);
        //         }
        //         break;
        //         45:

        //         if (this.direction) {

        //         } else {
                    
        //         }
        //         break;
        //         90:

        //         if (this.direction) {

        //         } else {
                    
        //         }
        //         break;
        //         135:

        //         if (this.direction) {

        //         } else {
                    
        //         }
        //         break;
        //         180:

        //         if (this.direction) {

        //         } else {
                    
        //         }
        //         break;
        //         225:

        //         if (this.direction) {

        //         } else {
                    
        //         }
        //         break;
        //         270:

        //         if (this.direction) {

        //         } else {
                    
        //         }
        //         break;
        //         315:

        //         if (this.direction) {

        //         } else {
                    
        //         }
        //         break;
        //     }
        // }

        this.iteration++;

        this.render();
    },

    // rendering calls go here 
    render: function() {
        document.getElementById('iteration_number').innerHTML = this.iteration;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //this.drawGrid();

        this.context.beginPath();
            for (var i = 0; i < this.segments.length; i++) {
                var segment = this.segments[i];
//console.log(segment.getDirection());
                this.context.moveTo(segment.start[0], segment.start[1]);
                this.context.lineTo(segment.end[0], segment.end[1]);
                this.context.stroke();
            }
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