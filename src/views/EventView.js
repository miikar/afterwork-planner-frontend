import React, { Component } from 'react';
import { db, firebaseApp } from '../Firebase/firebase';

class EventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: null,
            joined: false
        };
        firebaseApp.auth().onAuthStateChanged(user => this.state.uid = user.uid);
    }

    async componentDidMount() {
        this.ref = await db.collection('events').doc(this.props.match.params.eventId).get();
        this.setState({
            ...this.ref.data(),
             loading: false
        });
    }

    handleJoinClick = async () => {
        const update = {
            interested: this.state.interested ? [...this.state.interested, this.state.uid] : [this.state.uid] // risk of race condition when multiple users try to join at once.
        };
        try {
            await db.collection('events').doc(this.props.match.params.eventId).update(update);
            this.setState({ joined: true});
        } catch (err) {
            this.setState({ error: 'Could not join the event', showError: true });
        }
    }

    handleConfirmClick = async () => {
        const update = {
            confirmed: this.state.confirmed ? [...this.state.confirmed, this.state.uid] : [this.state.uid]
        }

        try {
            await db.collection('events').doc(this.props.match.params.eventId).update(update);
            this.setState({ confirmed: true });
        } catch (err) {
            this.setState({ error: 'Could not confirm participation.', showError: true });
        }
    }

    isInterested = () => {
        return this.state.interested && this.state.interested.includes(this.state.uid);
    }

    isConfirmed = () => {
        return this.state.confirmed && this.state.confirmed.includes(this.state.uid);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        { !this.state.loading ?
                        <>
                            <h1>{ this.state.name }</h1>
                            <p>{ this.state.description }</p>

                            { this.state.showError && <div class="alert alert-danger">{this.state.error}</div>}
                            { this.state.dates && this.state.dates.length > 0 &&
                                <>
                                    <h3>Suggested dates for event</h3>
                                    <ul>
                                        { this.state.dates.map(date => <li key={date.date}>{date.date}</li>) }
                                    </ul>
                                </>
                            }
                            { !this.state.interested || this.state.interested.length < +(this.state.threshold) ?
                                <button disabled={this.isInterested()} className={'btn btn-' + (this.isInterested() ? 'success' : 'primary')} onClick={() => this.handleJoinClick()} >
                                    { this.isInterested() ? 'Joined' : 'Join'}
                                </button>
                            :   <>  <p>Please confirm your participation in this event.</p>
                                    <button disabled={this.isConfirmed()} className="btn btn-primary" onClick={this.handleConfirmClick}>Confirm</button>
                                </>
                            }
                        </>
                        :
                        <p>Loading...</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default EventView;