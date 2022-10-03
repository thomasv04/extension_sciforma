var timerView = document.getElementById('timerView');
var start = document.getElementById('strt');
var stop = document.getElementById('stp');
var reset = document.getElementById('rst');
var sec = 0;
var min = 0;
var hrs = 0;
var t;

function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}
function add() {
    tick();
    timerView.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}
function timer() {
        t = setTimeout(add, 1000);
}

start.onclick = () => {
    timer();
    start.disabled = true;
};
stop.onclick = function() {
    clearTimeout(t);
    start.disabled = false;
}
reset.onclick = function() {
    timerView.textContent = "00:00:00";
    sec = 0; min = 0; hrs = 0;
}