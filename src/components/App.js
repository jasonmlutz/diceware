import React, { useState, useEffect } from "react";
import { Helmet, HelmetData } from "react-helmet-async";
import { MdContentCopy } from "react-icons/md";

import { words } from "../resources/words";

const helmetData = new HelmetData({});

let wordData = {};
for (let i = 0; i + 1 < words.length; i++) {
  wordData[words[i]] = words[i + 1];
}

const InputField = ({ name, state, setState }) => {
  return (
    <input
      type="text"
      className="px-6 mb-2 mx-auto font-mono text-4xl placeholder-text-2xl w-40 rounded-lg border-transparent appearance-none border border-gray-300 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
      placeholder={name.toUpperCase()}
      value={state[name]}
      onChange={(e) =>
        setState((prevState) => {
          return { ...prevState, [name]: e.target.value };
        })
      }
    />
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
      <li key={i} className="">
        <InputField {...props} />
      </li>
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

  function handleCopy() {
    navigator.clipboard.writeText(passphrase);
    window.alert("passphrase copied to clipboard");
  }

  const buttonClasses =
    "p-1 m-1 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-40";

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Passphrase Generator</title>
      </Helmet>
      <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <img
          src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
          className="absolute h-full w-full object-cover"
          alt="background mountain landscape"
        />
        <div className="absolute z-20 inset-x-4 bottom-4 text-white text-xs pt-5 px-4">
          <p>
            <strong>Warning: </strong>
            This tool is for educational purposes only. Do not use this tool for
            anything related to security, as it does not provide
            cryptographically secure random numbers.
          </p>
        </div>
        <div className="inset-0 bg-black opacity-70 absolute"></div>
        <div className="container mx-auto relative z-10 mt-5 sm:mt-10 md:mt-20">
          <div className="flex flex-col content-center relative z-10">
            <div className="text-2xl text-white uppercase mx-auto mb-3">
              Passphrase Generator
            </div>
            <ul className="flex flex-col flex-nowrap w-full items-center">
              {renderInputFields}
            </ul>
            <div className="flex w-full my-2 sm:my-4 flex-wrap sm:flex-nowrap justify-center">
              <button className={buttonClasses} onClick={randomizeData}>
                randomize
              </button>
              <button
                className={
                  buttonClasses +
                  (!canSubmit()
                    ? " cursor-not-allowed bg-slate-800 hover:bg-slate-900"
                    : "")
                }
                onClick={handleSubmit}
                disabled={!canSubmit()}
              >
                submit
              </button>
              <button className={buttonClasses} onClick={clearFormData}>
                clear
              </button>
            </div>
            {passphrase.length ? (
              <div className="relative mx-auto mt-5 w-4/5 md:w-1/2 text-black rounded-md font-bold mx-auto text-l sm:text-xl font-mono bg-slate-200 p-2 sm:p-4">
                {passphrase}
                <div
                  className="cursor-pointer rounded-full p-2 bg-indigo-500 text-white text-2xl hover:bg-indigo-700 absolute -bottom-2 -right-2 h-10 w-10"
                  onClick={handleCopy}
                >
                  <MdContentCopy />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
