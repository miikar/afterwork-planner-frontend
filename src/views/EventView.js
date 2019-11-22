import React, { Component } from 'react';
import { auth, db } from '../Firebase/firebase';
import firebase from 'firebase/app';
import DateVote from './DateVote';
import { BasicHeader } from '../components/Navbar/Navbars';

class EventView extends Component {
    constructor(props) {
        super(props);
        this.eventListener = null;
        this.state = {
            loading: true,
            joined: false,
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
            interested: firebase.firestore.FieldValue.arrayUnion(this.currentUser)
        };
        
        db.collection('events')
            .doc(this.props.match.params.eventId)
            .update(update)
            .catch((e) => console.error(e));
        
    }

    handleConfirmClick = () => {
        const update = {
            confirmed: firebase.firestore.FieldValue.arrayUnion(this.currentUser)
        }

        db.collection('events')
            .doc(this.props.match.params.eventId)
            .update(update)
            .catch((e) => console.error(e));
    }

    isInterested = () => {
        return this.state.interested && this.state.interested.includes(this.currentUser);
    }

    isConfirmed = () => {
        return this.state.confirmed && this.state.confirmed.includes(this.currentUser);
    }

    componentWillUnmount() {
        this.eventListener();
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    { BasicHeader({ canGoBack: true }) }
                </div>

                { !this.state.loading 
                    ?   <>
                            <div className="d-flex align-items-center">
                                <h1>{ this.state.name }</h1>
                                <span style={{display:'block'}}>, { this.state.location } </span> 
                            </div>
                            <p>{ this.state.description }</p>
                            <p></p>

                            <h3>Dates</h3>
                            {!this.isInterested()
                                ?   <p>Join to see the schedule</p>
                                :   <DateVote currentUser={this.currentUser} eventId={this.props.match.params.eventId} />
                            }

                            <button style={{marginTop:'16px'}} disabled={this.isInterested()} className={'btn btn-' + (this.isInterested() ? 'success' : 'primary')} onClick={() => this.handleJoinClick()} >
                                { this.isInterested() ? 'Interested' : 'Join'}
                            </button>
                        </>
                    : <p>Loading...</p>
                }
            </div>
        );
    }
}

export default EventView;