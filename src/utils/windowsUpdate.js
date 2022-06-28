import  { useEffect, useState } from 'react';


export default function useWindowDimensions() {

  // стейт для ширины экрана
  const [windowSize, setWindowSize] = useState(1280);
    // Стейт, в котором содержится значение генерируемых карточек
    const [movieCount, setMovieCount] = useState(8);

  const updateWidth = () => {
    setWindowSize(window.innerWidth);
    console.log(window.innerWidth, windowSize);
    if (windowSize > 768) {
      setMovieCount(12);
    } else if (windowSize < 768 && windowSize > 420) {
      setMovieCount(8);
    } else  {
      setMovieCount(5);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  return {
    windowSize, movieCount
  }
}