import React from 'react';

const Card = ({ value, description }) => {
  return (
    <div className="card">
      <h2>{value}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
