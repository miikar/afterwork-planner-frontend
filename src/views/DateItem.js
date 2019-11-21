import React, { useState, useEffect } from 'react';
import './DateItem.css'
import { db } from '../Firebase/firebase';
import firebase from 'firebase';

function DateItem({ date, threshold, canConfirm, votes, readonly, voted, confirmed, onClickVote, onClickConfirm }) {
    //canConfirm=true

    const [users, setUsers] = useState([])

    useEffect(() => {
        return db.collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', votes)
                    .onSnapshot(querySnapshot => {
                        var usr = []
                        querySnapshot.forEach(doc => {
                            usr.push(doc.data().displayName)
                        })
                        setUsers(usr);
                    });
    }, [votes])

    return (
        <>
        <div className="row no-gutters">
            <div className="col-5">
                {readonly 
                    ? <input type="date" className="form-control" value={date} readOnly/>
                    : <input type="date" className="form-control" value={date}/>
                }
            </div>
            {/* <div className="col-sm-2">
                {readonly 
                    ? <></>
                    : <button className="btn btn-xs btn-danger">X</button>
                }
            </div> */}
            {!(canConfirm && voted)
                ?   <>
                        <div className="col-3 d-flex align-items-center justify-content-center">
                            <span>{votes.length}/{threshold}</span>
                        </div>
                        <div className="col-4 d-flex align-items-center justify-content-center" onClick={onClickVote}>
                            {voted
                                ? <span className="emoji">✅</span>
                                : <span className="emoji">❌</span>
                            }
                        </div>
                    </>
                :   <>
                        {!confirmed
                            ?   <>
                                    <div className="col-5">
                                        <button className="btn btn-primary" onClick={onClickConfirm}>Confirm</button>
                                    </div>
                                    <div className="col-2">
                                        <button className="btn btn-danger" onClick={onClickVote}>Cancel</button>
                                    </div>
                                </>
                            :   <>
                                    <div className="col-5">
                                        <span>CONFIRMED</span>
                                    </div>
                                    {/* <div className="col-2">
                                        <button className="btn btn-danger" onClick={onClickVote}>Cancel</button>
                                    </div> */}
                                </>
                        }
                    </>
            }
        </div>
        {users.map((name, index) => (
        <div key={index} className="row no-gutters">
            <div className="col-12">
                <span>{name}</span>
            </div>
        </div>

        ))}
        </>
    )
}

export default DateItem;