class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.refs = {
            daysEl: document.querySelector('[data-value="days"]'),
            hoursEl: document.querySelector('[data-value="hours"]'),
            minsEl: document.querySelector('[data-value="mins"]'),
            secsEl: document.querySelector('[data-value="secs"]'),
        };
    }

    start() {
        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            const { days, hours, mins, secs } =
                this.getTimeComponents(deltaTime);
            this.refs.daysEl.textContent = days;
            this.refs.hoursEl.textContent = hours;
            this.refs.minsEl.textContent = mins;
            this.refs.secsEl.textContent = secs;
        }, 1000);
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(
            Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        const mins = this.pad(
            Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
        );
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }
}

const timerToday = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Aug 10, 2021 22:59:59'),
});

timerToday.start();

// const timerTomorrow = new CountdownTimer({
//     selector: '#timer-1',
//     targetDate: new Date('Aug 11, 2021 16:42:00'),
// });

// timerTomorrow.start();
