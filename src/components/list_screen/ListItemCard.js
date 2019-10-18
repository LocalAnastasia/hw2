import React, { Component } from 'react'

export class ListItemCard extends Component {

    getCompleted = () => {
        return(this.props.listItem.completed ? 'list_item_card_completed' : 'list_item_card_not_completed');
    }

    getMoveUp = () => {
        return(this.props.isFirst ? 'disabled list_item_card_button' : 'list_item_card_button');
    }

    getMoveDown = () => {
        return(this.props.isLast ? 'disabled list_item_card_button' : 'list_item_card_button');
    }

    moveItemUp = (e) => {
        e.stopPropagation();
        this.props.moveItemUp(this.props.listItem);
    }

    moveItemDown = (e) => {
        e.stopPropagation();
        this.props.moveItemDown(this.props.listItem);
    }

    deleteItem = (e) => {
        e.stopPropagation();
        this.props.deleteItem(this.props.listItem);
    }

    updateListAndGoItem = () => {
        this.props.updateListChanges(this.props.todoList);
        this.props.goItem(this.props.listItem);
    }

    render() {
        return (
            <div className='list_item_card' onClick={this.updateListAndGoItem}>
                <div className='list_item_card_description'>
                    {this.props.listItem.getDescription()}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.getAssignedTo()}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.getDueDate()}
                </div>
                <div className={this.getCompleted()}>
                    {this.props.listItem.getCompleted() ? "Completed" : "Pending"}
                </div>
                <div className='list_item_card_toolbar'>
                    <div className={this.getMoveUp()} onClick={this.moveItemUp}>&#11014;</div>
                    <div className={this.getMoveDown()} onClick={this.moveItemDown}>&#11015;</div>
                    <div className='list_item_card_button' onClick={this.deleteItem}>&#10006;</div>
                </div>
            </div>
        )
    }
}

export default ListItemCard
