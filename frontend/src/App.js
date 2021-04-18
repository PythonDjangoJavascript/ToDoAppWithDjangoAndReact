import './App.css';
import React from 'react'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div id="task-container">
                    <div id="form-wrapper">
                        <form id="form">
                            <div className="flex-wrapper">
                                <div style={{ flex: 6 }}>
                                    <input className="form-control" id="tittle" type="text" placeholder="Add taske" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input id="submit" className="btn btn-warning" type="submit" name="add" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
