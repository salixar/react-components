import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import DropdownWithSearch from "../DropdownWithSearch";

export default function Dropdowns() {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [value, setValue] = useState("");
  const [site, selectSite] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(setLoading(true))
      .then((response) => response.json())
      .then((data) => {
        const names = data.map((user) => user.name);
        const sites = data.map((site) => site.website);
        setUsers(names);
        setWebsites(sites);
      })
      .finally(setLoading(false));
  }, [isLoading]);

  return (
    <>
      <h1 className="mb-20">Dropdowns</h1>
      <Dropdown
        options={users}
        className="mb-10"
        placeholder={isLoading ? "Loading" : "Select User"}
        onClick={(e) => setValue(e)}
        value={value}
      />
      <DropdownWithSearch
        options={websites}
        placeholder={isLoading ? "Loading" : "Select Website"}
        onClick={(e) => selectSite(e)}
        value={site}
      />
    </>
  );
}
