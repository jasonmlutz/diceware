import React, { useState } from "react";

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

  const renderInputFields = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
  ].map((name, i) => {
    const props = { name, state: formData, setState: setFormData };
    return (
      <div key={i}>
        <InputField {...props} />
      </div>
    );
  });

  return (
    <div className="container border border-black rounded-md mx-auto m-2 p-2">
      <p className="font-bold">src/App.js</p>
      <div>{renderInputFields}</div>
    </div>
  );
};

export default App;
