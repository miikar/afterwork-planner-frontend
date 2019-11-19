import React, { useState, useEffect } from 'react';
import DateItem from './DateItem';

const INIT_STATE = {
    dates: [
        {
            date: "2019-11-06",
            votes: [],
            readonly: true
        }, {
            date: "2019-11-07",
            votes: [],
            readonly: true
        }
    ],
}

function DateVote({ currentUser, eventId }) {

    const [state, setDates] = useState(INIT_STATE)

    const handleVote = (date) => {
        const index = state.dates.findIndex((d => d.date === date.date))
        const newDates = [...state.dates]
        var newVotes = [...newDates[index].votes]

        if (newVotes.includes(currentUser)) {
            newVotes = newVotes.filter(i => i !== currentUser)
        } else {
            newVotes = [...newVotes, currentUser]
        }
        newDates[index] = {...newDates[index], votes: newVotes}

        setDates({
            dates: newDates
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // useEffect(() => {
    //     function handleAddDate() {
    //         setDates({
    //             dates: [...dates, {date: null, votes: 0}]
    //         })
    //     }
    // }, [])

    return(
        <div className="container-fluid">
                {state.dates.map(date => (
                    <DateItem key={date.key} {...date} voted={date.votes.includes(currentUser)} onClickVote={() => handleVote(date)} />
                ))}
                {/* <span className="list-group-item">
                    Add New Date
                </span> */}
                <button style={{display: 'block', marginTop: '16px'}} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default DateVote;