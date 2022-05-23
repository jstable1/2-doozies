import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_DOOZIE, COMPLETE_DOOZIE } from "../../utils/mutations";
import { QUERY_DOOZIES } from "../../utils/queries";

const DoozieList = ({ doozies }) => {
  const [doozieText, setText] = useState("");
  console.log(doozieText)
  const [characterCount, setCharacterCount] = useState(0);

  const [addDoozie] = useMutation(ADD_DOOZIE, {
    update(cache, { data: { addDoozie } }) {

        const { doozies } = cache.readQuery({ query: QUERY_DOOZIES });
        cache.writeQuery({
          query: QUERY_DOOZIES,
          data: { doozies: [addDoozie, ...doozies] },
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

  // const [completed] = useMutation(COMPLETE_DOOZIE);

  // const completedCheck = async event => {
  //     event.preventDefault();

  //     try {
  //         await completed({
  //             variables: { completed },
  //         });

  //     } catch (e) {
  //         console.error(e);
  //     }
  // };

  if (!doozies.length) {
    return <h3>No to-do's have been added for today yet!</h3>;
  }
  return (
    <div>
      {doozies.map((doozie) => (
        <div key={doozie._id} className="today-list">
          <h3>
            <input
              type="checkbox"
              id="cbox"
              // onChange={completedCheck}
            />
            <label for="cbox">{doozie.doozieText}</label>
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
          <p>
            Character Count: {characterCount}/180
          </p>
          <button type="submit">Submit Task!</button>
        </form>
      </div>
    </div>
  );
};

export default DoozieList;
