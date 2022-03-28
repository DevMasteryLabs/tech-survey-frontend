import React from 'react';

const Message = ({ msg }) => {
  return (
    <div className='alert alert-primary alert-dismissible fade show' role='alert'>
      {msg}
    </div>
  );
};

export default Message;
