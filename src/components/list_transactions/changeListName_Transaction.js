import jsTPS_Transaction from '../jsTPS_Transaction'

class changeListName_Transaction extends jsTPS_Transaction{
    
    constructor(initList, newName) {
        super();
        this.initList = initList;
        this.initName = initList.name;
        this.newName = newName;
    }

    doTransaction() {
        this.initList.setName(this.newName);
    }

    undoTransaction() {
        this.initList.setName(this.initName);
    }

    toString() {
        return "Modify list name to " + this.newName;
    }
}

export default changeListName_Transaction;