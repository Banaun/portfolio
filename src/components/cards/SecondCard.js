import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useState, useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';
import Card02 from '../../static/cards/02.png';

function SecondCard({
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
  }, [windowSize]);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const scale = useSpring({
    transform:
      enlarge && windowSize.width > 550
        ? 'scale(4)'
        : enlarge && windowSize.height < 550
        ? 'scale(3)'
        : 'scale(1)',
  });

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(500px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const animateIn = useSpring({
    from: { marginTop: -700, opacity: 0 },
    opacity: 1,
    marginTop: 0,
    config: { mass: 2, tension: 130, friction: 25 },
  });

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my], offset: [ox, oy] }) => {
        if (!cardInDropArea) {
          api.start({
            x: down ? mx : 0,
            y: down ? my : 0,
            immediate: down,
          });
        }
      },
      onDragEnd: ({ movement: [mx, my], offset: [ox, oy] }) => {
        if (!inDropArea) {
          if (
            mx + windowSize.width - 20 >= dropArea.left &&
            mx + windowSize.width - bounds.width - 20 <=
              dropArea.left + dropArea.width
          ) {
            if (
              my + 20 >= dropArea.top &&
              my + bounds.height + 20 <= dropArea.top + dropArea.height
            ) {
              api.start({
                x:
                  dropArea.left -
                  windowSize.width +
                  20 +
                  (dropArea.width + bounds.width) / 2,
                y: dropArea.top - 20 + (dropArea.height - bounds.height) / 2,
              });
              setCardInDropArea('originality');
              setInDropArea(true);

              if (!flipped) {
                setTimeout(() => {
                  setFlipped(true);
                }, 500);

                setTimeout(() => {
                  setEnlarge(true);
                }, 1300);
              }
            }
          }
        }
      },
    }
    // {
    //   drag: {
    //     bounds: {
    //       left: -windowSize.width + bounds.width + 20,
    //       right: 20,
    //       top: -20,
    //       bottom: windowSize.height - bounds.height - 20,
    //     },
    //   },
    // }
  );

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

  // const handleClick = (e) => {
  //   e.preventDefault();

  //   if (inDropArea) {
  //     setEnlarge(false);

  //     setTimeout(() => {
  //       setFlipped(false);
  //     }, 500);

  //     setTimeout(() => {
  //       api.start({
  //         x: 0,
  //         y: 0,
  //       });
  //       setInDropArea(false);
  //     }, 1300);
  //   }
  // };

  return (
    <animated.div
      ref={ref}
      className={`absolute grid top-5 right-5 rounded-[0.57rem] touch-none ${
        inDropArea && 'justify-center items-center z-50'
      }`}
      // onClick={handleClick}
      {...bind()}
      style={{ ...animateIn, x, y }}
    >
      {inDropArea ? (
        <>
          <animated.div
            className={
              'col-start-1 row-start-1 rounded-[0.57rem] touch-none h-'
            }
            style={{ opacity: opacity.to((o) => 1 - o), transform }}
          >
            <img
              src={Card02}
              className='h-32 md:h-52 lg:h-72 rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
              draggable='false'
              alt='originality'
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
              className='flex bg-[url("./static/cards/01-back.png")] bg-contain h-32 md:h-52 lg:h-72 justify-center items-center rounded-[0.57rem] shadow-md hover:shadow-lg touch-none cursor-grab'
              draggable='false'
              style={{ ...scale }}
            >
              <span>hej</span>
            </animated.div>
          </animated.div>
        </>
      ) : (
        <img
          src={Card02}
          className='col-start-1 row-start-1 h-32 md:h-52 lg:h-72 rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
          draggable='false'
          alt='originality'
        />
      )}
    </animated.div>
  );
}

export default SecondCard;
