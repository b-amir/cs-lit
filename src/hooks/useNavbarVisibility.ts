import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useNavbarVisibility = () => {
  const router = useRouter();
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    setNavbarVisible(router.route !== "/");
  }, [router.route]);

  return navbarVisible;
};

export default useNavbarVisibility;