import React, { Component } from 'react';
import { db } from '../Firebase/firebase';

class CreateEvent extends Component {

    constructor() {
        super();
        this.ref = db.collection('events')
        this.state = {
            name: '',
            description: '',
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    onSubmit = (e) => {
        e.preventDefault()
    
        const { name, description } = this.state

        this.ref.add({
            name,
            description,
        }).then(() =>
            this.props.history.push('/dashboard')
        )
        .catch((error) => {
            console.error("Error creating event: ", error);
        });
      }
    

    render() {
        const { name, description } = this.state;
        return (
            <div className="create-form-container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group form-inline">
                        <label htmlFor="inputEventName">Name</label>
                        <input name="name" id="inputEventName" type="text" className="form-control" value={name} onChange={this.onChange}/>
                    </div>
                    <div className="form-group form-inline">
                        <label htmlFor="inputEventDescription">Description</label>
                        <textarea name="description" id="inputEventDescription" type="text" className="form-control" rows="3" value={description} onChange={this.onChange}/>
                    </div>
                    {/* <div className="form-group form-inline">
                        <label htmlFor="inputMinParticipants">Min Participants</label>
                        <input name="min" type="number" className="form-control" id="inputMinParticipants"/>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }

}

export default CreateEvent;