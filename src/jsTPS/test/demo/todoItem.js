class todoItem {

    constructor(key, description, assigned_to, due_date, completed) {
        this.key = key;
        this.description = description;
        this.assigned_to = assigned_to;
        this.due_date = due_date;
        this.completed = completed;
    }

    setKey(newKey) {
        this.key = newKey;
    }

    getKey() {
        return this.key;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    getDescription() {
        return this.description;
    }

    setAssignedTo(newassigned_to) {
        this.assigned_to = newassigned_to;
    }

    getAssignedTo() {
        return this.assigned_to;
    }

    setDueDate(newdue_date) {
        this.due_date = newdue_date;
    }

    getDueDate() {
        return this.due_date;
    }

    setCompleted(newCompleted) {
        this.completed = newCompleted;
    }

    getCompleted() {
        return this.completed;
    }

    toString() {
        var item = "Item: {";
        item += "description: " + this.getDescription() + ", ";
        item += "assigned_to: " + this.getAssigned_to() + ", ";
        item += "due_date: " + this.getDueDate() + ", ";
        item += "completed: " + this.getCompleted() + "}";
        
        return item;
    }
}

export default todoItem;