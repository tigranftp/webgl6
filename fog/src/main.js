"use strict";
 
window.requestAnimFrame = (function() 
{
    return window.requestAnimationFrame;
})();
 
 
var gl = null;
var lastTime = Date.now();
var particleManager = null;
 
 
function update(dt) {
    particleManager.update(dt);
}
 
 
function drawFrame() {
    gl.clearColor(0.7, 0.7, 0.7, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    particleManager.render(gl);
}
 
 
function render() {
    window.requestAnimFrame(render);
 
    var time = Date.now();
    var dt = (time - lastTime) * 0.001;
    lastTime = time;
 
    update(dt);
 
    drawFrame();
}
 
function handleTextureLoaded(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}

function registerTexture(imgSRC) {
    let texture = gl.createTexture();
    let image = new Image();
    image.onload = function () {
        handleTextureLoaded(image, texture);
    }
    image.src = imgSRC;
    
    return texture
}
 
function startRender(canvas_id) {
    var canvas = document.getElementById(canvas_id);
    gl = canvas.getContext("experimental-webgl");

    registerTexture("src/smoke.png");

    particleManager = new ParticleManager(200, 150);
    particleManager.setPosition(0.0, 0.0);
    render();
}

startRender("webgl-canvas")

