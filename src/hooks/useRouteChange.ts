import { useEffect } from 'react';
import { useRouter } from 'next/router';

function useRouteChange(action: () => void) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      action();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange); // Unsubscribe from route change events when the component unmounts
    };
  }, [action, router]);
}

export default useRouteChange;