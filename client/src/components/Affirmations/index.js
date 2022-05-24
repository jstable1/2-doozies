import React from "react";
import affirmationList from "../../assets/data/affirmations";
import { GiRose } from "react-icons/gi";

const Affirmations = () => {
  let currentAffirmation = 0;
  const activeAffirmation = affirmationList[currentAffirmation];

  return (
    <div>
      <p className="affirmation">
        <GiRose /> {activeAffirmation.affirmation} <GiRose />
      </p>
    </div>
  );
};

export default Affirmations;
