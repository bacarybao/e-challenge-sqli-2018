// import Store from "./Store";
// import Machine from "./Machine";

class CloudInfrastructure {

    // stores;
    // machines;

    constructor(stores=[], machines=[]) {
        this.stores = stores;
        this.machines = machines;
    }

    createStore(name) {
        const store = new Store(name);
        this.stores.push(store);
    }

    deleteStore(name) {
        this.stores = this.stores.filter(s => s.name !== name);
    }

    uploadDocument(name, ...documents) {
        const store = this.stores.find(s => s.name === name);
        for (let i = 0; i < documents.length; i++) {
            const document = documents[i];
            store.documents.push(new Document(document));
        }
    }

    emptyStore(name) {
        const store = this.stores.find(s => s.name === name);
        store.documents = [];
    }

    listStores() {
        let value = "";
        for (let i = 0; i < this.stores.length; i++) {
            const { name, documents } = this.stores[i];
            const documentNames = documents.map(doc => doc.name) || [];
            const docs = documentNames.length === 0 ? "empty" : documentNames.join(', ');
            value = `${value}${i == 0 ? "" : "||"}${name}:${docs}`;
        }
        return value;
    }

    createMachine(name, os, diskSize, memory) {
        const machine = new Machine(name, os, diskSize, memory);
        this.machines.push(machine);
    }

    startMachine(name) {
        const machine = this.machines.find(m => m.name === name);
        machine.start();
    }

    stopMachine(name) {
        const machine = this.machines.find(m => m.name === name);
        machine.stop();
    }

    listMachines() {
        let value = "";
        for (let i = 0; i < this.machines.length; i++) {
            const { name, stateValue } = this.machines[i];
            value = `${value}${i == 0 ? "" : "||"}${name}:${stateValue}`;
        }
        return value;
    }

    usedMemory(name) {
        const { memoryValue } = this.machines.find(m => m.name === name);
        return memoryValue;
    }

    usedDisk(name) {
        const machine = this.machines.find(m => m.name === name);
        if (machine) return machine.diskSizeValue;
        const store = this.stores.find(s => s.name === name);
        let diskSizeValue = 0;
        for (let i = 0; i < store.documents.length; i++) {
            const { size } = store.documents[i];
            diskSizeValue += size;
        }
        return diskSizeValue;
    }

    globalUsedDisk() {
        let total = 0;
        for (let i = 0; i < this.machines.length; i++) {
            const { name } = this.machines[i];
            total += this.usedDisk(name);
        }
        for (let i = 0; i < this.stores.length; i++) {
            const { name } = this.stores[i];
            total += this.usedDisk(name);
        }
        return total;
    }

    globalUsedMemory() {
        let total = 0;
        for (let i = 0; i < this.machines.length; i++) {
            const { memoryValue } = this.machines[i];
            total += memoryValue;
        }
        return total;
    }

}

// export default CloudInfrastructure;