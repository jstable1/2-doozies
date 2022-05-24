import React from "react";
import affirmationList from "../../assets/data/affirmations";

const Affirmations = () => {
    let currentAffirmation = 0;
    const activeAffirmation = affirmationList[currentAffirmation];

    return (
        <div>
            <p className="affirmation">
                {activeAffirmation.affirmation}
            </p>
        </div>
    );
};

export default Affirmations;