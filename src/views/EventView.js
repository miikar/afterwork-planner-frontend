import React, { Component } from 'react';
import { db, firebaseApp } from '../Firebase/firebase';
import firebase from 'firebase/app';
import DateVote from './DateVote';
import { BasicHeader } from '../components/Navbar/Navbars';

class EventView extends Component {
    constructor(props) {
        super(props);
        this.eventListener = null;
        this.state = {
            loading: true,
            user: null,
            joined: false
        };
        firebaseApp.auth().onAuthStateChanged(user => this.state.uid = user.uid);
    }

    async componentDidMount() {
        db.collection('events').doc(this.props.match.params.eventId).onSnapshot((doc) => {
            this.setState({...doc.data()});
        });

        this.setState({
             loading: false
        });

        this.eventListener = db.collection('events').doc(this.props.match.params.eventId)
            .onSnapshot(doc => {
                console.log("interested")
                console.log(doc.data())
            });
    }

    handleJoinClick = () => {
        const update = {
            interested: firebase.firestore.FieldValue.arrayUnion(this.state.uid)
        };
        
        db.collection('events')
            .doc(this.props.match.params.eventId)
            .update(update)
            .catch((e) => console.error(e));
        
    }

    handleConfirmClick = () => {
        const update = {
            confirmed: firebase.firestore.FieldValue.arrayUnion(this.state.uid)
        }

        db.collection('events')
            .doc(this.props.match.params.eventId)
            .update(update)
            .catch((e) => console.error(e));
    }

    isInterested = () => {
        return this.state.interested && this.state.interested.includes(this.state.uid);
    }

    isConfirmed = () => {
        return this.state.confirmed && this.state.confirmed.includes(this.state.uid);
    }

    componentWillUnmount() {
        this.eventListener();
    }

    render() {
        const { user, name, description, dates } = this.state

        return (
            <div className="container-fluid">
                <div className="row">
                    { BasicHeader({ canGoBack: true }) }
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-6 offset-xs-3">
                        { !this.state.loading ?
                        <>
                            <h1>{ this.state.name }</h1>
                            <p>{ this.state.description }</p>

                            { this.state.showError && <div class="alert alert-danger">{this.state.error}</div>}
                            { this.state.dates && this.state.dates.length > 0 &&

                              <>
                                  <h3>Scheduling</h3>
                                  <DateVote currentUser={user} eventId={this.props.match.params.eventId} />
                                  {/* { this.state.dates.map(date => <li key={date.date}>{date.date}</li>) } */}
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