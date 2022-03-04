import {ChangeEvent, Fragment, useState} from 'react';

const FILM_SCORE = 10;

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars"
          onChange={({target: {value}}: ChangeEvent<HTMLInputElement>) => setRating(parseInt(value, 10))}
        >
          {
            new Array(FILM_SCORE)
              .fill(null)
              .map((value, index) => (index + 1))
              .reverse()
              .map((value) => (
                <Fragment key={value}>
                  <input className="rating__input"
                    id={`star-${value}`}
                    type="radio"
                    name="rating"
                    value={value}
                    checked={rating === value}
                  />
                  <label className="rating__label" htmlFor={`star-${value}`}>Rating {`star-${value}`}</label>
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
          onChange={({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => setReview(value)}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;