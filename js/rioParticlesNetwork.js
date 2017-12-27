/**
 * Created by rui on 2016/12/11.
 *
 * A simple particles animation in canvas
 *
 */

(function (window) {
    "use strict";

    function Particle(conf) {
        var seed1, seed2;
        seed1 = Math.random();
        seed2 = Math.random();
        var obj = {
            x: seed1 * conf.width,
            y: seed2 * conf.height
        };
        if (conf.radiusChangeable) {
            obj['radius'] = Math.random() * conf.radius;
        }
        else {
            obj['radius'] = conf.radius;
        }
        obj['color'] = conf.colors[Math.round(Math.random() * (conf.colors.length - 1))];
        obj['vx'] = (Math.random() / 2 - seed1 / 2) * 5;
        obj['vy'] = (Math.random() / 2 - seed2 / 2) * 5;
        return obj;
    }


    window.RioParticlesNetwork = {
        conf: {
            id: 'particleContainer',
            width: 1200,
            height: 720,
            number: 80,
            longestDistance: 240,
            radius: 2,
            colors: ['#4abcdd', '#1abc9c', '#DB3A34', ' #FFC857', '#2094B9', '#9068BE', '#E89F65'],
            radiusChangeable: false,
            speedChangeRandomly:false
        },
        elements: {
            canvas: undefined,
            context: undefined,
            particleArray: [],
            requestId: undefined
        },
        init: function () {
            var conf = arguments[0];
            for (var item in conf) {
                this.conf[item] = conf[item] || this.conf[item];
            }

            window.requestAnimFrame =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.ORequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function requestAnimFrame(callback) {
                    setTimeOut(callback, 1000 / 60);
                };

            this.elements.canvas = document.getElementById(this.conf.id);
            this.elements.canvas.width = this.conf.width;
            this.elements.canvas.height = this.conf.height;
            this.elements.context = this.elements.canvas.getContext('2d');
            this.elements.particleArray = this.particleArrayConstruct();
        },
        start: function () {
            var i, j;
            var arr = RioParticlesNetwork.elements.particleArray;
            var width = RioParticlesNetwork.conf.width;
            var height = RioParticlesNetwork.conf.height;
            RioParticlesNetwork.elements.context.clearRect(0, 0, width, height);

            //make one of the particles move randomly
            if(RioParticlesNetwork.conf.speedChangeRandomly){
                arr[Math.floor(Math.random() * arr.length)].vx = (Math.random() - Math.random()) / 2 * 5;
                arr[Math.floor(Math.random() * arr.length)].vy = (Math.random() - Math.random()) / 2 * 5;
            }

            //reset particles' position and collision detection
            for (i = 0; i < arr.length; i++) {
                arr[i].x += arr[i].vx;
                arr[i].y += arr[i].vy;
                if (arr[i].x < 0 || arr[i].x > width) {
                    arr[i].vx = -arr[i].vx;
                    if (arr[i].x < 0) {
                        arr[i].x = 0 + arr[i].radius;
                    }
                    else {
                        arr[i].x = width - arr[i].radius;
                    }
                }
                if (arr[i].y < 0 || arr[i].y > height) {
                    arr[i].vy = -arr[i].vy;
                    if (arr[i].y < 0) {
                        arr[i].y = 0 + arr[i].radius;
                    }
                    else {
                        arr[i].y = height - arr[i].radius;
                    }
                }
                RioParticlesNetwork.elements.context.globalAlpha=1;
                RioParticlesNetwork.particleDraw(arr[i]);
            }

            //link the particle
            for (i = 0; i < arr.length; i++) {
                for (j = i + 1; j < arr.length; j++) {
                    RioParticlesNetwork.particleLink(arr[i], arr[j]);
                }
            }

            RioParticlesNetwork.elements.requestId = requestAnimationFrame(RioParticlesNetwork.start);
        },
        // draw particles
        particleDraw: function (particle) {
            var context = this.elements.context;
            context.beginPath();
            context.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
            context.fillStyle = particle.color;
            context.fill();
            context.closePath();
        },
        particleLink: function (particle_1, particle_2) {
            var x1, x2, y1, y2, d, longestDistance;
            x1 = particle_1.x;
            y1 = particle_1.y;
            x2 = particle_2.x;
            y2 = particle_2.y;
            d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            longestDistance = RioParticlesNetwork.conf.longestDistance;

            //link the particles
            if (d < longestDistance) {
                var context = this.elements.context;
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.globalAlpha = 1.1 - (d / longestDistance);
                context.strokeStyle = particle_1.color;
                context.lineCap = 'round';
                context.lineWidth = 2;
                context.stroke();
                context.closePath();
            }
        },
        particleArrayConstruct: function () {
            var arr = [];
            var width = this.conf.width;
            var height = this.conf.height;
            var radius = this.conf.radius;
            var radiusChangeable = this.conf.radiusChangeable;
            var colors = this.conf.colors;
            for (var i = 0; i < this.conf.number; i++) {
                var conf = {
                    width: width,
                    height: height,
                    radius: radius,
                    radiusChangeable: radiusChangeable,
                    colors: colors
                };
                var particle = new Particle(conf);
                arr.push(particle);
            }
            return arr;
        },
        stop: function () {
            cancelAnimationFrame(this.elements.requestId);
        }
    }

})(window);
