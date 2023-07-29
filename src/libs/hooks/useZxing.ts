import {
  BrowserMultiFormatReader,
  DecodeHintType,
  Result,
} from "@zxing/library";
import { useEffect, useMemo, useRef } from "react";

interface ZxingOptions {
  hints?: Map<DecodeHintType, any>;
  constraints?: MediaStreamConstraints;
  timeBetweenDecodingAttempts?: number;
  onResult?: (result: Result) => void;
  onError?: (error: Error) => void;
}

const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: "environment",
    },
  },
  hints,
  timeBetweenDecodingAttempts = 300,
  onResult = () => {},
  onError = () => {},
}: ZxingOptions = {}) => {
  const ref = useRef<HTMLVideoElement>(null);

  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!ref.current) return;
    reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
      if (result) onResult(result);
      if (error) onError(error);
    });
    return () => {
      reader.reset();
    };
  }, [ref, reader]);

  return { ref };
};
