import React, { Component } from 'react';
import { auth, db, firebaseApp } from '../Firebase/firebase';
import firebase from 'firebase/app';
import DateVote from './DateVote';

class EventView extends Component {
    constructor(props) {
        super(props);
        this.eventListener = null;
        this.state = {
            loading: true,
            joined: false,
            joined: false
        };
     
        this.currentUser = auth.currentUser.uid;
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
        const { name, description, dates } = this.state

        return (
            <div className="container-fluid">

                    { !this.state.loading 
                        ?   <>
                                <h1>{ this.state.name }</h1>
                                <p>{ this.state.description }</p>

                                <h3>Scheduling</h3>
                                <DateVote currentUser={this.currentUser} eventId={this.props.match.params.eventId} />
                                { !this.state.interested || this.state.interested.length < +(this.state.threshold) 
                                ?   <button disabled={this.isInterested()} className={'btn btn-' + (this.isInterested() ? 'success' : 'primary')} onClick={() => this.handleJoinClick()} >
                                        { this.isInterested() ? 'Joined' : 'Join'}
                                    </button>
                                :   <>  
                                        <p>Please confirm your participation in this event.</p>
                                        <button disabled={this.isConfirmed()} className="btn btn-primary" onClick={this.handleConfirmClick}>Confirm</button>
                                    </>
                                }
                            </>
                        : <p>Loading...</p>
                    }
            </div>
        );
    }
}

export default EventView;