import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Dropdowns from "./components/Dropdowns/Dropdowns";
import Modals from "./components/Modals/Modals";
import PaginationPage from "./components/Pagination/PaginationPage";

function App() {
  return (
    <Router>
      <aside>
        <h3 className="mb-20">Quick access</h3>
        <ul>
          <li>
            <NavLink className="tk-link mb-10" exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="tk-link mb-10" to="/dropdowns">
              Dropdowns
            </NavLink>
          </li>
          <li>
            <NavLink className="tk-link mb-10" to="/modal">
              Modal
            </NavLink>
          </li>
          <li>
            <NavLink className="tk-link" to="/pagination">
              Pagination
            </NavLink>
          </li>
        </ul>
      </aside>
      <main>
        <Switch>
          <Route exact path="/dropdowns">
            <Dropdowns />
          </Route>
          <Route exact path="/modal">
            <Modals />
          </Route>
          <Route exact path="/pagination">
            <PaginationPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
