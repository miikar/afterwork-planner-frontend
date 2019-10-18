import React, { Component } from 'react';

class EventView extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Event</h1>
                <p>Event ID: {this.props.match.params.eventId}</p>
            </div>
        );
    }

}

export default EventView;