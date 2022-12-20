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
      className="px-6 mb-2 font-mono text-4xl w-40 rounded-lg border-transparent appearance-none border border-gray-300 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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

const numerals = ["first", "second", "third", "fourth", "fifth", "sixth"];

function generatePassphrase(data) {
  let phrase = [];
  for (let n of numerals) {
    let d = data[n];
    phrase.push(wordData[d]);
  }
  return phrase.join(" ");
}

function getRandom(n = 6) {
  return Math.floor(Math.random() * n) + 1;
}

function randomizeData() {
  function generateRandomRoll() {
    let output = [];
    while (output.length < 5) output.push(getRandom());
    return output.join("");
  }

  return {
    first: generateRandomRoll(),
    second: generateRandomRoll(),
    third: generateRandomRoll(),
    fourth: generateRandomRoll(),
    fifth: generateRandomRoll(),
    sixth: generateRandomRoll(),
  };
}

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
  const [showDisclaimers, setShowDisclaimers] = useState(false);

  useEffect(() => {
    const data = randomizeData();
    setFormData(data);
    setPassphrase(generatePassphrase(data));
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

  const copyButton = (
    <div
      className="cursor-pointer rounded-full p-2 bg-indigo-500 text-white text-2xl hover:bg-indigo-700 transition ease-in duration-200 absolute -bottom-2 -right-2 h-10 w-10"
      onClick={handleCopy}
      onMouseEnter={() => {
        console.log("mouse entered");
      }}
      onMouseLeave={() => {
        console.log("mouse left");
      }}
    >
      <MdContentCopy />
    </div>
  );

  async function handleCopy() {
    await navigator.clipboard.writeText(passphrase);
  }

  const buttonClasses =
    "p-1 m-1 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-40";

  const renderDisclaimers = function () {
    if (showDisclaimers) {
      return (
        <div>
          <div className="z-30 absolute inset-0 bg-black opacity-50"></div>
          <div className="text-xs sm:text-sm absolute z-40 inset-0 shadow-lg border rounded-2xl p-4 bg-gray-800 w-4/5 sm:w-1/2 md:w-2/5 h-[300px] m-auto">
            <div className="w-full h-full text-center">
              <ul className="flex h-full flex-col justify-between items-center text-white">
                <li>
                  This tool is for educational purposes only. Do not use this
                  tool for anything related to security, as it does not provide
                  cryptographically secure random numbers.{" "}
                  <a
                    className="cursor-pointer text-blue-500 underline hover:text-white"
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#:~:text=does%20not%20provide%20cryptographically%20secure%20random%20numbers"
                  >
                    Learn more.
                  </a>
                </li>
                <li>
                  Diceware™ is a trademark of{" "}
                  <a
                    className="cursor-pointer text-blue-500 underline hover:text-white"
                    href="https://theworld.com/~reinhold/diceware.html"
                  >
                    A G Reinhold
                  </a>
                  .
                </li>
                <li>
                  Word list provided by the{" "}
                  <a
                    className="cursor-pointer text-blue-500 underline hover:text-white"
                    href="https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases"
                  >
                    Electronic Frontier Foundation
                  </a>
                  .
                </li>
                <button
                  className={buttonClasses}
                  onClick={() => setShowDisclaimers(!showDisclaimers)}
                >
                  close
                </button>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

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
        <div className="inset-0 bg-black opacity-70 absolute"></div>
        {renderDisclaimers()}
        <div className="container mx-auto relative z-10 mt-5 sm:mt-10 md:mt-20">
          <div className="flex flex-col items-center relative z-10">
            <div className="text-2xl text-white uppercase">
              Passphrase Generator
            </div>
            <div className="text-white mb-3">Inspired by Diceware™</div>
            <ul className="flex flex-col flex-nowrap w-full items-center">
              {renderInputFields}
            </ul>
            <div className="flex w-full mb-2 sm:mb-4 flex-wrap sm:flex-nowrap justify-center">
              <button
                className={buttonClasses}
                onClick={() => {
                  const data = randomizeData();
                  setFormData(data);
                  setPassphrase(generatePassphrase(data));
                }}
              >
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
              <div className="relative mb-2 w-4/5 md:w-1/2 text-black rounded-md font-bold text-l sm:text-xl font-mono bg-slate-200 p-2 sm:p-4">
                {passphrase}
                {copyButton}
              </div>
            ) : null}
            <button
              className={buttonClasses + " mt-3"}
              onClick={() => setShowDisclaimers(true)}
            >
              show disclaimers
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
