import "../App.css"
import React from "react"

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            activeItem: {
                id: null,
                title: "",
                completed: false
            },
            editing: false
        }
        this.fetchTask = this.fetchTask.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.taskEdit = this.taskEdit.bind(this)
        this.taskDelete = this.taskDelete.bind(this)
        this.getCookie = this.getCookie.bind(this)
        this.taskComplete = this.taskComplete.bind(this)
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    componentWillMount() {
        this.fetchTask()
    }

    fetchTask() {
        console.log("fethcing...")
        fetch("http://127.0.0.1:8000/todo_api/task-list/")
            .then(response => response.json())
            .then(
                data => this.setState({
                    todoList: data
                })
            )
    }

    handleInputChange(event) {
        var value = event.target.value
        this.setState({
            activeItem: {
                ...this.state.activeItem,
                title: value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        var csrftoken = this.getCookie('csrftoken')

        let url = "http://127.0.0.1:8000/todo_api/task-create/";
        if (this.state.editing === true) {
            url = `http://127.0.0.1:8000/todo_api/task-update/${this.state.activeItem.id}/`
            this.setState({
                editing: false
            })
        }

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(this.state.activeItem)
        }).then((response) => {
            this.fetchTask()
            this.setState({
                todoList: [],
                activeItem: {
                    id: null,
                    title: "",
                    completed: false
                }
            })
        }).catch(error => {
            console.log("ERROR: ", error)
        })
    }

    taskEdit(task) {
        this.setState({
            activeItem: task,
            editing: true,
        })
    }

    taskComplete(task) {
        task = {
            ...task,
            completed: !task.completed
        }
        const url = `http://127.0.0.1:8000/todo_api/task-update/${task.id}/`
        const csrftoken = this.getCookie("csrftoken")
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(task)
        }).then(response => this.fetchTask())
    }

    taskDelete(task_id) {
        const csrftoken = this.getCookie('csrftoken')
        const url = `http://127.0.0.1:8000/todo_api/task-delete/${task_id}`

        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken,
            }
        }).then(response => this.fetchTask())
    }


    render() {
        var task = this.state.todoList
        const self = this

        return (
            <div className="container">
                <div id="task-container">
                    <div id="form-wrapper">
                        <form id="form" onSubmit={this.handleSubmit}>
                            <div className="flex-wrapper">
                                <div style={{ flex: 6 }}>
                                    <input onChange={this.handleInputChange} value={this.state.activeItem.title} className="form-control" id="tittle" type="text" placeholder="Add taske" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input id="submit" className="btn btn-warning" type="submit" name="add" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="list-wrapper">
                        {task.map((task, index) => {
                            return (
                                <div key={index} onClick={() => self.taskComplete(task)} className="task-wrapper flex-wrapper">
                                    <div style={{ flex: 7 }}>
                                        {task.completed ? (<strike>{task.title}</strike>) : (<span>{task.title}</span>)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <button onClick={() => { self.taskEdit(task) }} className="btn btn-sm btn-outline-info">Edit</button>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <button onClick={() => { self.taskDelete(task.id) }} className="btn btn-sm btn-outline-dark delete">-</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;