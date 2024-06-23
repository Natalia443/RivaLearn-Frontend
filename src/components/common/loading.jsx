import React from 'react';

const ProgressBar = ({ isLoading }) => (
  <>
    {isLoading && ( 
      <div className="progress my-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}></div>
      </div>
    )}
  </>
);

export default ProgressBar;