class todoList {

    constructor(key, name, owner, items) {
        this.key = key;
        this.name = name;
        this.owner = owner;
        this.items = items;
    }

    setKey(newKey) {
        this.key = newKey;
    }

    getKey() {
        return this.key;
    }

    setName(newName) {
        this.name = newName;
    }

    getName() {
        return this.name
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    getOwner() {
        return this.owner;
    }

    setItems(newItems) {
        this.items = newItems;
    }

    getItems() {
        return this.items;
    }

    // TODOITEM OPERATIONS
    setItem(key, newItem) {
        this.items[key] = newItem;
    }

    getItem(key) {
        return this.items[key];
    }

    setDescription(key, newDescription) {
        this.items[key].setDescription(newDescription);
    }

    getDescription(key) {
        return this.items[key].getDescription();
    }

    setAssignedTo(key, newAssignedTo) {
        this.items[key].setAssignedTo(newAssignedTo);
    }

    getAssignedTo(key) {
        return this.items[key].getAssignedTo();
    }

    setDueDate(key, newDueDate) {
        this.items[key].setDueDate(newDueDate);
    }

    getDueDate(key) {
        return this.items[key].getDueDate();
    }

    setCompleted(key, newCompleted) {
        this.items[key].setCompleted(newCompleted);
    }

    getCompleted(key) {
        return this.items[key].getCompleted();
    }
}

export default todoList;