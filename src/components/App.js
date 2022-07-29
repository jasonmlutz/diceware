import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
  });

  let InputField = ({ name }) => {
    return (
      <label>
        {name}
        <input
          type="text"
          className="p-2 m-2 border border-black rounded-md"
          value={formData[name]}
          onChange={(e) =>
            setFormData((prevState) => {
              return { ...prevState, [name]: e.target.value };
            })
          }
        />
      </label>
    );
  };

  const renderInputFields = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
  ].map((name, i) => (
    <div key={i}>
      <InputField name={name} />
    </div>
  ));

  return (
    <div className="container border border-black rounded-md mx-auto m-2 p-2">
      <p className="font-bold">src/App.js</p>
      <div>{renderInputFields}</div>
    </div>
  );
};

export default App;
