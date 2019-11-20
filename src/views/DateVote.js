import React, { useState, useEffect } from 'react';
import DateItem from './DateItem';
import { db, auth } from '../Firebase/firebase';

function DateVote({ currentUser, eventId }) {

    const [dates, setDates] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('events').doc(eventId).update({
            dates: dates
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        function handleEventUpdate(fetchDates) {
            // Merge local state so that db snapshots don't override pending votes
            console.log(dates)
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
                handleEventUpdate(event.data().dates)
            })
    }, []);

    return(
        <div className="container-fluid">
                {dates.map((date, index) => (
                    <DateItem key={index} {...date} voted={date.votes.includes(currentUser)} readonly={true} onClickVote={() => handleVote(date)} />
                ))}
                {/* <span className="list-group-item">
                    Add New Date
                </span> */}
                <button style={{display: 'block', marginTop: '16px'}} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default DateVote;