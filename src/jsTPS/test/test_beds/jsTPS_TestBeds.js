import jsTPS from '.../src/jsTPS/jsTPS.js'
import changeListName_Transaction from '../demo/changeListName_Transaction'
import changeListOwner_Transaction from '../demo/changeListOwner_Transaction'
import modifyListItems_Transaction from '../demo/modifyListItems_Transaction'
import todoList from '../demo/todoList'
import todoItem from '../demo/todoItem'

class jsTPS_TestBeds {

    testChangeListName() {

        tps = jsTPS();
        var list = todoList(0, 'Local Anastasia', 'Vincee', []);

        console.assert(list.getName() === 'Local Anastasia');

        // CHANGE LIST NAME TO CRAYON
        tps.addTransaction(new changeListName_Transaction(list, 'Crayon'));
        console.assert(list.getName() === 'Crayon');
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // CHANGE LIST NAME TO COLT
        tps.addTransaction(new changeListName_Transaction(list, 'Colt'));
        console.assert(list.getName() === 'Colt');
        console.assert(tps.getSize() === 2);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 2);

        // CHANGE LIST NAME TO LOCAL
        tps.addTransaction(new changeListName_Transaction(list, 'Local'));
        console.assert(list.getName() === 'Local');
        console.assert(tps.getSize() === 3);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 3);
    }

    testChangeOwnerName() {

        tps = jsTPS();
        var list = new todoList(0, 'Local Anastasia', 'Vincee', []);

        console.assert(list.getOwner() === 'Vincee');

        // CHANGE LIST OWNER TO NICO
        tps.addTransaction(new changeListOwner_Transaction(list, 'Nico'));
        console.assert(list.getOwner() === 'Nico');
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // CHANGE LIST OWNER TO LISBEN
        tps.addTransaction(new changeListOwner_Transaction(list, 'Lisben'));
        console.assert(list.getOwner() === 'Lisben');
        console.assert(tps.getSize() === 2);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 2);

        // CHANGE LIST OWNER TO ANDRE
        tps.addTransaction(new changeListOwner_Transaction(list, 'Andre'));
        console.assert(list.getOwner() === 'Andre');
        console.assert(tps.getSize() === 3);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 3);
    }

    testModifyListItems() {
        tps = jsTPS();

        var items = [];
        for (var i = 0; i < 6; i++) {
            items.push(new todoItem(i, "Escape DEMA", "Tyler", "2018-10-05", false));
        }
        var list = new todoList(0, 'Local Anastasia', 'Vincee', items);

        // CHECK LIST ITEM AT INDEX 3
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Escape DEMA");
        console.assert(list.getItem(3).getAssignedTo() === "Tyler");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === false);

        // CHANGE LIST ITEM AT INDEX 3
        var newItem = new todoItem(3, "Be A Bandito", "Josh", "2018-10-05", true);
        var newItems = list.getItems();
        newItems[3] = newItem;
        tps.addTransaction(new modifyListItems_Transaction(list, newItems));
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Be A Bandito");
        console.assert(list.getItem(3).getAssignedTo() === "Josh");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === true);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // CHECK LIST ITEM AT INDEX 0
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Escape DEMA");
        console.assert(list.getItem(0).getAssignedTo() === "Tyler");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === false);

        // CHANGE LIST ITEM AT INDEX 0
        newItem = new todoItem(0, "Sip On Chlorine", "Tyler", "2018-10-05", true);
        newItems = list.getItems();
        newItems[0] = newItem;
        tps.addTransaction(new modifyListItems_Transaction(list, newItems));
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Sip On Chlorine");
        console.assert(list.getItem(0).getAssignedTo() === "Tyler");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === true);
        console.assert(tps.getSize() === 2);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 2);

        // CHECK LIST ITEM AT INDEX 4
        console.assert(list.getItem(4).getKey() === 4);
        console.assert(list.getItem(4).getDescription() === "Escape DEMA");
        console.assert(list.getItem(4).getAssignedTo() === "Tyler");
        console.assert(list.getItem(4).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(4).getCompleted() === false);

        // CHANGE LIST ITEM AT INDEX 4
        newItem = new todoItem(4, "Get Beat To Smithereens", "Tyler", "1988-12-01", true);
        newItems = list.getItems();
        newItems[4] = newItem;
        tps.addTransaction(new modifyListItems_Transaction(list, newItem));
        console.assert(list.getItem(4).getKey() === 0);
        console.assert(list.getItem(4).getDescription() === "Get Beat To Smithereens");
        console.assert(list.getItem(4).getAssignedTo() === "Tyler");
        console.assert(list.getItem(4).getDueDate() === "1988-12-01");  
        console.assert(list.getItem(4).getCompleted() === true);
        console.assert(tps.getSize() === 3);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 3);  

        // ADD LIST ITEM AT INDEX 5
        newItem = new todoItem(5, "Turn Guns To Hands", "Josh", "1997-03-13", true);
        newItems = list.getItems();
        newItems.push(newItem);
        tps.addTransaction(new modifyListItems_Transaction(list, newItem));
        console.assert(list.getItem(5).getKey() === 0);
        console.assert(list.getItem(5).getDescription() === "Turn Guns To Hands");
        console.assert(list.getItem(5).getAssignedTo() === "Josh");
        console.assert(list.getItem(5).getDueDate() === "1997-03-13");  
        console.assert(list.getItem(5).getCompleted() === true);
        console.assert(tps.getSize() === 4);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 4);  
    }

    testUndoTransaction() {
        tps = jsTPS();

        var items = [];
        for (var i = 0; i < 6; i++) {
            items.push(new todoItem(i, "Escape DEMA", "Tyler", "2018-10-05", false));
        }
        var list = new todoList(0, 'Local Anastasia', 'Vincee', items);

        // TEST 1: EDIT LIST ITEM
        // CHECK LIST ITEM AT INDEX 3
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Escape DEMA");
        console.assert(list.getItem(3).getAssignedTo() === "Tyler");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === false);

        // CHANGE LIST ITEM AT INDEX 3
        var newItem = new todoItem(3, "Be A Bandito", "Josh", "2018-10-05", true);
        var newItems = list.getItems();
        newItems[3] = newItem;
        tps.addTransaction(new modifyListItems_Transaction(list, newItems));
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Be A Bandito");
        console.assert(list.getItem(3).getAssignedTo() === "Josh");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === true);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // UNDO CHANGE LIST ITEM AT INDEX 3
        tps.undoTransaction();
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Escape DEMA");
        console.assert(list.getItem(3).getAssignedTo() === "Tyler");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === false);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 1);
        console.assert(tps.getUndoSize() === 0);

        // TEST 2: DELETE LIST ITEM
        // CHECK LIST ITEM AT INDEX 4
        console.assert(list.getItem(4).getKey() === 4);
        console.assert(list.getItem(4).getDescription() === "Escape DEMA");
        console.assert(list.getItem(4).getAssignedTo() === "Tyler");
        console.assert(list.getItem(4).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(4).getCompleted() === false);

        // DELETE LIST ITEM AT INDEX 4
        newItems = list.getItems();
        newItems.splice(4, 1);
        tps.addTransaction(new modifyListItems_Transaction(list, newItems));
        console.assert(list.getItems().length === 4);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // UNDO DELETE LIST ITEM AT INDEX 4
        tps.undoTransaction();
        console.assert(list.getItem(4).getKey() === 4);
        console.assert(list.getItem(4).getDescription() === "Escape DEMA");
        console.assert(list.getItem(4).getAssignedTo() === "Tyler");
        console.assert(list.getItem(4).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(4).getCompleted() === false);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 1);
        console.assert(tps.getUndoSize() === 0);

        //TEST 3: SWAP LIST ITEMS
        // CHECK LIST ITEM AT INDEX 0
        newItem = new todoItem(3, "Be A Bandito", "Josh", "2018-10-05", true);
        list.setItem(0, newItem);
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Be A Bandito");
        console.assert(list.getItem(0).getAssignedTo() === "Josh");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === true);

        // CHECK LIST ITEM AT INDEX 1
        console.assert(list.getItem(1).getKey() === 1);
        console.assert(list.getItem(1).getDescription() === "Escape DEMA");
        console.assert(list.getItem(1).getAssignedTo() === "Tyler");
        console.assert(list.getItem(1).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(1).getCompleted() === false);

        // SWAP(LIST_ITEM[0], LIST_ITEM[1])
        newItems = list.getItems();
        var temp = newItems[0];
        newItems[0] = newItems[1];
        newItems[1] = temp;
        tps.addTransaction(new modifyListItems_Transaction(list, newItems));
        console.assert(list.getItem(1).getKey() === 1);
        console.assert(list.getItem(1).getDescription() === "Be A Bandito");
        console.assert(list.getItem(1).getAssignedTo() === "Josh");
        console.assert(list.getItem(1).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(1).getCompleted() === true);
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Escape DEMA");
        console.assert(list.getItem(0).getAssignedTo() === "Tyler");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === false);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // UNDO SWAP(LIST_ITEM[0], LIST_ITEM[1])
        tps.undoTransaction();
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Be A Bandito");
        console.assert(list.getItem(0).getAssignedTo() === "Josh");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === true);
        console.assert(list.getItem(1).getKey() === 1);
        console.assert(list.getItem(1).getDescription() === "Escape DEMA");
        console.assert(list.getItem(1).getAssignedTo() === "Tyler");
        console.assert(list.getItem(1).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(1).getCompleted() === false);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 1);
        console.assert(tps.getUndoSize() === 0);

    }

    testRedoTransaction() {
        tps = jsTPS();

        var items = [];
        for (var i = 0; i < 6; i++) {
            items.push(new todoItem(i, "Escape DEMA", "Tyler", "2018-10-05", false));
        }
        var list = new todoList(0, 'Local Anastasia', 'Vincee', items);

        // TEST 1: EDIT LIST ITEM
        // CHECK LIST ITEM AT INDEX 3
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Escape DEMA");
        console.assert(list.getItem(3).getAssignedTo() === "Tyler");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === false);

        // CHANGE LIST ITEM AT INDEX 3
        var newItem = new todoItem(3, "Be A Bandito", "Josh", "2018-10-05", true);
        var newItems = list.getItems();
        newItems[3] = newItem;
        tps.addTransaction(new modifyListItems_Transaction(list, newItems));
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Be A Bandito");
        console.assert(list.getItem(3).getAssignedTo() === "Josh");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === true);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // UNDO CHANGE LIST ITEM AT INDEX 3
        tps.undoTransaction();
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Escape DEMA");
        console.assert(list.getItem(3).getAssignedTo() === "Tyler");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === false);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 1);
        console.assert(tps.getUndoSize() === 0);

        // REDO CHANGE LIST ITEM AT INDEX 3
        tps.redoTransaction();
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Be A Bandito");
        console.assert(list.getItem(3).getAssignedTo() === "Josh");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === true);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // TEST 2: DELETE LIST ITEM
        // CHECK LIST ITEM AT INDEX 4
        console.assert(list.getItems().length === 5);
        console.assert(list.getItem(4).getKey() === 4);
        console.assert(list.getItem(4).getDescription() === "Escape DEMA");
        console.assert(list.getItem(4).getAssignedTo() === "Tyler");
        console.assert(list.getItem(4).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(4).getCompleted() === false);

        // DELETE LIST ITEM AT INDEX 4
        newItems = list.getItems();
        newItems.splice(4, 1);
        tps.addTransaction(new modifyListItems_Transaction(list, newItems));
        console.assert(list.getItems().length === 4);
        console.assert(tps.getSize() === 2);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 2);

        // UNDO DELETE LIST ITEM AT INDEX 4
        tps.undoTransaction();
        console.assert(list.getItems().length === 5);
        console.assert(tps.getSize() === 2);
        console.assert(tps.getRedoSize() === 1);
        console.assert(tps.getUndoSize() === 1);

        // REDO DELETE LIST ITEM AT INDEX 4
        tps.redoTransaction();
        console.assert(list.getItems().length === 4);
        console.assert(tps.getSize() === 2);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 2);

        //TEST 3: SWAP LIST ITEMS
        // CHECK LIST ITEM AT INDEX 0
        newItem = new todoItem(3, "Be A Bandito", "Josh", "2018-10-05", true);
        list.setItem(0, newItem);
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Be A Bandito");
        console.assert(list.getItem(0).getAssignedTo() === "Josh");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === true);

        // CHECK LIST ITEM AT INDEX 1
        console.assert(list.getItem(1).getKey() === 1);
        console.assert(list.getItem(1).getDescription() === "Escape DEMA");
        console.assert(list.getItem(1).getAssignedTo() === "Tyler");
        console.assert(list.getItem(1).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(1).getCompleted() === false);

        // SWAP(LIST_ITEM[0], LIST_ITEM[1])
        newItems = list.getItems();
        var temp = newItems[0];
        newItems[0] = newItems[1];
        newItems[1] = temp;
        tps.addTransaction(new modifyListItems_Transaction(list, newItems));
        console.assert(list.getItem(1).getKey() === 1);
        console.assert(list.getItem(1).getDescription() === "Be A Bandito");
        console.assert(list.getItem(1).getAssignedTo() === "Josh");
        console.assert(list.getItem(1).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(1).getCompleted() === true);
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Escape DEMA");
        console.assert(list.getItem(0).getAssignedTo() === "Tyler");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === false);
        console.assert(tps.getSize() === 3);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 3);

        // UNDO SWAP(LIST_ITEM[0], LIST_ITEM[1])
        tps.undoTransaction();
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Be A Bandito");
        console.assert(list.getItem(0).getAssignedTo() === "Josh");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === true);
        console.assert(list.getItem(1).getKey() === 1);
        console.assert(list.getItem(1).getDescription() === "Escape DEMA");
        console.assert(list.getItem(1).getAssignedTo() === "Tyler");
        console.assert(list.getItem(1).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(1).getCompleted() === false);
        console.assert(tps.getSize() === 3);
        console.assert(tps.getRedoSize() === 1);
        console.assert(tps.getUndoSize() === 2);

        // REDO SWAP(LIST_ITEM[0], LIST_ITEM[1])
        tps.redoTransaction();
        console.assert(list.getItem(1).getKey() === 1);
        console.assert(list.getItem(1).getDescription() === "Be A Bandito");
        console.assert(list.getItem(1).getAssignedTo() === "Josh");
        console.assert(list.getItem(1).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(1).getCompleted() === true);
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Escape DEMA");
        console.assert(list.getItem(0).getAssignedTo() === "Tyler");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === false);
        console.assert(tps.getSize() === 3);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 3);
    }
}