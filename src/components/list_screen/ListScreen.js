import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';
import changeListName_Transaction from '../list_transactions/changeListName_Transaction'
import changeListOwner_Transaction from '../list_transactions/changeListOwner_Transaction'
import modifyListItems_Transaction from '../list_transactions/modifyListItems_Transaction'

export class ListScreen extends Component {

    constructor(props){
        super(props);
        this.keydownFunction = this.keydownFunction.bind(this);
        this.keyupFunction = this.keyupFunction.bind(this);
        this.ctrl = false;
        this.z = false;
        this.y = false;
        this.todoList = this.props.todoList;
        this.state = {
            modalIsVisible: false,
            todoList: this.todoList,
            prevOwner: this.todoList.getOwner(),
            prevName: this.todoList.getName()
        }
    }

    keydownFunction(e) {
        switch(e.keyCode) {
            case 17:
                this.ctrl = true;
                break;
            
            case 90:
                this.z = true;
                break;
            
            case 89:
                this.y = true;
                break;
            
            default:
                break;
        }
        
        if (this.ctrl && this.z) { //UNDO 
            let undoTransaction = this.props.tps.peekUndo();
            if (undoTransaction) {
                this.props.tps.undoTransaction();
                this.setState({todoList: undoTransaction.initList}); 
                if (undoTransaction.initName) {
                    this.setState({prevName: undoTransaction.initName});
                }
                if (undoTransaction.initOwner) {
                    this.setState({prevOwner: undoTransaction.initOwner});
                }
            }
        }
        else if (this.ctrl && this.y) { //REDO
            let redoTransaction = this.props.tps.peekDo();
            if (redoTransaction) {
                this.props.tps.doTransaction();
                this.setState({todoList: redoTransaction.initList});
                if (redoTransaction.initName) {
                    this.setState({prevName: redoTransaction.initName});
                }
                if (redoTransaction.initOwner) {
                    this.setState({prevOwner: redoTransaction.initOwner});
                }
            }
        }
    }

    keyupFunction(e) {
        switch(e.keyCode) {
            case 17:
                this.ctrl = false;
                break;
            
            case 90:
                this.z = false;
                break;
            
            case 89:
                this.y = false;
                break;

            default:
                break;
        }   
    }

    componentDidMount(){
        document.addEventListener("keydown", this.keydownFunction, false);
        document.addEventListener("keyup", this.keyupFunction, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.keydownFunction, false);
        document.removeEventListener("keyup", this.keyupFunction, false);
    }

    updateIndices = (items) => {
        let todoItemsClone = JSON.parse(JSON.stringify(items));
        let newTodoItems = [];
        for(var i = 0; i < todoItemsClone.length; i++) {
            var newTodoItem = this.props.createNewItem(todoItemsClone[i]);
            newTodoItem.setKey(i);
            newTodoItems.push(newTodoItem);
            
        }
        return newTodoItems;
    }

    updateListItems = (items) => {
        let todoListClone = JSON.parse(JSON.stringify(this.state.todoList));
        let todoItemsClone = JSON.parse(JSON.stringify(items));
        let newTodoList = this.props.createNewList(todoListClone);
        let newTodoItems = [];
        for (var i = 0; i < todoItemsClone.length; i++) {
            newTodoItems.push(this.props.createNewItem(todoItemsClone[i]));
        }
        this.props.tps.addTransaction(new modifyListItems_Transaction(newTodoList, newTodoItems));
        this.setState({todoList: newTodoList});
    }

    setListOwner = (e) => {
        let newOwner = e.target.value;
        let todoListClone = JSON.parse(JSON.stringify(this.state.todoList));
        let newTodoList = this.props.createNewList(todoListClone);
        newTodoList.setOwner(newOwner);
        this.setState({todoList: newTodoList});
    }
    
    setListOwnerTransaction = (e) => {
        let newOwner = e.target.value;
        let todoListClone = JSON.parse(JSON.stringify(this.state.todoList));
        let newTodoList = this.props.createNewList(todoListClone);
        newTodoList.setOwner(this.state.prevOwner);
        this.props.tps.addTransaction(new changeListOwner_Transaction(newTodoList, newOwner));
        this.setState({todoList: newTodoList, prevOwner: newOwner});
    }

    setListName = (e) => {
        let newName = e.target.value;
        let todoListClone = JSON.parse(JSON.stringify(this.state.todoList));
        let newTodoList = this.props.createNewList(todoListClone);
        newTodoList.setName(newName);
        this.setState({todoList: newTodoList});
    }

    setListNameTransaction = (e) => {
        let newName = e.target.value;
        let todoListClone = JSON.parse(JSON.stringify(this.state.todoList));
        let newTodoList = this.props.createNewList(todoListClone);
        newTodoList.setName(this.state.prevName);
        this.props.tps.addTransaction(new changeListName_Transaction(newTodoList, newName));
        this.setState({todoList: newTodoList, prevName: newName});
    }

    getListName() {
        if (this.state.todoList) {
            let name = this.state.todoList.getName();
            return name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.state.todoList) {
            let owner = this.state.todoList.getOwner();
            return owner;
        }
    }
    showModal = () => {
        this.setState({modalIsVisible: true});
    }
    
    hideModal = () => {
        this.setState({modalIsVisible: false});
    }

    deleteList = () => {
        this.hideModal();
        this.props.deleteList();
    }

    getModal() {
        return this.state.modalIsVisible ? "modal is_visible" : "modal";
    }

    render() {
        return (
            <div>
                <div id="todo_list">
                    <ListHeading goHome={this.props.goHome}
                                 todoList={this.state.todoList}
                                 updateListChanges={this.props.updateListChanges} />
                    <ListTrash showModal={this.showModal}/>
                    <div id="list_details_container">
                        <div id="list_details_name_container" className="text_toolbar">
                            <span id="list_name_prompt" >Name:</span>
                            <input 
                                onChange={this.setListName}
                                onBlur={this.setListNameTransaction}
                                value={this.getListName()}
                                type="text" 
                                id="list_name_textfield" />
                        </div>
                        <div id="list_details_owner_container" className="text_toolbar" >
                            <span id="list_owner_prompt" >Owner:</span>
                            <input 
                                onChange={this.setListOwner}
                                onBlur={this.setListOwnerTransaction}
                                value={this.getListOwner()}
                                type="text" 
                                id="list_owner_textfield" />
                        </div>
                    </div>
                    <ListItemsTable 
                        tps={this.props.tps}
                        goItem={this.props.goItem}
                        todoList={this.state.todoList}
                        updateListItems={this.updateListItems}
                        createNewItem={this.props.createNewItem} 
                        updateIndices={this.updateIndices}
                        updateListChanges={this.props.updateListChanges}
                    />
                </div>
                <div className={this.getModal()} data-animation={"slideInOutLeft"}>
                    <div className="modal_dialog">
                        <p className="modal_header">Delete list?</p>
                        <br></br>
                        <p className="modal_footer">Are you sure you want to delete this list?</p>
                        <div id="modal_dialog_button_container"> 
                            <button className="modal_dialog_button" onClick={this.deleteList}>YES</button>
                            <button className="modal_dialog_button" onClick={this.hideModal}>NO</button>
                        </div>
                        <p>This list will not be retrievable.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListScreen
