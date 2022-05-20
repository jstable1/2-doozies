import React from 'react';

const DoozieList = ({ doozies }) => {
    console.log(doozies)
    if (!doozies.length) {
        console.log("why did this hit")
        return <h3>No to-do's have been added for today yet!</h3>
    }
console.log(doozies)
    return (
        <div>
            {doozies.map(doozie => (
                <div key={doozie._id} className="today-list">
                        <h3>{doozie.title}</h3>
                        <p>{doozie.description}</p>
                    </div>
                ))}
        </div>
    );
};

export default DoozieList;