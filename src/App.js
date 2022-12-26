import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import FirstCard from './components/cards/FirstCard';
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
          <DropArea ref={ref} />
          <FirstCard
            windowSize={windowSize}
            dropArea={bounds}
            setCardInDropArea={setCardInDropArea}
          />
          <SecondCard
            windowSize={windowSize}
            dropArea={bounds}
            setCardInDropArea={setCardInDropArea}
          />
          {/* <ThirdCard windowSize={windowSize} />;
          <FourthCard windowSize={windowSize} />; */}
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
