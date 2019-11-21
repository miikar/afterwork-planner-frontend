import React, { Component } from "react";
import { db, firebaseApp } from "../Firebase/firebase";
import "./Account.css";
import { AccountNav } from "../components/Navbar/Navbars";

class Account extends Component {
  constructor(props) {
    super(props);
    // this.notifications = db.collection("notifications");
    this.events = db.collection("events");
    this.unsubscribe = null;
    this.state = {
      notifications: [],
      events: [],
      currentUser: null
    };

  }
  
  onEventsUpdate = querySnapshot => {
    const events = [];
    querySnapshot.forEach(doc => {
      const { name, description } = doc.data();
      events.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        description
      });
    });
    
    this.setState({
       events
    });
  };

  onNotifsUpdate = querySnapshot => {
    const notifications = [];
    // querySnapshot.forEach(doc => {
    //   const { name, description } = doc.data();
    //   eventList.push({
    //     key: doc.id,
    //     doc, // DocumentSnapshot
    //     name,
    //     description
    //   });
    // });
    
    this.setState({
       notifications
    });
  };
  
  componentDidMount() {
    const userRef = db.doc(`users/${firebaseApp.auth().currentUser.uid}`);
    userRef.get().then((doc) => {
        this.setState({
          currentUser: {
            id: doc.id,
            ...doc.data()
          }
        })
      }
    )

    // this.listenEvents = this.ref.onSnapshot(this.onCollectionUpdate);
    // this.listenNotifs = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  componentWillUnmount() {
    // this.listenEvents();
    // this.listenNotifs();
  }
  
  render() {
    const { events, currentUser } = this.state;
    return (
      <div>
        { AccountNav({currentUser: this.state.currentUser, })}
      
        <div className="content">
          <div className="notif-list">
            My Notifications
          </div>
          <div className="event-list">
            My Events
            {events.map(item => {
              return (
                <div key={item.key} className="event-list-item">
                  <div className="container">
                    <div className="row">
                      <div className="col">{item.name}</div>
                      <div className="col">{item.description}</div>
                    </div>
                  </div>
                </div>
                );
            })}
          </div>
        </div>
      </div>
    );
  }
}
    
export default Account;
