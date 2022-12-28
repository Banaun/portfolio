import { forwardRef } from 'react';

const DropArea = forwardRef((props, ref) => {
  const { cardInDropArea } = props;

  return (
    <div
      ref={ref}
      className={`absolute flex justify-center items-center h-44 w-32 md:h-64 md:w-48 lg:h-96 lg:w-72 ${
        cardInDropArea
          ? 'border-lime-600 border-4 border-solid'
          : 'border-2 border-dashed'
      } rounded-[0.57rem] left-0 right-0 top-0 bottom-0 m-auto`}
    >
      {!cardInDropArea ? (
        <span className='m-2 text-center text-xs md:text-sm lg:text-md'>
          Place a card in the box!
        </span>
      ) : (
        <></>
      )}
    </div>
  );
});

export default DropArea;
