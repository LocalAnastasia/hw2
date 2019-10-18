import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {

    state = {
        taskSortToggle: true,
        dueDateSortToggle: true,
        completedSortToggle: true
    }

    sortByTask = () => {
        let newItems = [...this.props.todoList.getItems()];
        if (this.state.taskSortToggle){
            // Ascending order
            newItems.sort((a, b) =>  a.description > b.description ? 1 : -1);
        }
        else{
            // Descending order
            newItems.sort((a, b) =>  a.description > b.description ? -1 : 1);
        }
        newItems = this.props.updateIndices(newItems);
        this.props.updateListItems(newItems);
        this.setState({taskSortToggle: !this.state.taskSortToggle});
    }

    sortByDueDate = () => {
        let newItems = [...this.props.todoList.getItems()];
        if (this.state.dueDateSortToggle){
            // Ascending order
            newItems.sort((a, b) =>  a.due_date > b.due_date ? 1 : -1);
        }
        else{
            // Descending order
            newItems.sort((a, b) =>  a.due_date > b.due_date ? -1 : 1);
        }
        newItems = this.props.updateIndices(newItems);
        this.props.updateListItems(newItems);
        this.setState({dueDateSortToggle: !this.state.dueDateSortToggle});
    }

    sortByCompleted = () => {
        let newItems = [...this.props.todoList.getItems()];
        if (this.state.completedSortToggle){
            // Ascending order
            newItems.sort((a, b) =>  a.completed > b.completed ? 1 : -1);
        }
        else{
            // Descending order
            newItems.sort((a, b) =>  a.completed > b.completed ? -1 : 1);
        }
        newItems = this.props.updateIndices(newItems);
        this.props.updateListItems(newItems);
        this.setState({completedSortToggle: !this.state.completedSortToggle});
    }

    swapItems = (items, key1, key2) => {
        let temp = items[key1];
        items[key1] = items[key2];
        items[key2] = temp;
        items = this.props.updateIndices(items);
        return items;
    }
    moveItemUp = (item) => {
        let newItems = JSON.parse(JSON.stringify(this.props.todoList.getItems()));
        if (item.key > 0){
            newItems = this.swapItems(newItems, item.key, newItems[item.key - 1].key);
        }
        this.props.updateListItems(newItems);
        this.resetAllSortToggle();
    }

    moveItemDown = (item) => {
        let newItems = JSON.parse(JSON.stringify(this.props.todoList.getItems()));
        if (item.key < newItems.length - 1){
            newItems = this.swapItems(newItems, item.key, newItems[item.key + 1].key);
        }
        this.props.updateListItems(newItems);
        this.resetAllSortToggle();
    }

    deleteItem = (item) => {
        let newItems = JSON.parse(JSON.stringify(this.props.todoList.getItems()));
        newItems = newItems.filter(x => x.key !== item.key);
        newItems = this.props.updateIndices(newItems);
        this.props.updateListItems(newItems);
    }

    resetAllSortToggle = () => {
        this.setState({taskSortToggle: true});
        this.setState({dueDateSortToggle: true});
        this.setState({completedSortToggle: true});
    }

    getNewItem = () => {
        let key = this.props.todoList.getItems().length;
        let description = "";
        let due_date = new Date().toISOString().split('T')[0];
        let assigned_to = "";
        let completed = false;

        return {"key": key, 
                "description": description, 
                "due_date": due_date, 
                "assigned_to": assigned_to, 
                "completed": completed};
    }

    updateListAndGoItem = () => {
        this.props.updateListChanges(this.props.todoList);
        this.props.goItem(this.props.createNewItem(this.getNewItem()));
    }

    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header" onClick={this.sortByTask}>Task</div>
                    <div className="list_item_due_date_header" onClick={this.sortByDueDate}>Due Date</div>
                    <div className="list_item_status_header" onClick={this.sortByCompleted}>Status</div>
                </div>
                {
                    this.props.todoList.getItems().map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.getKey()}
                            listItem={todoItem}
                            isFirst={todoItem.getKey() === 0}
                            isLast={todoItem.getKey() === this.props.todoList.getItems().length - 1}
                            moveItemUp={this.moveItemUp}
                            moveItemDown={this.moveItemDown}
                            deleteItem={this.deleteItem}
                            goItem={this.props.goItem}
                            todoList={this.props.todoList}
                            updateListItems={this.props.updateListItems}
                            updateListChanges={this.props.updateListChanges}
                            />
                    ))
                }
                <div className='list_item_add_card' onClick={this.updateListAndGoItem}>&#10133;</div>
            </div>
        )
    }
}

export default ListItemsTable
