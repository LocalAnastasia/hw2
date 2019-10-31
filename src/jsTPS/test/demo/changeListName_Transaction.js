'use strict'

import jsTPS_Transaction from '../src/jsTPS/jsTPS_Transaction'

class changeListName_Transaction extends jsTPS_Transaction{
    
    constructor(initList, newName) {
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