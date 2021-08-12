class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.refs = {
            daysEl: document.querySelector('[data-value="days"]'),
            hoursEl: document.querySelector('[data-value="hours"]'),
            minsEl: document.querySelector('[data-value="mins"]'),
            secsEl: document.querySelector('[data-value="secs"]'),
            messageEl: document.querySelector('.message'),
        };
        this.timerId = null;
        this.start();
    }

    start() {
        this.timerId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            const { days, hours, mins, secs } =
                this.getTimeComponents(deltaTime);

            if (deltaTime < 0) {
                // clearInterval(this.timerId);
                this.refs.messageEl.textContent = `Упс, Вы опоздали. С заданной даты уже прошло ${
                    days * -1
                }д ${hours * -1}ч ${mins * -1}м ${secs * -1} с`;
                this.refs.daysEl.textContent = '❌';
                this.refs.hoursEl.textContent = '❌';
                this.refs.minsEl.textContent = '❌';
                this.refs.secsEl.textContent = '❌';
                return;
            } else {
                this.refs.daysEl.textContent = days;
                this.refs.hoursEl.textContent = hours;
                this.refs.minsEl.textContent = mins;
                this.refs.secsEl.textContent = secs;
            }
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
    targetDate: new Date('September 3, 2021 00:00:00'),
});
