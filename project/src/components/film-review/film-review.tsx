import {FilmsReviewData} from '../../types/review';
import dayjs from 'dayjs';

type FilmReviewProps = {
  review: FilmsReviewData
}

function FilmReview({review}: FilmReviewProps) {
  const attributeDate = dayjs(review.date).format('YYYY_MM_DD');
  const displayDate = dayjs(review.date).format('MMMM DD, YYYY');

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={attributeDate}>{displayDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>

  );
}

export default FilmReview;
