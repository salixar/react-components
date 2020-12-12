import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "../Modal";

export default function Modals() {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {}, []);
  return (
    <>
      <button className="tk-button__container" onClick={() => setOpen(true)}>
        test
      </button>
      <Modal open={open} onClose={() => setOpen(false)} bindTo="portal">
        <div onLoadStart={() => console.log("started loading")}>
          {isLoading && (
            <div className="loader-container">
              <div className="loader" />
            </div>
          )}
          <div
            className="loader-container mt-15"
            style={{ display: isLoading ? "none" : "block" }}
          >
            <img
              src="https://media.giphy.com/media/5kq0GCjHA8Rwc/giphy.gif"
              alt="You Just Got Rickrolled"
              style={{
                width: "100%",
                animation: `${isLoading ? "hide" : "show"} 0.7s`,
                borderRadius: "4px",
              }}
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
