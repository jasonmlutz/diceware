import React, { useState, useEffect } from "react";

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
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
  });

  const [passphrase, setPassphrase] = useState("");

  useEffect(() => {
    randomizeData();
  }, []);

  function clearFormData() {
    setFormData({
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
      sixth: "",
    });
    setPassphrase("");
  }

  function getRandom(n = 6) {
    return Math.floor(Math.random() * n) + 1;
  }

  function generateRandomRoll() {
    let output = [];
    while (output.length < 5) output.push(getRandom());
    return output.join("");
  }

  function randomizeData() {
    const data = {
      first: generateRandomRoll(),
      second: generateRandomRoll(),
      third: generateRandomRoll(),
      fourth: generateRandomRoll(),
      fifth: generateRandomRoll(),
      sixth: generateRandomRoll(),
    };
    setFormData(data);
    setPassphrase(generatePassphrase(data));
  }

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

  function generatePassphrase(data = formData) {
    let phrase = [];
    for (let n of numerals) {
      let d = data[n];
      phrase.push(wordData[d]);
    }
    return phrase.join(" ");
  }

  return (
    <div className="container border border-black rounded-md mx-auto m-2 p-2">
      <p className="font-bold">src/App.js</p>
      <div>{renderInputFields}</div>
      <div>
        <button
          className="font-bold border border-black rounded-md p-2 m-2 hover:bg-slate-200"
          onClick={randomizeData}
        >
          randomize
        </button>
        <button
          className="font-bold border border-black rounded-md p-2 m-2 hover:bg-slate-200"
          onClick={handleSubmit}
        >
          submit
        </button>
        <button
          className="font-bold border border-black rounded-md p-2 m-2 hover:bg-slate-200"
          onClick={clearFormData}
        >
          clear
        </button>
      </div>
      {passphrase}
    </div>
  );
};

export default App;
