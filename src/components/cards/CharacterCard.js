import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useState, useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';
import Card01 from '../../static/cards/01.png';
import CharacterContent from '../content/CharacterContent';

function CharacterCard({
  windowSize,
  dropArea,
  cardInDropArea,
  setCardInDropArea,
}) {
  const [ref, bounds] = useMeasure();
  const scaledImageRef = useRef();

  const [inDropArea, setInDropArea] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [enlarge, setEnlarge] = useState(false);
  const [scaleAmount, setScaleAmount] = useState('scale(4)');

  useEffect(() => {
    if (inDropArea) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  });

  useEffect(() => {
    if (inDropArea) {
      resetCardPosition();
    }

    switch (bounds.height) {
      case 288:
        if (windowSize.height < 1150 && windowSize.height >= 870) {
          setScaleAmount('scale(3)');
        } else if (windowSize.height < 870) {
          setScaleAmount('scale(2.5)');
        } else {
          setScaleAmount('scale(4)');
        }
        break;
      case 208:
        if (windowSize.height < 840 && windowSize.height >= 630) {
          setScaleAmount('scale(3)');
        } else if (windowSize.height < 630) {
          setScaleAmount('scale(2.5)');
        } else {
          setScaleAmount('scale(4)');
        }
        break;
      case 128:
        if (windowSize.height < 520 && windowSize.height >= 390) {
          setScaleAmount('scale(3)');
        } else if (windowSize.height < 390) {
          setScaleAmount('scale(2.5)');
        } else {
          setScaleAmount('scale(4)');
        }
        break;
      default:
        setScaleAmount('scale(4)');
        break;
    }
  }, [windowSize, bounds.height]);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const scale = useSpring({
    transform: enlarge ? scaleAmount : 'scale(1)',
  });

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(500px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 60 },
  });

  const animateIn = useSpring({
    from: { marginTop: -700, opacity: 0 },
    opacity: 1,
    marginTop: 0,
    config: { mass: 2, tension: 130, friction: 25 },
  });

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my] }) => {
        if (!cardInDropArea) {
          api.start({
            x: down ? mx : 0,
            y: down ? my : 0,
            immediate: down,
          });
        }
      },
      onDragEnd: ({ movement: [mx, my] }) => {
        if (!inDropArea) {
          if (
            mx + 20 >= dropArea.left &&
            mx + bounds.width + 20 <= dropArea.left + dropArea.width
          ) {
            if (
              my + 20 >= dropArea.top &&
              my + bounds.height + 20 <= dropArea.top + dropArea.height
            ) {
              centerCardInDropArea();
            }
          }
        }
      },
    }
    // {
    //   drag: {
    //     bounds: {
    //       left: -20,
    //       right: windowSize.width - bounds.width - 20,
    //       top: -20,
    //       bottom: windowSize.height - bounds.height - 20,
    //     },
    //   },
    // }
  );

  const centerCardInDropArea = () => {
    api.start({
      x: dropArea.left - 20 + (dropArea.width - bounds.width) / 2,
      y: dropArea.top - 20 + (dropArea.height - bounds.height) / 2,
    });
    setInDropArea(true);

    setTimeout(() => {
      setCardInDropArea('creativity');
    }, 500);

    if (!flipped) {
      setTimeout(() => {
        setFlipped(true);
      }, 900);

      setTimeout(() => {
        setEnlarge(true);
      }, 1500);
    }
  };

  const resetCardPosition = () => {
    setEnlarge(false);

    setTimeout(() => {
      setFlipped(false);
    }, 500);

    setTimeout(() => {
      api.start({
        x: 0,
        y: 0,
      });
      setInDropArea(false);
      setCardInDropArea('');
    }, 1300);
  };

  const handleClickOutside = (e) => {
    if (!scaledImageRef.current.contains(e.target)) {
      resetCardPosition();
    }
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();

    if (!inDropArea) {
      centerCardInDropArea();
    }
  };

  return (
    <animated.div
      ref={ref}
      className={`absolute grid top-5 left-5 rounded-[0.57rem] touch-none ${
        inDropArea && 'justify-center items-center z-50'
      }`}
      onDoubleClick={handleDoubleClick}
      {...bind()}
      style={{ ...animateIn, x, y }}
    >
      {inDropArea ? (
        <>
          <animated.div
            className={'col-start-1 row-start-1 rounded-[0.57rem] touch-none'}
            style={{ opacity: opacity.to((o) => 1 - o), transform }}
          >
            <img
              src={Card01}
              className='h-32 md:h-52 lg:h-72 rounded-[0.57rem] cursor-grab'
              draggable='false'
              alt='creativity'
            />
          </animated.div>
          <animated.div
            className={'col-start-1 row-start-1 rounded-[0.57rem] touch-none'}
            style={{
              opacity,
              transform,
              rotateY: '180deg',
            }}
          >
            <animated.div
              ref={scaledImageRef}
              className='flex bg-[url("./static/cards/01-back.png")] bg-contain h-32 md:h-52 lg:h-72 rounded-[0.57rem] touch-none cursor-grab'
              draggable='false'
              style={{ ...scale }}
            >
              <CharacterContent />
            </animated.div>
          </animated.div>
        </>
      ) : (
        <img
          src={Card01}
          className='col-start-1 row-start-1 h-32 md:h-52 lg:h-72 rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
          draggable='false'
          alt='creativity'
        />
      )}
    </animated.div>
  );
}

export default CharacterCard;
