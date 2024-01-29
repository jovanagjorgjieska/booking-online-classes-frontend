const StarRatingDisplay = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5;

  const renderStars = () => {
      const stars = [];

      for (let i = 1; i <= 5; i++) {
          if (i <= filledStars) {
              stars.push(<span key={i} className="star-filled">&#9733;</span>);
          } else if (halfStar && i === filledStars + 1) {
              stars.push(<span key={i} className="star-half">&#9733;</span>);
          } else {
              stars.push(<span key={i} className="star-empty-display">&#9733;</span>);
          }
      }

      return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
}
 
export default StarRatingDisplay;