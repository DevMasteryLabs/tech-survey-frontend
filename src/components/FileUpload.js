import React, { Fragment, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Message from './Message';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const inputFileRef = useRef();

  const handleChange = e => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('description', description);

    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/technologies`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { msg, technology } = res.data;
      console.log(technology);
      setLoading(false);
      setMessage(msg);
      setFile(null);
      setEmail('');
      setName('');
      setDescription('');

      setTimeout(() => {
        setMessage('');
      }, 5000);

    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.message);
      }
      setLoading(false);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  return (
    <Fragment>
      {message && <Message msg={message} />}
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Email:</label>
          <input 
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)} 
            className='form-control border border-dark' 
            id='email' 
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>Technology Name:</label>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className='form-control border border-dark' 
            id='name' 
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>Technology Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className='form-control border border-dark' 
            id='description'
            rows="3" 
          ></textarea>
        </div>
          <div className='mb-3'>
            <label htmlFor='image' className='form-label'>Technology Image:</label>
            <input 
              className='d-none' 
              ref={inputFileRef} 
              id='image' 
              type='file' 
              accept='image/*' 
              onChange={handleChange} 
            />
            <Button 
              onClick={() => inputFileRef.current.click()} 
              className='w-100' 
              variant='outline-dark'
            >
              Browse.. ({file ? file.name : 'Choose File'})
            </Button>
          </div>
          <Button 
            variant="primary" 
            type='submit' 
            className='w-100 mt-4 d-flex justify-content-center align-items-center gap-1'
            disabled={loading}
          >
            {
              loading 
                ? (
                  <Fragment>
                    <span className='loader'></span> Loading
                  </Fragment>
                ) 
                : 'Save'
            }
          </Button>
      </form>
        {file && (
          <figure className="figure mt-5 mx-auto d-block text-center">
            <img 
              src={URL.createObjectURL(file)} 
              className="figure-img img-fluid rounded" 
              alt={file.name} 
            />
            <figcaption className="figure-caption">{file.name}</figcaption>
          </figure>
        )}
    </Fragment>
  );
};

export default FileUpload;
