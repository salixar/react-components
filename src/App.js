import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dropdowns from "./components/Dropdowns/Dropdowns";

function App() {
  return (
    <Router>
      <aside>
        <h3>Quick access</h3>
        <Link to="/dropdowns">Dropdowns</Link>
      </aside>
      <main>
        <Switch>
          <Route exact path="/dropdowns">
            <Dropdowns />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
