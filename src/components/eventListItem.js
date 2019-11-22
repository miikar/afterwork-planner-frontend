import React, { Component } from 'react';
import './eventListItem.css';

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
                            <span>{item.name}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {!!item.confirmedDate
                                ?   <>
                                        {!item.confirmedStatus
                                            ?   <span className="votes">Date: Confirming, {item.confirmedDate}</span>
                                            :   <span className="votes">Date: {item.confirmedDate}</span>
                                        }
                                    </>
                                : <span className="votes">Date: Voting...</span>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {!!item.confirmedDate && item.confirmedStatus
                                ?   <span className="votes">Confirmed: {item.confirmedVotes.length}/{item.threshold}</span>
                                :   <span className="votes">Interested: {item.interested.length}/{item.threshold}</span>
                            }
                        </div>
                        <div className="col"></div>
                    </div>
                    {/* <button className="btn btn-primary">I'm interested</button> */}
                </div>
            </div>
        );
    }
}

export default EventListItem;