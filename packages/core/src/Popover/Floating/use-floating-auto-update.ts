import { useEffect, useState } from "react";
import { autoUpdate } from "@floating-ui/react";
import { useDidUpdate } from "@rtdui/hooks";
import { FloatingPosition } from "../Popover.types";

interface Payload {
  opened: boolean | undefined;
  floating: {
    update: () => void;
    refs: {
      floating: React.MutableRefObject<any>;
      reference: React.MutableRefObject<any>;
    };
  };
  positionDependencies: any[];
  position: FloatingPosition;
}

export function useFloatingAutoUpdate({
  opened,
  floating,
  position,
  positionDependencies,
}: Payload) {
  const [delayedUpdate, setDelayedUpdate] = useState(0);

  useEffect(() => {
    if (floating.refs.reference.current && floating.refs.floating.current) {
      return autoUpdate(
        floating.refs.reference.current,
        floating.refs.floating.current,
        floating.update
      );
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    floating.refs.reference.current,
    floating.refs.floating.current,
    opened,
    delayedUpdate,
    position,
  ]);

  useDidUpdate(() => {
    floating.update();
  }, positionDependencies);

  useDidUpdate(() => {
    setDelayedUpdate((c) => c + 1);
  }, [opened]);
}
