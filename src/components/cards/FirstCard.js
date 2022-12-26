import { animated, useSpring } from '@react-spring/web';
import { useDrag, useGesture } from '@use-gesture/react';
import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import Card01 from '../../static/cards/01.png';
import Card01Back from '../../static/cards/01-back.png';

function FirstCard({ windowSize, dropArea, setCardInDropArea }) {
  const [ref, bounds] = useMeasure();
  const [inDropArea, setInDropArea] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

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
        api.start({
          x: ox,
          y: oy,
          immediate: down,
        });
      },
      onDragEnd: ({ offset: [ox, oy] }) => {
        if (
          ox + 20 >= dropArea.left &&
          ox + bounds.width + 20 <= dropArea.left + dropArea.width
        ) {
          if (
            oy + 20 >= dropArea.top &&
            oy + bounds.height + 20 <= dropArea.top + dropArea.height
          ) {
            api.start({
              x: dropArea.left - 20 + (dropArea.width - bounds.width) / 2,
              y: dropArea.top - 20 + (dropArea.height - bounds.height) / 2,
            });
            setCardInDropArea('creativity');
            setInDropArea(true);

            if (!flipped) {
              setInterval(() => {
                setFlipped(true);
              }, 500);
            }
          }
        }
      },
    },
    {
      drag: {
        bounds: {
          left: -20,
          right: windowSize.width - bounds.width - 20,
          top: -20,
          bottom: windowSize.height - bounds.height - 20,
        },
      },
    }
  );

  // const bind = useDrag(
  //   ({ down, movement: [mx, my], offset: [ox, oy] }) =>
  //     // api.start({
  //     //   x: down ? mx : 0,
  //     //   y: down ? my : 0,
  //     //   immediate: down,
  //     // })
  //     if (mx)
  //     api.start({
  //       x: ox,
  //       y: oy,
  //       immediate: down,
  //     }),
  //   {
  //     bounds: {
  //       left: -20,
  //       right: windowSize.width - bounds.width - 20,
  //       top: -20,
  //       bottom: windowSize.height - bounds.height - 20,
  //     },
  //   }
  // );

  return (
    <animated.div
      ref={ref}
      className={`absolute grid top-5 left-5 rounded-[0.57rem] touch-none ${
        inDropArea && 'justify-center items-center'
      }`}
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
              className='h-32 md:h-52 lg:h-72 rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
              draggable='false'
            />
          </animated.div>
          <animated.div
            className={'col-start-1 row-start-1 rounded-[0.57rem] touch-none'}
            style={{ opacity, transform, rotateY: '180deg' }}
          >
            <img
              src={Card01Back}
              className='h-32 md:h-52 lg:h-72 rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
              draggable='false'
            />
          </animated.div>
        </>
      ) : (
        <img
          src={Card01}
          className='col-start-1 row-start-1 h-32 md:h-52 lg:h-72 rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
          draggable='false'
        />
      )}
    </animated.div>
  );
}

export default FirstCard;
