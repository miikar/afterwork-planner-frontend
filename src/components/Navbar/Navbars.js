import React from 'react';
import { firebaseApp } from '../../Firebase/firebase';

export const BasicHeader = (props) => {
    return (
    <div className="col-md-12 px-0 mb-5">
        <div className="row">
            <header>
                <nav className="navbar fixed-top">
                    <ul className={'nav container d-flex ' + (!props.canGoBack && 'justify-content-center')}>
                    { props && props.canGoBack && 
                        <li className="nav-item active">
                            <a className="text-left" href="/dashboard">Back</a>
                        </li>
                    }
                    <li><h4 className="text-center">Afterwork Planner</h4></li>
                    </ul>
                </nav>
            </header>
        </div>
    </div>
    );
};

export const AuthNav = () => {
    return (
        <div className="col-md-12 px-0">
            <header>
                <nav className="navbar fixed-top">
                    <ul className="nav container d-flex">
                        <li className="nav-item active">
                            <a href="/event/create">New</a>
                        </li>
                        <li className="nav-item">
                            <a href="/">Account</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export const AccountNav = (props) => {
    return (
        <header>
            <nav className="navbar">
            <ul className="nav container d-flex">
                <li className="nav-item">
                    <a href="/dashboard">Done</a>
                </li>
                {!!props.currentUser
                ? <li className="nav-item">{props.currentUser.displayName}</li>
                : <li className="nav-item"></li>}
                <li className="nav-item">
                    <a href="/" onClick={() => firebaseApp.auth().signOut()}>Sign Out</a>
                </li>
            </ul>
            </nav>
        </header>
    );
}