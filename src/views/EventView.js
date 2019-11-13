import React, { Component } from 'react';
import { db, firebaseApp } from '../Firebase/firebase';

class EventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: null
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
            interested: this.state.interested ? [...this.state.interested, this.state.uid] : [this.state.uid]
        };
        try {
            await db.collection('events').doc(this.props.match.params.eventId).update(update);
            this.setState({ joined: true});
        } catch (err) {
            this.setState({ error: 'Could not join the event', showError: true });
        }
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

                            <button className={'btn btn-' + (this.state.joined ? 'success' : 'primary')} onClick={() => this.handleJoinClick()} >
                                {this.state.joined ? 'Joined' : 'Join'}
                            </button>
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