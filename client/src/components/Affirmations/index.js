import {React, useState, useEffect} from "react";
import affirmationList from "../../assets/data/affirmations";
import { GiRose } from "react-icons/gi";
// import Schedule from "react-schedule-job";

// const Affirmations = () => {
//   let [currentAffirmation, setCurrentAffirmation] = useState(false);
//   let [activeAffirmation, setActiveAffirmation] = useState(affirmationList[0]);
  
//   const changeAffirmation = () => {
//     if (currentAffirmation !== false) {
//       setCurrentAffirmation(currentAffirmation++);
//       localStorage.setItem("current", JSON.stringify(currentAffirmation)); setActiveAffirmation(affirmationList[currentAffirmation])
//     }
//   };

//   const jobs = [
//     {
//       fn: changeAffirmation,
//       id: '1',
//       schedule: '* * * * *',
//       // Execute every minute
//       name: 'Change Affirmation'
//     }
//   ];

//   useEffect(() => {
//     async function retrieveCurrent() {
//       let current = await JSON.parse(localStorage.getItem("current"))?JSON.parse(localStorage.getItem("current")):0
//       current = current-1
//       console.log(current)
//       setCurrentAffirmation(current)
//       setActiveAffirmation(affirmationList[currentAffirmation])
//       console.log(currentAffirmation)
//       console.log(activeAffirmation)
//     }
//     retrieveCurrent()
//   }, []
//   );

//   return (
//     <div>
//       <Schedule jobs={jobs} timeZone="local" dashboard={{hidden: true}}/>
//       <p className="affirmation">
//         <GiRose /> {activeAffirmation.affirmation?activeAffirmation.affirmation:""} <GiRose />
//       </p>
//     </div>
//   );
// };

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
