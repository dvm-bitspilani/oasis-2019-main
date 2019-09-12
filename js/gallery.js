const opacity = document.getElementsByClassName('opacity')[0];

function opaq() {
    opacity.style.zIndex = '9';
}
function normal() {
    opacity.style.zIndex = '-1';
}
function main() {
    window.location = './index.html';
}