import React, { useRef, useEffect } from "react";
import Quagga from "quagga";

const Scanner = () => {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
        },
        decoder: {
          readers: ["code_128", "ean_reader", "upc_reader", "qr_code_reader"],
        },
      },
      (err: any) => {
        if (err) {
          console.error("Scanner initialization error:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(handleScan);

    return () => {
      Quagga.offDetected(handleScan);
      Quagga.stop();
    };
  }, []);

  const handleScan = (result: any) => {
    // Process the scanned result here
    console.log(result);
  };

  return <div ref={scannerRef} />;
};

export default Scanner;

// import { useEffect, useRef } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";

// const BarcodeScanner = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const reader = useRef(new BrowserMultiFormatReader());

//   useEffect(() => {
//     if (!videoRef.current) return;
//     reader.current.decodeFromConstraints(
//       {
//         audio: false,
//         video: {
//           facingMode: "environment",
//         },
//       },
//       videoRef.current,
//       (result: any, error: any) => {
//         if (result) console.log({ result });
//         if (error) console.log({ error });
//       }
//     );
//     return () => {
//       reader.current.reset();
//     };
//   }, [videoRef]);

//   return (
//     <video ref={videoRef} width="420" height="340" style={{ width: "100%" }} />
//   );
// };

// export default BarcodeScanner;
