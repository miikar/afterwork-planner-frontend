import React, { useState, useEffect } from 'react';
import DateItem from './DateItem';
import { db, auth } from '../Firebase/firebase';
import firebase from 'firebase';

function DateVote({ currentUser, eventId }) {

    const [dates, setDates] = useState([]);
    const [threshold, setThreshold] = useState(Infinity);
    const [confirmedDate, setConfirmed] = useState({date:null, status: false, votes:[]});

    const handleVote = (date) => {
        const index = dates.findIndex((d => d.date === date.date))
        const newDates = [...dates]
        var newVotes = [...newDates[index].votes]

        if (newVotes.includes(currentUser)) {
            newVotes = newVotes.filter(i => i !== currentUser)
        } else {
            newVotes = [...newVotes, currentUser]
        }
        newDates[index] = {...newDates[index], votes: newVotes}

        setDates(newDates)
    }

    const handleConfirm = (date) => {
        setConfirmed({
            ...confirmedDate,
            votes: [...confirmedDate.votes, currentUser]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var c = dates.filter(d => d.votes.length >= threshold)

        if (c.length === 0) {
            // no dates with enough votes
            c = {date:null, status: false, votes:[]}
        } else if (c.map(d => d.date).includes(confirmedDate.date)) {
            // found date(s) with enough votes, already confirming?
            c = confirmedDate
            if (c.votes.length >= threshold) {
                c.status = true
            } else {
                c.status = false
            }
        } else {
            c = c[0]
            // found date(s) with enough votes, but it is not already being confirmed 
            c = {date: c.date, status:false, votes:[]}
        }

        db.collection('events').doc(eventId).update({
            confirmed: c,
            dates: dates
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        function handleSetConfirmed(fetchConfirmedDate) {
            setConfirmed(fetchConfirmedDate || {date:null, status: false, votes:[]})
        }

        function handleDateUpdate(fetchDates) {            
            // Merge local state so that db snapshots don't override pending votes
            var map1 = fetchDates.reduce((a, o) => ({...a, ...{[o.date]: o}}), {}),
                map2 = dates.reduce((a, o) => ({...a, ...{[o.date]: o}}), {});
 
            Object.keys(map1).forEach(k => {
                if (map2[k]) {
                    // Merge dates that exist in both states
                    delete map2[k].date
                    map1[k] = { ...map1[k], ...map2[k], votes: [ ...map1[k].votes, ...map2[k].votes ] };
                } else {
                    // Add missing dates from db
                    map1[k] = { ...map1[k]}
                }
            })

            Object.keys(map2).forEach(k => {
                // Preserve dates in local state
                if (!map1[k]) {
                    map1[k] = { ...map1[k], ...{date: map2[k].date, votes: map2[k].votes} };    
                }
            });

            var sorted = Object.values(map1).sort((a,b) => new Date(a.date) - new Date(b.date));

            setDates(sorted);
        }

        return db.collection('events').doc(eventId)
            .onSnapshot(event => {
                handleDateUpdate(event.data().dates)
                setThreshold(event.data().threshold)
                handleSetConfirmed(event.data().confirmed)
            })
    }, []);

    return(
        <div className="container-fluid">
                {!confirmedDate.status
                    ?   <>
                            {dates.map((date, index) => (
                                <DateItem 
                                    key={index} 
                                    {...date} 
                                    canConfirm={date.date === confirmedDate.date} 
                                    threshold={threshold} 
                                    voted={date.votes.includes(currentUser)} 
                                    confirmed={confirmedDate.votes.includes(currentUser)} 
                                    readonly={true} onClickVote={() => handleVote(date)} 
                                    onClickConfirm={() => handleConfirm(date)}/>
                            ))}
                            {/* <span className="list-group-item">
                                Add New Date
                            </span> */}
                        </>
                    :   <DateItem 
                            {...confirmedDate}
                            canConfirm={true} 
                            threshold={threshold} 
                            voted={confirmedDate.votes.includes(currentUser)} 
                            confirmed={confirmedDate.votes.includes(currentUser)} 
                            readonly={true} 
                            onClickVote={() => handleVote(confirmedDate)} 
                            onClickConfirm={() => handleConfirm(confirmedDate)}/>
                }

                <button style={{display: 'block', marginTop: '16px'}} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default DateVote;