'use strict'

import jsTPS_Transaction from '../src/jsTPS/jsTPS_Transaction'

class modifyListItems_Transaction extends jsTPS_Transaction{
    
    constructor(initList, newItems) {
        this.initList = initList;
        this.initItems = initList.getTodoItems();
        this.newItems = newItems;
    }

    doTransaction() {
        this.initList.setTodoItems(this.newItems);
    }

    undoTransaction() {
        this.initList.setTodoItems(this.initItems);
    }

    toString() {
        return "Modify list items to " + this.newItems;
    }
}