import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useEffect, useRef, useState } from 'react';
import Card04 from '../../static/cards/04.png';

function FourthCard({ windowSize }) {
  //   const [startPosX, setStartPosX] = useState(20);
  //   const [startPosY, setStartPosY] = useState(
  //     windowSize.height - 288 - windowSize.width / 20
  //   );

  //   useEffect(() => {
  //      setStartPosY(windowSize.height - 288 - windowSize.width / 20);
  //   }, [windowSize]);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const animateIn = useSpring({
    from: { marginBottom: -700, opacity: 0 },
    opacity: 1,
    marginBottom: 0,
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
      className='absolute bottom-5 left-5 w-auto h-32 md:h-52 lg:h-72 rounded-[0.57rem] touch-none'
      {...bindDrag()}
      style={{ ...animateIn, x, y }}
    >
      <img
        src={Card04}
        className='w-full h-full rounded-[0.57rem] shadow-md hover:shadow-lg cursor-grab'
        draggable='false'
      />
    </animated.div>
  );
}

export default FourthCard;
