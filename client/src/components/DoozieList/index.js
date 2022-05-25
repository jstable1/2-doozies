import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_DOOZIE, COMPLETE_DOOZIE } from "../../utils/mutations";
import { QUERY_ME} from "../../utils/queries";

const DoozieList = ({ doozies }) => {
  // logic to add a new doozie
  const [doozieText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addDoozie] = useMutation(ADD_DOOZIE, {
    update(cache, { data: { addDoozie } }) {
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, doozies: [...me.doozies, addDoozie] } },
      });
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 180) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoozie({
        variables: { doozieText },
      });

      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  // logic to change doozie status to completed or reverse
  const [completeDoozie] = useMutation(COMPLETE_DOOZIE);
  const handleCheck = async (event) => {
    event.preventDefault();
    // console.log(event.target)
    try {
      await completeDoozie({
        variables: { id: event.target.id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  // display logic
  if (!doozies.length) {
    return (
      <div>
        <h3 className="noTasks">No tasks have been added for today yet!</h3>
        <form className="addDoozieForm" onSubmit={handleFormSubmit}>
          <textarea
            placeholder="Add a task here!"
            value={doozieText}
            className="addNewDoozie"
            onChange={handleChange}
          ></textarea>
          <h4>Character Count: {characterCount}/180</h4>
          <button type="submit" className="btnNewDoozie">Submit Task!</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      {doozies.map((doozie) => (
        <div key={doozie._id} className="today-list">
          <h3>
            <input type="checkbox" className="cbox" id={doozie._id} onChange={handleCheck} checked={doozie.completed ? true : false } />
            <label> {doozie.doozieText}</label>
          </h3>
        </div>
      ))}
      <div>
        <form className="addDoozieForm" onSubmit={handleFormSubmit}>
          <textarea
            placeholder="Add a task here!"
            value={doozieText}
            className="addNewDoozie"
            onChange={handleChange}
          ></textarea>
          <h4>Character Count: {characterCount}/180</h4>
          <button type="submit" className="btnNewDoozie">Submit Task!</button>
        </form>
      </div>
    </div>
  );
};

export default DoozieList;
