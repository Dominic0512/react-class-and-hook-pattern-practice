import React from 'react';

export function useDidUpdateEffect(cb, props) {
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    cb();
  }, props);
}

