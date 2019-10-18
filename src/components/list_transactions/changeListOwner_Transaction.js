import jsTPS_Transaction from '../jsTPS_Transaction'

class changeListOwner_Transaction extends jsTPS_Transaction{
    
    constructor(initList, newOwner) {
        super();
        this.initList = initList;
        this.initOwner = initList.owner;
        this.newOwner = newOwner;
    }

    doTransaction() {
        this.initList.setOwner(this.newOwner);
    }

    undoTransaction() {
        this.initList.setOwner(this.initOwner);
    }

    toString() {
        return "Modify list owner to " + this.newOwner;
    }
}

export default changeListOwner_Transaction;