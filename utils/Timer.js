export default class Timer {
    constructor(onTick, onEnd, duration){
        this.onTick = onTick
        this.onEnd = onEnd
        this.duration = duartion
        this.endTime =  Date.now() + duration
    }

    get timeRemaining(){
        return this.endTime - Date.now()
    }

    get isRunning() {
        return !!this.endTime
    }

}