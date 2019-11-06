import React, { Component } from 'react';
import { db } from '../Firebase/firebase';

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
        const date = e.target.value;
        
        // if date has not been picked yet,
        if (!this.state.dates.includes(date)) {    
            this.setState({
            dates: [...this.state.dates, {date: date, votes: 0}]   
            });
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
    
        const { name, description, location, threshold, dates } = this.state;

        this.ref.add({
            name,
            description,
            location,
            threshold,
            dates

        }).then(() =>
            this.props.history.push('/dashboard')
        )
        .catch((error) => {
            console.error("Error creating event: ", error);
        });
      }
    

    renderDateFields = () => {
        const preFilled = this.state.dates.map(date => {
            return (
                <>
                    <input type="date" className="form-control" defaultValue={date} onChange={this.updateDates} key={date}/>
                </>
            );
        });

        return (
            <>
                { preFilled }
                <input type="date" className="form-control" onChange={this.updateDates} />
            </>
        );
    }

    render() {
        const { name, description } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <header>
                            <h1>Afterwork Planner</h1>
                        </header>
                    </div>
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