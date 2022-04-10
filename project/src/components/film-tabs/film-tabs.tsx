import {Film} from '../../types/film';
import {FilmsReviewData} from '../../types/review';
import {ItemTabs} from '../../const';
import {Link} from 'react-router-dom';
import {MouseEvent, useState} from 'react';
import FilmDetailsTab from './details-tab';
import FilmOverviewTab from './overview-tab';
import ReviewsTab from './reviews-tab';

type FilmTabsProps = {
  film: Film,
  reviews: FilmsReviewData[],
};

function FilmTabs({film, reviews}: FilmTabsProps) {
  const [current, setCurrent] = useState<string>(ItemTabs.Overview);

  const tabClickHandler = (evt: MouseEvent<HTMLAnchorElement>, tab: string) => {
    evt.preventDefault();
    setCurrent(tab);
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.keys(ItemTabs).map((tab) => (
            <li key={tab} className={`film-nav__item${tab === current ? ' film-nav__item--active' : ''}`}>
              <Link to="#" className="film-nav__link" onClick={(evt) => tabClickHandler(evt, tab)}>{tab}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {current === ItemTabs.Overview && <FilmOverviewTab film={film} />}
      {current === ItemTabs.Details && <FilmDetailsTab film={film} />}
      {current === ItemTabs.Reviews && <ReviewsTab reviews={reviews} />}
    </>
  );
}

export default FilmTabs;
