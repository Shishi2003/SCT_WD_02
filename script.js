let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);

    return (
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(2, "0")
    );
}

function startTimer() {
    if (timerInterval) return;

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    elapsedTime = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = "";
}

function recordLap() {
    if (!elapsedTime) return;

    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${formatTime(elapsedTime)}`;
    laps.appendChild(li);
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);
