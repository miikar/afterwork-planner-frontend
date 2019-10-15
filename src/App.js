import React, { Component } from "react";
import logo from "./images/afterwork_planner.jpeg";
import "./App.css";


class App extends Component {
  state = {
    eventList: [],
    createForm: false,
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(
      this.state
    )
  }

  componentDidMount() {

  }

  handleEventForm = (event) => {
    event.preventDefault()
    const form = event.target
    const data = new FormData(form)
    const { eventList } = this.state


    const newEvent = {
      id: eventList.length,
      name: data.get('name'),
      description: data.get('description'),
      min: data.get('min'),
    }

    const newEvents = [...eventList, newEvent]
    this.setState({
      eventList: newEvents,
      createForm: false,
    })
  }

  render() {
    const { eventList, createForm } = this.state

    return (
      <div className="App">

      {!createForm ? (
        <div>
          <header>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <nav className="navbar">
              <ul className="nav container d-flex">
                <li className="nav-item active" onClick={() => this.setState({createForm: true})}>New</li>
                {/* <li className="nav-item active"><a href="#">Back</a></li> */}
                <li className="nav-item"><a href="#">Account</a></li>
              </ul>
            </nav>
          </header>

          <div className="content">
            <div className="event-list">
                {eventList.map((item) => {
                  return(
                    <div key={item.id} className="event-list-item">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            {item.name}
                          </div>
                          <div className="col">
                            {item.min}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="event-list-item">
                  <h2>No events</h2>
                </div>
            </div>
          </div>
        </div>
        ) : (
          <div className="create-form-container">
            <form onSubmit={this.handleEventForm}>
              <div className="form-group form-inline">
                <label htmlFor="inputEventName">Name</label>
                <input name="name" type="text" className="form-control" id="inputEventName"/>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="inputEventDescription">Description</label>
                <textarea name="description" type="text" className="form-control" id="inputEventDescription" rows="3"/>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="inputMinParticipants">Min Participants</label>
                <input name="min" type="number" className="form-control" id="inputMinParticipants"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        )
      } 

      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1>Afterwork Planner</h1>
//       </header>
//     </div>
//   );
// }

export default App;
