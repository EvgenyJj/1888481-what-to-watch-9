import {ChangeEvent, Fragment, useState, FormEvent, useEffect} from 'react';
import {FILM_SCORE, REVIEW_LENGTH_MAX, REVIEW_LENGTH_MIN} from '../../const';
import {postReviewAction} from '../../store/api-actions';
import {State} from '../../types/state';
import {useAppDispatch, useAppSelector} from '../../hooks';

type ReviewFormProps = {
  filmId: number;
}

function ReviewForm({filmId}: ReviewFormProps): JSX.Element {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isAffected, setIsAffected] = useState(false);

  const {isLoading} = useAppSelector((state: State) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const length = review.trim().length;

    if (length < REVIEW_LENGTH_MIN || length > REVIEW_LENGTH_MAX) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  }, [review, isAffected]);

  const inputTextReviewHandle = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(value);
    setIsAffected(true);
  };

  const submitReviewHandle = (evt: FormEvent) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }

    dispatch(postReviewAction({
      comment: review,
      filmId,
      rating,
    }));
  };

  return (
    <form action="#" className="add-review__form" onSubmit={submitReviewHandle}>
      <div className="rating">
        <div className="rating__stars">
          {
            new Array(FILM_SCORE)
              .fill(null)
              .map((elem, index) => (index + 1))
              .reverse()
              .map((value) => (
                <Fragment key={value}>
                  <input className="rating__input"
                    id={`star-${value}`}
                    type="radio"
                    name="rating"
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                  <label
                    className="rating__label"
                    htmlFor={`star-${value}`}
                  >
                    Rating{`star-${value}`}
                  </label>
                </Fragment>
              ))
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={review}
          onChange={inputTextReviewHandle}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isValid || isLoading}>Post</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
