import { useEffect, useState } from "react";

export function useReadyState() {
  const [readyState, setReadyState] = useState<boolean | undefined>();
  useEffect(() => {
    function update() {
      setReadyState(document.readyState === "complete");
    }
    update();
  }, []);
  return readyState;
}
