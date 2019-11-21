import React, { Component } from 'react';
import { auth, db } from '../Firebase/firebase';
import firebase from 'firebase';
import { BasicHeader } from '../components/Navbar/Navbars';

class CreateEvent extends Component {

    constructor() {
        super();
        this.ref = db.collection('events')
        this.state = {
            name: '',
            description: '',
            location: '',
            threshold: '0',
            dates: []
        }
    }

    onChange = (e) => {
        console.log("CHANGE STATE1")
        const state = this.state;
        state[e.target.name]  = e.target.value;
        this.setState(state);
    }

    formFilled = () => {
        return this.state.name 
        && this.state.description
        && this.state.location
        && this.state.threshold
        && this.state.dates.length > 0
    }

    updateDates = (e) => {
        const updatedDates = [...this.state.dates];
        updatedDates[e.target.dataset.index] = {date: e.target.value, writeonly: auth.currentUser.uid, votes: [auth.currentUser.uid]}
        this.setState({
            dates: updatedDates
        });
    }

    onSubmit = (e) => {
        e.preventDefault()
    
        const { name, description, location, threshold, dates } = this.state;

        this.ref.add({
            name,
            description,
            location,
            threshold,
            dates,
        })
        .then(documentRef =>{
            const eventId = documentRef.id;

            db.collection('users').get()
                .then(snapshot =>
                    snapshot.forEach(doc => {
                        doc.ref.update({
                            notifications: firebase.firestore.FieldValue.arrayUnion(`New event ${this.state.name}`)
                        })
                    })
                )
        })
        .then(() =>
            this.props.history.push('/dashboard')
        )
        .catch((error) => {
            console.error("Error creating event: ", error);
        });
      }

    addDate = () => {
        this.setState((prevState) => ({
            dates: [...prevState.dates, {date: null}]
        }))
    }

    removeDate = (e) => {
        e.preventDefault()
        const updatedDates = [...this.state.dates];
        updatedDates.splice(e.target.dataset.index,1);
        this.setState({
            dates: updatedDates
        });
    }

    renderDateFields = () => {
        return (
            <div className="container-fluid">
                {this.state.dates.map((date, index) => {
                    return (
                        <div key={index} className="row">
                            <div className="col-8">
                                <input type="date" className="form-control" data-index={index} defaultValue={date} onChange={this.updateDates}/>
                            </div>
                            <div className="col-2">
                                <button className="btn btn-xs btn-danger" data-index={index} onClick={this.removeDate}>X</button>
                            </div>
                        </div>
                    )
                })}
                <input
                    className="btn btn-primary"
                    type="button" 
                    value="Add date"
                    onClick={this.addDate}/>
            </div>
        );
    }

    render() {
        const { name, description } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    { BasicHeader({ canGoBack: true }) }
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="create-form-container">
                            <h1>Create an event</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="inputEventName">Name</label>
                                    <input name="name" id="inputEventName" type="text" className="form-control" value={name} onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEventDescription">Description</label>
                                    <textarea name="description" id="inputEventDescription" type="text" className="form-control" rows="3" value={description} onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEventLocation">Location</label>
                                    <input type="text" id="inputEventLocation" name="location" placeholder="Location" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="threshold">Date locking threshold</label>
                                    <input type="number" id="threshold" name="threshold" min="0" defaultValue="0" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dates">Dates </label>
                                    { this.renderDateFields() }
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={!this.formFilled()}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CreateEvent;