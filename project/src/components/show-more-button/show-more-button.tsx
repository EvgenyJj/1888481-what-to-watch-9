import {showMore} from '../../store/action';
import {useAppDispatch} from '../../hooks';

type ShowMoreProps = {
  filmsCount: number,
  showedCardsCount: number,
}

function ShowMore({filmsCount, showedCardsCount}: ShowMoreProps): JSX.Element | null {
  const dispatch = useAppDispatch();

  if (showedCardsCount >= filmsCount) {
    return null;
  }

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => {
        dispatch(showMore());
      }}
      >Show more
      </button>
    </div>
  );
}

export default ShowMore;
