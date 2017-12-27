# rioParticleNetwork

## Introduction
A simple animation of particles' network in HTMl5 Canvas.

一个以HTML5 Canvas实现的简单粒子网络特效.

![screenshot](https://github.com/ruiyeah/rioParticlesNetwork/raw/master/res/screen-shot.png)

## Usage

The class RioParticlesNetwork has three simple function: init,start and stop.
It's obvious that what they can do.

When you use this simple plugin:

#### 1.import the file

    <script src="js/rioParticlesNetwork.js"></script>
    
#### 2.Initialize the plugin

You can use the function init() to initialize the plugin.Here is a sample configuration.

     RioParticlesNetwork.init({
            //the id of the canvas element
            id: 'particleContainer',
            width: width,
            height: height,
            //the colors that the particles and line can be
            colors: ['#4abcdd'],
            //number of particles
            number: 80,
            //the longest distance of the line that link the particles
            longestDistance: 240,
            radius: 4,
            //whether the radius of particles changeable
            //if true, their radius will be the result of multiply the base radius above and a random number together
            radiusChangeable: true,
            //if true,some of the particles will change their speeds randomly
            speedChangeRandomly: false
    });

#### 3.start it
        RioParticlesNetwork.start();

#### 4.stop it
        RioParticlesNetwork.stop();
        
*warning:the stop function may not work at some browser which haven't support the function requestAnimationFrame*


        