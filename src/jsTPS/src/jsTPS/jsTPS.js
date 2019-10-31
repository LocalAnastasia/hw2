class jsTPS {
    
    constructor() {
        this.transactions = [];
        this.mostRecentTransaction = -1;
        this.performingDo = false;
        this.performingUndo = false;
    }

    performingDo() {
        return this.performingDo;
    }

    performingUndo() {
        return this.performingUndo;
    }

    // Adds to the top of the stack
    // If there are transactions that were undone (pointer is not at the top of the stack)
    // Remove all transactions above pointer
    // Add new transaction to the top of the stack (new transaction above pointer)
    // Call doTransaction (which will perform transaction and move pointer up)
    addTransaction(transaction) {
        if ((this.mostRecentTransaction < 0 || (this.mostRecentTransaction < (this.transactions.length - 1)))) {
            for (var i = this.transactions.length - 1; i > this.mostRecentTransaction; i--) {
                this.transactions.splice(i, 1);
            }
        }

        this.transactions.push(transaction);
        this.doTransaction();
    }

    // If pointer is not at the top of the stack
    // Perform transaction above pointer
    // Move pointer up
    doTransaction() {
        if (this.hasTransactionToRedo()) {
            this.performingDo = true;
            var transaction = this.transactions[this.mostRecentTransaction + 1];
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }  
    }

    // Get first transaction to be undone
    // Which is at pointer
    peekUndo() {
        if (this.hasTransactionToUndo()) {
            return this.transactions[this.mostRecentTransaction];
        }
        else {
            return null;
        }
    }

    // Get first transaction to be redone
    // Which is above pointer
    peekDo() {
        if (this.hasTransactionToRedo()) {
            return this.transactions[this.mostRecentTransaction + 1];
        }
        else {
            return null;
        }   
    }

    // If pointer is at least at i = 0 (there are still transactions to be undone)
    // Undo transaction at pointer
    // Move pointer down
    undoTransaction() {
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            var transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }

    // Reset stack and pointer
    clearAllTransactions() {
        this.transactions = [];
        this.mostRecentTransaction = -1;
    }

    getSize() {
        return this.transactions.length;
    }

    // Get number of transactions above pointer
    getRedoSize() {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    // Get number of transactions at and below pointer
    getUndoSize() {
        return this.mostRecentTransaction + 1;
    }

    hasTransactionToUndo() {
        return this.mostRecentTransaction >= 0;
    }

    hasTransactionToRedo() {
        return this.mostRecentTransaction < this.transactions.length - 1;
    }

    // String summary of current state of jsTPS
    toString() {
        var text = "--Number of Transactions: " + this.transactions.length + "\n";
        text += "--Current Index on Stack: " + this.mostRecentTransaction + "\n";
        text += "--Current Transaction Stack:\n";
        for (var i = 0; i <= this.mostRecentTransaction; i++) {
            var jT = this.transactions[i];
            text += "----" + jT.toString() + "\n";
        }
        return text;
    }
}

export default jsTPS;