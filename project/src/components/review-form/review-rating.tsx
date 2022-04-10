type ReviewRatingProps = {
  checked: boolean,
  onChange: (value: number) => void;
  value: number,
}

function ReviewRating({value, checked, onChange}: ReviewRatingProps): JSX.Element {

  return (
    <>
      <input
        className="rating__input"
        type="radio"
        name="rating"
        id={`star-${value}`}
        value={value}
        onChange={({target}) => onChange(Number(target.value))}
        checked={checked}
      />
      <label className="rating__label" htmlFor={`star-${value}`}>{`Rating ${value}`}</label>
    </>
  );
}

export default ReviewRating;
