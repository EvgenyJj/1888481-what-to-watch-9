import {useEffect, useState} from 'react';

function UseShowMoreButton<T>(array: T[], maxCardCount: number): [T[], boolean, ()=> void] {
  const [index, setCurrentIndex] = useState<number>(maxCardCount);
  const [isButtonShown, setIsButtonShown] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<T[]>([]);

  const showMore = () => {
    if (index > array.length) {
      setIsButtonShown(false);
      setVisibleItems([...array]);
      return;
    }
    setVisibleItems(array.slice(0, index));
    setIsButtonShown(true);
    setCurrentIndex(index + maxCardCount);
  };

  useEffect(() => {
    showMore();

    return () => setCurrentIndex(maxCardCount);
  },[array]);

  return [visibleItems, isButtonShown, showMore];
}

export default UseShowMoreButton;
