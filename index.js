const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const canvas = createCanvas(1180, 744);
const ctx = canvas.getContext('2d');
const qr = require('qrcode');
const { setTimeout } = require('timers');

const width = 1180;
const height = 744;
const padding = 30;
const angleOffset = 30;
const portraitWidth = 180;
const portraitHeight = 280;

ctx.fillStyle = '#00ffFF17';
ctx.beginPath();
outline();
ctx.fill();

ctx.fillStyle = '#00000000';
ctx.beginPath();
portrait();
ctx.fill();

//#region Outline
ctx.lineWidth = 4;
ctx.strokeStyle = 'rgb(0,255,255)';
ctx.beginPath();
function outline() {
    ctx.lineTo(padding + angleOffset, padding);
    ctx.lineTo(width - padding - angleOffset, padding);
    ctx.lineTo(width - padding, padding + angleOffset);
    ctx.lineTo(width - padding, height - padding - angleOffset);
    ctx.lineTo(width - padding - angleOffset, height - padding);
    ctx.lineTo(padding + angleOffset, height - padding);
    ctx.lineTo(padding, height - padding - angleOffset);
    ctx.lineTo(padding, padding + angleOffset);
    ctx.lineTo(padding + angleOffset, padding);
    ctx.lineTo(padding * 3, padding);
}
outline();
ctx.stroke();
//#endregion

//#region Portrait
ctx.beginPath();
function portrait() {
    ctx.lineTo(padding + angleOffset * 2, padding + angleOffset);
    ctx.lineTo(padding + angleOffset * 2 + portraitWidth, padding + angleOffset);
    ctx.lineTo(padding + angleOffset * 3 + portraitWidth, padding + angleOffset * 2);
    ctx.lineTo(padding + angleOffset * 3 + portraitWidth, padding + angleOffset + portraitHeight);
    ctx.lineTo(padding + angleOffset * 2 + portraitWidth, padding + angleOffset * 2 + portraitHeight);
    ctx.lineTo(padding + angleOffset * 2, padding + angleOffset * 2 + portraitHeight);
    ctx.lineTo(padding + angleOffset, padding + angleOffset + portraitHeight);
    ctx.lineTo(padding + angleOffset, padding + angleOffset * 2);
    ctx.lineTo(padding + angleOffset * 2, padding + angleOffset);
    ctx.lineTo(padding + angleOffset * 3, padding + angleOffset);
}
portrait();
ctx.stroke();
//#endregion

// QR Code
qr.toBuffer('your mom gey lol', { color: { light: '#00000000' } }, (_err, buff) => {
    loadImage(buff).then((img) => {
        ctx.drawImage(img, padding * 2, height - padding * 2 - img.height - 120, 240, 240);
    });
});

// Portrait seperator
ctx.beginPath();
ctx.lineTo(padding + angleOffset * 4 + portraitWidth, padding);
ctx.lineTo(padding + angleOffset * 4 + portraitWidth, height - padding);
ctx.stroke();

setTimeout(() => {
    fs.writeFileSync('test.png', canvas.toBuffer());
}, 1000);
