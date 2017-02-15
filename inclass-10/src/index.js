//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
//
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }

    render() { return (
        <li>
            <i className="check glyphicon glyphicon-check" onClick={ (e) =>
                { this.state.done = !this.state.done
                  if (this.state.done) {
                      this.state.span.className = "completed"
                      this.state.span.contentEditable = false
                  } else {
                      this.state.span.className = ""
                      this.state.span.contentEditable = true
                  }} } />
            <span contentEditable={true} ref={ (span) => this.state.span = span }
                dangerouslySetInnerHTML={{__html: this.props.text}} />
            <i className="destroy glyphicon glyphicon-remove"
                onClick={ (e) => this.props.remove() } />
        </li>
        /*
        h("li", { id: `task${_taskId++}`}, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        ])
        */
    )}
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
    }

    addTodo() {
        // IMPLEMENT ME!
        let text = this.state.textInput.value
        if (text === "" ) {
          text = "Add another item"
        }
        this.setState({ todoItems: [
                ...this.state.todoItems,
                {id:this.nextId++, text:text}
            ]
        })
    }

    removeTodo(removeId) {
        this.setState({
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    render() { return (
        <div>
            <input id="newTODO" type="text" placeholder="To Do"
                ref={ (input) => { this.state.textInput = input }} />
            <button onClick={ () => this.addTodo() }> Add Item </button>
            <span className="submit">
                <a href="https://webdev-rice.herokuapp.com"
                    target="_blank"> Submit your exercise </a>
            </span>
            <ul className="todo">
                { this.state.todoItems.map((item, i) =>
                  <ToDoItem key={i} text={item.text} remove={() => this.removeTodo(i) } />) }
            </ul>
        </div>
        // Hint: <input ... ref={ (node) => this.... = node } />
        /*
        h("div", { },
            h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
            h("button", { onClick: addItem }, "Add Item"),
            h("span", { className: "submit" }, [
                h("a", { href: "https://webdev-rice.herokuapp.com",
                     target: "_blank" }, "Submit your exercise"),
            ]),
            h("ul", { className: "todo" }, listItems)
        )
        */
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
