import React, { Component } from 'react';

class EventListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showEvent = () => {
        const path = '/events/' + this.props.item.name;
        this.props.history.push(path);
    }


    render() {
        const { item } = this.props;

        return (
            <div className="event-list-item" onClick={this.props.handleClick}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            {item.name}
                        </div>
                        <div className="col">
                            {item.description}
                        </div>
                    </div>
                    <button className="btn btn-primary">I'm interested</button>
                </div>
            </div>
        );
    }
}

export default EventListItem;