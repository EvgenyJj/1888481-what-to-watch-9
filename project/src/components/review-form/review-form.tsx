import {ChangeEvent, FormEvent, useState} from 'react';
import {FILM_SCORE, REVIEW_LENGTH_MAX, REVIEW_LENGTH_MIN} from '../../const';
import {postReviewAction} from '../../store/api-actions';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ReviewRating from './review-rating';

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isAffected, setIsAffected] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();

  const id = Number(params.id);

  useEffect(() => {
    const length = review.trim().length;

    if (length < REVIEW_LENGTH_MIN || length > REVIEW_LENGTH_MAX) {
      setIsValid(false);
      return;
    }

    if (rating === 0) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  }, [review, rating, isAffected]);

  const handleTextReviewInput = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(value);
    setIsAffected(true);
  };

  const handleReviewSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }

    dispatch(postReviewAction({
      comment: review,
      id,
      rating,
    }));
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleReviewSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {
            new Array(FILM_SCORE)
              .fill(null)
              .map((elem, index) => (index + 1))
              .reverse()
              .map((value) => (
                <ReviewRating
                  key={value}
                  value={value}
                  checked={value === rating}
                  onChange={() => setRating(value)}
                />
              ))
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={review}
          onChange={handleTextReviewInput}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isValid}>Post</button>
        </div>
      </div>
      {!isValid && isAffected &&
        <p className="form-message">
Give the movie a star rating and leave a review of at least {REVIEW_LENGTH_MIN} and no more than {REVIEW_LENGTH_MAX} characters.
        </p>}
    </form>
  );
}

export default ReviewForm;
