import { useLayoutEffect } from "react";
export default function useDisableScrollOnMount() {
  useLayoutEffect(() => {
    const overflowValue = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowValue;
    };
  }, []);
}
