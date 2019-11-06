import React, { Component } from 'react';
import { db } from '../Firebase/firebase';

class EventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    
    }

    async componentDidMount() {
        this.ref = await db.collection('events').doc(this.props.match.params.eventId).get();
        this.setState({
            ...this.ref.data(),
             loading: false
        });
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

                            
                            { this.state.dates && this.state.dates.length > 0 &&
                                <>
                                    <h3>Suggested dates for event</h3>
                                    <ul>
                                        { this.state.dates.map(date => <li key={date.date}>{date.date}</li>) }
                                    </ul>
                                </>
                            }

                            <button className={'btn btn-' + (this.state.joined ? 'success' : 'primary')} onClick={() => this.setState({joined: true})}>
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