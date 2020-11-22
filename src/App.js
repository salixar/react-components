import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Modal from "./components/Modal";

function App() {
  const [Open, setOpen] = useState(false);

  return (
    <Router>
      <aside>
        <h3>Quick access</h3>
      </aside>
      <main className="container">
        <button className="tk-button__container" onClick={() => setOpen(true)}>Show modal</button>
      <Modal open={Open} onClose={() => setOpen(false)} bindTo="portal">
        test
      </Modal>
      <Switch>
        <Route></Route>
      </Switch>
      </main>
    </Router>
  );
}

export default App;
