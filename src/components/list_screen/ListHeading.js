import React, { Component } from 'react'

export class ListHeading extends Component {

    updateListAndGoHome(list, e) {
        this.props.updateListChanges(list);
        this.props.goHome();
    }
    render() {
        return (
            <div id="list_heading"
                onClick={this.updateListAndGoHome.bind(this, this.props.todoList)}
            >   @todo
            </div>
        )
    }
}

export default ListHeading
