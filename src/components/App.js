import React, { useState } from "react";

import { words } from "../resources/words";

let wordData = {};
for (let i = 0; i + 1 < words.length; i++) {
  wordData[words[i]] = words[i + 1];
}

const InputField = ({ name, state, setState }) => {
  return (
    <label>
      {name}
      <input
        type="text"
        className="p-2 m-2 border border-black rounded-md"
        value={state[name]}
        onChange={(e) =>
          setState((prevState) => {
            return { ...prevState, [name]: e.target.value };
          })
        }
      />
    </label>
  );
};

const App = () => {
  const [formData, setFormData] = useState({
    first: "12345",
    second: "54321",
    third: "23415",
    fourth: "34153",
    fifth: "22413",
    sixth: "52134",
  });

  const [passphrase, setPassphrase] = useState("");

  const numerals = ["first", "second", "third", "fourth", "fifth", "sixth"];

  const renderInputFields = numerals.map((name, i) => {
    const props = { name, state: formData, setState: setFormData };
    return (
      <div key={i}>
        <InputField {...props} />
      </div>
    );
  });

  const digits = "123456".split("");

  function canSubmit() {
    return Object.values(formData).every((input) => {
      return (
        input.length === 5 &&
        input.split("").every((char) => digits.includes(char))
      );
    });
  }

  function handleSubmit() {
    if (canSubmit()) {
      setPassphrase(generatePassphrase());
    } else {
      setPassphrase("input data not valid");
    }
  }

  function generatePassphrase() {
    let phrase = [];
    for (let n of numerals) {
      let d = formData[n];
      phrase.push(wordData[d]);
    }
    return phrase.join(" ");
  }

  return (
    <div className="container border border-black rounded-md mx-auto m-2 p-2">
      <p className="font-bold">src/App.js</p>
      <div>{renderInputFields}</div>
      <button
        className="font-bold border border-black rounded-md p-2 m-2 hover:bg-slate-200"
        onClick={handleSubmit}
      >
        submit
      </button>
      {passphrase}
    </div>
  );
};

export default App;
