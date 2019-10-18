import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import jsTPS from './jsTPS/src/jsTPS/jsTPS'
import todoList from './jsTPS/test/demo/todoList'
import todoItem from './jsTPS/test/demo/todoItem'
import modifyListItems_Transaction from './components/list_transactions/modifyListItems_Transaction'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN",
  MODAL_SCREEN: "MODAL_SCREEN"
}

class App extends Component {
  
  constructor() {
    super();
    this.tps = new jsTPS();
  }

  createListObjectItem = (item) => {
    var key = item.key;
    var description = item.description;
    var assignedTo = item.assigned_to;
    var dueDate = item.due_date;
    var completed = item.completed;
    var todoListObjectItem = new todoItem(key, description, assignedTo, dueDate, completed);

    return todoListObjectItem;
  }

  createListObject = (list) => {
    var todoListObject = null;

    if (list) {
      var key = list.key;
      var name = list.name;
      var owner = list.owner;
      var items = [];
      for (var i = 0; i < list.items.length; i++) {
        var itemObject = this.createListObjectItem(list.items[i]);
        items.push(itemObject);
      }
    }
    else {
      var key = this.state.todoLists.length;
      var name = '';
      var owner = '';
      var items = [];
    }

    todoListObject = new todoList(key, name, owner, items);
    return todoListObject;
  }

  initTodoLists = (todoLists) => {
    var listOfTodoListsObject = []
    for (var i = 0; i < todoLists.length; i++) {
      listOfTodoListsObject.push(this.createListObject(todoLists[i]));
    }
    return listOfTodoListsObject;
  }

  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: this.initTodoLists(testTodoListData.todoLists),
    currentList: null,
    currentItem: null,
    modalIsVisible: false
  }

  deleteList = () => {
    let newLists = [...this.state.todoLists];
    newLists = this.removeFromLists(newLists, this.state.currentList.key);
    this.setState({todoLists: newLists});
    this.setState({currentList: null});
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
  }

  goHome = () => {
    this.tps.clearAllTransactions();
    this.setState({currentList: null});
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
  }

  goItem = (item) => {
    console.log(this.state.currentList);
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    this.setState({currentItem: item});
    console.log(this.state.currentList);
  }
  submitItem = (item) => {
    this.updateItem(item);
    this.exitItem();
  }

  exitItem = () => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentItem: null});
  }

  updateItem = (newItem) => {
    let todoListClone = JSON.parse(JSON.stringify(this.state.currentList));
    let todoItemsClone = JSON.parse(JSON.stringify(this.state.currentList.getItems()));
    let newTodoList = this.createListObject(todoListClone);
    let newTodoItems = [];
    for (var i = 0; i < todoItemsClone.length; i++) {
        newTodoItems.push(this.createListObjectItem(todoItemsClone[i]));
    }
    if (newItem.getKey() === newTodoItems.length) { // If it is a new item
      newTodoItems = [...newTodoItems, newItem];
    }
    else { // If it is an existing item
      newTodoItems = newTodoItems.map(item => item.getKey() === newItem.getKey() ? newItem : item);
    }
    this.tps.addTransaction(new modifyListItems_Transaction(newTodoList, newTodoItems));
    this.setState({currentList: newTodoList});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
  }

  updateListChanges = (list) => {
    let targetKey = list.key;

    if (list.getName().trim() === "") {
      list.setName("Untitled");
    }
    
    // Delete old version of list from lists, if it exists
    let newLists = this.removeFromLists([...this.state.todoLists], targetKey);

    // Add new version of list to top of lists
    newLists = this.addToLists(newLists, this.createListObject(list));

    //Reorder keys
    newLists = this.updateIndices(newLists);

    // Update state
    this.setState({todoLists: newLists, currentList: newLists[0]});
  }

  updateIndices = (lists) => {
    for(var i = 0; i < lists.length; i++) {
        lists[i].key = i;
    }
    return lists;
  }
  
  // Add to top of lists
  addToLists = (lists, list) => {
    return [list, ...lists];
  }
  // Remove from lists
  removeFromLists = (lists, targetKey) => {
    let newLists = lists.filter(list => list.key !== targetKey);
    return newLists;
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists}
        createNewList={this.createListObject} />;
      case AppScreen.LIST_SCREEN:  
        return <ListScreen
          tps={this.tps}
          createNewItem={this.createListObjectItem}
          createNewList={this.createListObject}
          deleteList={this.deleteList.bind(this)}
          goHome={this.goHome.bind(this)}
          goItem={this.goItem.bind(this)}
          todoList={this.state.currentList} 
          updateListChanges={this.updateListChanges.bind(this)} />; 
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          createNewItem={this.createListObjectItem}
          currentScreen={this.state.currentScreen}
          todoItem={this.state.currentItem}
          submitItem={this.submitItem.bind(this)}
          exitItem={this.exitItem.bind(this)} />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;