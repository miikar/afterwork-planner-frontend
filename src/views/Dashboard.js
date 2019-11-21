import React, { Component } from 'react';
import { db } from '../Firebase/firebase';
import './Dashboard.css'
import EventListItem from '../components/eventListItem';
import { AuthNav } from '../components/Navbar/Navbars';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.ref = db.collection("events");
    this.unsubscribe = null;
    this.state = {
      eventList: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const eventList = [];
    querySnapshot.forEach(doc => {
      const { name, description } = doc.data();
      eventList.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        description
      });
    });

    this.setState({
      eventList
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

    render() {
        const { eventList } = this.state;
        return (
            <>
                { AuthNav() }
    
                <div className="content">
                    <h1 id="dashboard-title">Upcoming events</h1>
                    <div className="event-list">
                        {eventList.map((item) => {
                            return <EventListItem key={item.key} item={item} handleClick={() => this.props.history.push(`/events/${item.key}`)} />;
                        })}
                    </div>
                </div>
            </>
        );
    }
  
}

export default Dashboard;
