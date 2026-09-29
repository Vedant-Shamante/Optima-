function updateClock() {

    const clock =
        document.getElementById("currentTime");

    if (!clock) return;

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString("en-IN", {
            hour12: false
        });

}

updateClock();

setInterval(updateClock, 1000);