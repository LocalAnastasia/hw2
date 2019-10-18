import jsTPS_Transaction from '../jsTPS_Transaction'

class modifyListItems_Transaction extends jsTPS_Transaction{
    
    constructor(initList, newItems) {
        super();
        this.initList = initList;
        this.initItems = initList.getItems();
        this.newItems = newItems;
    }

    doTransaction() {
        this.initList.setItems(this.newItems);
    }

    undoTransaction() {
        this.initList.setItems(this.initItems);
    }

    toString() {
        return "Modify list items to " + this.newItems;
    }
}

export default modifyListItems_Transaction;