function createCanvas(result) {
    var canvas = document.getElementById("result");
    var ctx = canvas.getContext("2d");
    ctx.font = "20px Lexend";
    ctx.fillStyle = "var(--text)";
    ctx.fillText(result, 0, 20);
    return canvas;
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("input").addEventListener("input", function (e) {
        createCanvas(e.target.value)
    });
    
});
