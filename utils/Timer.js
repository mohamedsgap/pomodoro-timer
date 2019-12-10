export default class Timer {
  constructor(onTick, onEnd, duration) {
    this.onTick = onTick;
    this.onEnd = onEnd;
    this.duration = duartion;
    this.endTime = Date.now() + duration;
  }

  get timeRemaining() {
    return this.endTime - Date.now();
  }

  get isRunning() {
    return !!this.endTime;
  }

  clearTick = () => {
    clearTimeout(this.timeout);
    this.timeout = null;
  };

  tick = () => {
    if (this.endTime < Date.now()) {
      this.onTick(0);
      this.onEnd();
    } else {
      this.onTick(this.timeRemaining);
      const nextTick = this.timeRemaining % 1000;
      this.timeout = setTimeout(this.tick, nextTick);
    }
  };

  stop = () => {
    if (!this.isRunning) return;
    this.clearTick();
    this.duration = this.timeRemaining;
    this.endTime = null;
  };
  
  start = () => {
    if (this.isRunning) return;
    this.endTime = Date.now() + this.duration;
    this.tick();
  };
}
