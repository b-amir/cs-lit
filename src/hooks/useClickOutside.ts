import { useEffect, type RefObject } from 'react';

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
) {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      handleClickOutside(event);
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);

  return ref;
}

export default useClickOutside;


// --- USAGE: ---  //

// const MyComponent: React.FC = () => {
//   const myRef = useRef(null);

//   const handleClickOutside = () => {
//     console.log('Clicked outside!');
//   };

//   useClickOutside(myRef, handleClickOutside);

//   return (
//     <div ref={myRef}>
//       {/* component content */}
//     </div>
//   );
// };
