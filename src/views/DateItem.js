import React from 'react';

function DateItem({ date, votes, readonly, voted, onClickVote }) {
    return (
        <div className="row">
            <div className="col-8">
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
            <div className="col-4 border" onClick={onClickVote}>
                <span className="badge badge-primary badge-pill">{votes.length}</span>
                {voted
                    ? <span style={{textAlign: 'center'}}>✅</span>
                    : <></>
                }
            </div>
        </div>
    )
}

export default DateItem;