import React, { useEffect } from 'react';
import { resetReviews, getSpotReviewsTK } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import './Reviews.css';

const SpotReviews = ({ spotId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const reviewsObj = useSelector((state) => {
    return state.reviews.spot;
  });

  // convert to array
  const reviewsArr = Object.values(reviewsObj);

  useEffect(() => {
    dispatch(getSpotReviewsTK(+spotId));
    return () => {
      dispatch(resetReviews());
    };
  }, [dispatch]);

  if (!reviewsArr.length) return null;

  return (
    <>
      {reviewsArr.map((review) => (
        <div>
          <h2>
            {review.User.firstName} {review.User.lastName}
          </h2>
          <p>{new Date(review.createdAt).toString().slice(3, -42)}</p>

          <p>
            {[...Array(review.stars)].map((star) => (
              <i className="fa-solid fa-star"></i>
            ))}
          </p>

          <p>
            <i className="fa fa-light fa-fire" aria-hidden="true"></i>
            <span>{review.review}</span>
            <i className="fa fa-light fa-fire" aria-hidden="true"></i>
          </p>
          <div>
            {review.ReviewImages &&
              review.ReviewImages.map((image) => {
                return <img style={{ height: '50px' }} src={image.url} />;
              })}
          </div>
        </div>
      ))}
    </>
  );
};

export default SpotReviews;
