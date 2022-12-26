import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useEffect, useState } from 'react';
import Card02 from '../../static/cards/02.png';

function SecondCard({ windowSize }) {
  //   const [startPosX, setStartPosX] = useState(
  //     windowSize.width - 192 - windowSize.width / 20
  //   );
  //   const [startPosY, setStartPosY] = useState(windowSize.width / 20);

  //   useEffect(() => {
  //     setStartPosX(windowSize.width - 192 - windowSize.width / 20);
  //     setStartPosY(windowSize.width / 20);
  //   }, [windowSize]);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const animateIn = useSpring({
    from: { marginTop: -700, opacity: 0 },
    opacity: 1,
    marginTop: 0,
    config: { mass: 2, tension: 130, friction: 25 },
  });

  const bindDrag = useDrag(({ down, movement: [mx, my] }) =>
    api.start({
      x: down ? mx : 0,
      y: down ? my : 0,
      immediate: down,
    })
  );

  return (
    <animated.div
      className='absolute top-5 right-5 w-auto h-32 md:h-52 lg:h-72 rounded-[0.57rem] touch-none'
      {...bindDrag()}
      style={{ ...animateIn, x, y }}
    >
      <img
        src={Card02}
        className='w-full h-full rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
        draggable='false'
      />
    </animated.div>
  );
}

export default SecondCard;
