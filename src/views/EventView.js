import React, { Component } from 'react';
import { auth, db, firebaseApp } from '../Firebase/firebase';
import DateVote from './DateVote';

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
        this.ref = await db.collection('events').doc(this.props.match.params.eventId).get();
        this.setState({
            ...this.ref.data(),
             loading: false
        });

        this.eventListener = db.collection('events').doc(this.props.match.params.eventId)
            .onSnapshot(doc => {
                console.log("interested")
                console.log(doc.data())
            });
    }

    handleJoinClick = async () => {
        const update = {
            interested: this.state.interested ? [...this.state.interested, this.currentUser] : [this.currentUser]
        };
        try {
            await db.collection('events').doc(this.props.match.params.eventId).update(update);
            this.setState({ joined: true});
        } catch (err) {
            this.setState({ error: 'Could not join the event', showError: true });
        }
    }

    componentWillUnmount() {
        this.eventListener();
    }

    render() {
        const { name, description, dates } = this.state

        return (
            <div className="container-fluid">
                <div>
                    { !this.state.loading ?
                    <>
                        <h1>{ this.state.name }</h1>
                        <p>{ this.state.description }</p>

                        { this.state.showError && <div class="alert alert-danger">{this.state.error}</div>}
                        { this.state.dates && this.state.dates.length > 0 &&
                            <>
                                <h3>Scheduling</h3>
                                <DateVote currentUser={this.currentUser} eventId={this.props.match.params.eventId} />
                                {/* { this.state.dates.map(date => <li key={date.date}>{date.date}</li>) } */}
                            </>
                        }

                        <button style={{display: 'block', marginTop: '16px'}} className={'btn btn-' + (this.state.joined ? 'success' : 'primary')} onClick={() => this.handleJoinClick()} >
                            {this.state.joined ? 'Joined' : 'Join'}
                        </button>
                    </>
                    :
                    <p>Loading...</p>
                    }
                </div>
            </div>
        );
    }
}

export default EventView;