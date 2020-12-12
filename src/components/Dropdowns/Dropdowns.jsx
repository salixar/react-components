import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import DropdownWithSearch from "../DropdownWithSearch";

export default function Dropdowns() {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [value, setValue] = useState("");
  const [site, selectSite] = useState("");

  const loadData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(setLoading(true))
      .then((response) => response.json())
      .then((data) => {
        const names = data
          .map((user) => user.name)
          .sort((a, b) =>
            a.toLowerCase() > b.toLowerCase()
              ? 1
              : a.toLowerCase() < b.toLowerCase()
              ? -1
              : 0
          );
        const sites = data
          .map((site) => site.website)
          .sort((a, b) =>
            a.toLowerCase() > b.toLowerCase()
              ? 1
              : a.toLowerCase() < b.toLowerCase()
              ? -1
              : 0
          );
        setUsers(names);
        setWebsites(sites);
      })
      .finally(setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [isLoading]);

  return (
    <>
      <h1 className="mb-20">Dropdowns</h1>
      <section className="tk-grid-section">
        <div>
          <h4 className="mb-10">Simple dropdown</h4>
          <Dropdown
            options={users}
            className="mb-10"
            placeholder={isLoading ? "Loading" : "Select User"}
            onClick={(e) => setValue(e)}
            value={value}
          />
        </div>
        <div>
          <h4 className="mb-10">Dropdown with search</h4>
          <DropdownWithSearch
            options={websites}
            placeholder={isLoading ? "Loading" : "Select Website"}
            onClick={(e) => selectSite(e)}
            value={site}
          />
        </div>
        <div>
          <h4 className="mb-10">Dropdown with multiselect</h4>
          <Dropdown
            options={users}
            className="mb-10"
            placeholder={isLoading ? "Loading" : "Select User"}
            onClick={(e) => setValue(e)}
            value={value}
          />
        </div>
      </section>
    </>
  );
}
