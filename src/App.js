import React from 'react';
import FileUpload from './components/FileUpload';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';

const App = () => (
  <Wrapper>
    <div className='container mt-4'>
      <h4 className='display-4 text-center mb-4'>
        <i className="bi bi-cloud-arrow-up-fill"></i> Tech Survey
      </h4>
      <FileUpload />
    </div>
    <Footer />
  </Wrapper>
);

export default App;
