import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import DropdownWithSearch from "./components/DropdownWithSearch";

export default function Dropdowns() {
  const options = ["This", "That", "Those"];
  const numbers = ["One", "Two", "Three", "Four"];
  const [value, setValue] = useState("");
  const [number, selectNumber] = useState("");

  return (
    <>
      <Dropdown
        options={options}
        placeholder="Выберите из списка"
        onClick={(e) => setValue(e)}
        value={value}
      />
      <DropdownWithSearch
        options={numbers}
        placeholder="Выберите из списка"
        onClick={(e) => selectNumber(e)}
        value={number}
      />
    </>
  );
}
