import React from "react";
import TodoItem from "./components/TodoItem";
import './TodoApp.css';

interface TodoAppProps {}
interface TodoAppState {
  todoItems: string[];
  newTodo: string;
}

interface IndivIdx {
  idx: number;
}

class TodoApp extends React.Component<TodoAppProps, TodoAppState> {
  constructor(props: TodoAppProps) {
    super(props);
    
    this.state = {
      todoItems: [],
      newTodo: "",
    };
  }

  handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodo: e.target.value,
    });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = this.state.todoItems.concat(this.state.newTodo)

    if (this.state.newTodo.length !== 0){
      this.setState({
        todoItems: items,
        newTodo: "",
      })
    } 
  }

  handleComplete = (index: IndivIdx) =>{
    const copy = this.state.todoItems;
    copy.splice(index.idx, 1);
    this.setState({
      todoItems: copy
    })
  }

  render() {
    return (
      <div>
        <h1 id="title">TODO</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">What Should I Do?</label> <br /><br />
          <input type="text" id="new-todo" value={this.state.newTodo} onChange={this.handleNewTodo} />
          <button>Add #{this.state.todoItems.length + 1}</button>
        </form>
        {
          this.state.todoItems.map((item, idx) => (
            <div>
              <br/>
              <TodoItem name={item} key={idx}/>
              <button onClick={() => this.handleComplete({idx: idx})}>delete</button>
            </div>
            
          ))
        }
      </div>
    )
  }
}

export default TodoApp;