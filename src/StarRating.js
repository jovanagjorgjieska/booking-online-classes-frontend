import React, { useState } from 'react';

const StarRating = ({ totalStars, onChange }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (star) => {
    setSelectedStars(star);
    onChange(star);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          style={{
            cursor: 'pointer',
            color: index < selectedStars ? 'gold' : 'gray',
            fontSize: '36px',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;