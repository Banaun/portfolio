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
  // const [visibleCards, setVisibleCards] = useState();
  // const cards = ['creativity', 'originality', 'fortitude', 'people'];

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
          {/* {visibleCards?.map((card) => {
            if (card === 'creativity') {
              return (
                <FirstCard
                  windowSize={windowSize}
                  dropArea={bounds}
                  setCardInDropArea={setCardInDropArea}
                />
              );
            }
            if (card === 'originality') {
              return <SecondCard windowSize={windowSize} />;
            }
            if (card === 'fortitude') {
              return <ThirdCard windowSize={windowSize} />;
            }
            if (card === 'people') {
              return <FourthCard windowSize={windowSize} />;
            }
          })} */}
        </>
      )}
    </div>
  );
}

export default App;
