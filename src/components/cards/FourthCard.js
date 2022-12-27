import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import Card04 from '../../static/cards/04.png';

function FourthCard({
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
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  });

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const scale = useSpring({
    transform: enlarge ? 'scale(4)' : 'scale(1)',
  });

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(500px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const animateIn = useSpring({
    from: { marginBottom: -700, opacity: 0 },
    opacity: 1,
    marginBottom: 0,
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
            mx + 20 >= dropArea.left &&
            mx + bounds.width + 20 <= dropArea.left + dropArea.width
          ) {
            if (
              my + windowSize.height - bounds.height - 20 >= dropArea.top &&
              my + windowSize.height - bounds.height - 20 + bounds.height <=
                dropArea.top + dropArea.height
            ) {
              api.start({
                x: dropArea.left - 20 + (dropArea.width - bounds.width) / 2,
                y:
                  dropArea.top -
                  windowSize.height +
                  bounds.height +
                  20 +
                  (dropArea.height - bounds.height) / 2,
              });
              setCardInDropArea('people');
              setInDropArea(true);

              if (!flipped) {
                setTimeout(() => {
                  setFlipped(true);
                }, 500);

                setTimeout(() => {
                  setEnlarge(true);
                  console.log('enlarging');
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
    //       left: -20,
    //       right: windowSize.width - bounds.width - 20,
    //       top: -windowSize.height + bounds.height + 20,
    //       bottom: 20,
    //     },
    //   },
    // }
  );

  const handleClickOutside = (e) => {
    e.preventDefault();

    if (!scaledImageRef.current.contains(e.target)) {
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
    }
  };

  // const handleClick = (e) => {
  //   e.preventDefault();

  //   setClickedOutside(false);

  //   console.log(e.target);
  //   console.log(ref);

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
      className={`absolute grid bottom-5 left-5 rounded-[0.57rem] touch-none ${
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
              src={Card04}
              className='h-32 md:h-52 lg:h-72 rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
              draggable='false'
              alt='people'
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
          src={Card04}
          className='col-start-1 row-start-1 h-32 md:h-52 lg:h-72 rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
          draggable='false'
          alt='people'
        />
      )}
    </animated.div>
  );
}

export default FourthCard;
