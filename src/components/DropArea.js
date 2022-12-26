import { forwardRef } from 'react';

const DropArea = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className='absolute flex justify-center items-center h-44 w-36 md:h-60 md:w-40 lg:h-96 lg:w-72 border-dashed border rounded-[0.57rem] left-0 right-0 top-0 bottom-0 m-auto'
    >
      <span className='text-xs md:text-sm lg: text-md'>
        Place a card in the box!
      </span>
    </div>
  );
});

export default DropArea;
