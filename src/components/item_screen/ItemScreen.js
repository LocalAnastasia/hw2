import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    state = {
        key: this.props.todoItem.getKey(),
        description: this.props.todoItem.getDescription(),
        assigned_to: this.props.todoItem.getAssignedTo(),
        due_date: this.props.todoItem.getDueDate(),
        completed: this.props.todoItem.getCompleted()
    }

    setDescription = (e) => {
        this.setState({description: e.target.value});
    }

    setAssignedTo = (e) => {
        this.setState({assigned_to: e.target.value});
    }

    setDueDate = (e) => {
        this.setState({due_date: e.target.value});
    }

    setCompleted = (e) => {
        this.setState({completed: e.target.value});
    }

    collectChanges = () => {
        let key = this.state.key;
        let description = this.state.description.trim() === "" ? "Unknown" : this.state.description;
        let assigned_to = this.state.assigned_to;
        let due_date = this.state.due_date;
        let completed = this.state.completed;
        
        return {"key": key, 
                "description": description, 
                "due_date": due_date, 
                "assigned_to": assigned_to, 
                "completed": completed};
    }

    render() {
        return (
            <div id="todo_item">
                <div id="item_heading">
                    <span>Item</span>
                </div>
                <div id="item_form_container">
                    <span id="item_description_prompt" className="item_prompt">Description: </span>
                    <input type="text" id="item_description_textfield" className="item_input" value={this.state.description} onChange={this.setDescription}/>
                    <p className="item_spacing"> </p>
                    <span id="item_assigned_to_prompt" className="item_prompt">Assigned To: </span>
                    <input type="text" id="item_assigned_to_textfield" className="item_input" value={this.state.assigned_to} onChange={this.setAssignedTo}/>
                    <p className="item_spacing"> </p>
                    <span id="item_due_date_prompt" className="item_prompt">Due Date: </span>
                    <input type="date" id="item_due_date_picker" className="item_input" value={this.state.due_date} onChange={this.setDueDate}/>
                    <p className="item_spacing"> </p>
                    <span id="item_completed_prompt" className="item_prompt">Completed: </span>
                    <input type="checkbox" id="item_completed_checkbox" className="item_input" checked={this.state.completed} onChange={this.setCompleted}/>
                </div>
                <div id="item_buttons_container">
                    <button id="item_form_submit_button" className="item_buttons" onClick={this.props.submitItem.bind(this, this.props.createNewItem(this.collectChanges()))}>Submit</button>
                    <button id="item_form_cancel_button" className="item_buttons" onClick={this.props.exitItem.bind(this)}>Cancel</button>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
