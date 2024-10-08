import React from "react";

export default function ProgressBar({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center my-2">
          <div
            className="progress"
            style={{ width: "50%" }}
            role="progressbar"
            aria-label="Progress"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
