import React from 'react';
import FileUpload from './components/FileUpload';

const App = () => (
  <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      <i className="bi bi-cloud-arrow-up-fill"></i> Tech Survey
    </h4>
    <FileUpload />
  </div>
);

export default App;
