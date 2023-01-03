import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import CharacterCard from './components/cards/CharacterCard';
import FourthCard from './components/cards/FourthCard';
import SecondCard from './components/cards/SecondCard';
import ThirdCard from './components/cards/ThirdCard';
import DropArea from './components/DropArea';
import useWindowSize from './hooks/useWindowSize';

function App() {
  const windowSize = useWindowSize();
  const [ref, bounds] = useMeasure();
  const [cardInDropArea, setCardInDropArea] = useState('');
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (!startAnimation) {
      setInterval(() => {
        setStartAnimation(true);
      }, 1000);
    }
  }, [windowSize]);

  return (
    <div className='flex h-screen'>
      {startAnimation && (
        <>
          <DropArea cardInDropArea={cardInDropArea} ref={ref} />
          <CharacterCard
            windowSize={windowSize}
            dropArea={bounds}
            cardInDropArea={cardInDropArea}
            setCardInDropArea={setCardInDropArea}
          />
          <SecondCard
            windowSize={windowSize}
            dropArea={bounds}
            cardInDropArea={cardInDropArea}
            setCardInDropArea={setCardInDropArea}
          />
          <ThirdCard
            windowSize={windowSize}
            dropArea={bounds}
            cardInDropArea={cardInDropArea}
            setCardInDropArea={setCardInDropArea}
          />
          <FourthCard
            windowSize={windowSize}
            dropArea={bounds}
            cardInDropArea={cardInDropArea}
            setCardInDropArea={setCardInDropArea}
          />
        </>
      )}
    </div>
  );
}

export default App;
