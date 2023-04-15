"use strict";
 
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000.0/30.0);
        };
})();
 
 
var gl = null;
var lastTime = Date.now();
var particleManager = null;
 
 
function update(dt) {
    particleManager.update(dt);
}
 
 
function drawFrame() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
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
 
function creatingTexture(img)
{
    var boxTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    
    gl.texImage2D
    (
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE,
        document.getElementById(img)
    );

    return boxTexture
}
 
function startRender(canvas_id) {
    var canvas = document.getElementById(canvas_id);
    gl = canvas.getContext("experimental-webgl");

    creatingTexture("fog-img");
    gl.activeTexture(gl.TEXTURE_0);
 
    particleManager = new ParticleManager(10000, 1000);
    particleManager.setPosition(0.0, 0.0);
 
    render();
}

startRender("webgl-canvas")