import {RatingName} from '../../const';
import {Film} from '../../types/film';

type FilmOverviewProps = {
  film: Film
}

function FilmOverviewTab({film}: FilmOverviewProps): JSX.Element {

  function NameScoreRating(rating: number): RatingName | null {
    if (rating > 0 && rating < 3) {
      return RatingName.Bad;
    }
    if (rating >= 3 && rating < 5) {
      return RatingName.Normal;
    }
    if (rating >= 5 && rating < 8) {
      return RatingName.Good;
    }
    if (rating >= 8 && rating < 10) {
      return RatingName.VeryGood;
    }
    if (rating === 10) {
      return RatingName.Awesome;
    }
    return null;
  }

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{NameScoreRating(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {film.starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
}

export default FilmOverviewTab;
