import {Review} from '../../types/review';
import {REVIEWS_COL_COUNT} from '../../const';
import FilmReview from '../film-review/film-review';

type ReviewsTabProps = {
  reviews: Review[],
}

function ReviewsTab({reviews}: ReviewsTabProps): JSX.Element {
  const reviewsColOne = reviews.filter((review, index) => (index % REVIEWS_COL_COUNT) === 0);
  const reviewsColTwo= reviews.filter((review, index) => (index % REVIEWS_COL_COUNT) === 1);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsColOne.map((review) => <FilmReview key={review.id} review={review}/>)}
      </div>
      <div className="film-card__reviews-col">
        {reviewsColTwo.map((review) => <FilmReview key={review.id} review={review}/>)}
      </div>
    </div>
  );
}

export default ReviewsTab;

