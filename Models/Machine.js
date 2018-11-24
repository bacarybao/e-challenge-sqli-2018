// import MachineStateEnum from "./MachineStateEnum";

class Machine {

    // name;
    // os;
    // diskSize;
    // memory;
    // state;

    constructor(name, os, diskSize, memory) {
        this.name = name;
        this.os = os;
        this.diskSize = diskSize;
        this.memory = memory;
        this.state = MachineStateEnum.INACTIVE;
    }

    start() {
        this.state = MachineStateEnum.RUNNING;
    }

    stop() {
        this.state = MachineStateEnum.STOPPED;
    }

    get stateValue() {
        let state;
        switch(this.state) {
            case MachineStateEnum.INACTIVE:
                state = "Inactive";
                break;
            case MachineStateEnum.RUNNING:
                state = "Running";
                break;
            case MachineStateEnum.STOPPED:
                state = "Stopped";
                break;
            default:
                state = "Inactive";
                break;
        }
        return state;
    }

    get memoryValue() {
        if (this.state !== MachineStateEnum.RUNNING) return 0;
        return parseInt(this.memory);
    }

    get diskSizeValue() {
        return parseInt(this.diskSize);
    }

}

// export default Machine;