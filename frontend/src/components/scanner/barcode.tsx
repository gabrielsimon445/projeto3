import React, { useEffect, useRef, useState, useCallback } from "react";
import Quagga from "quagga";

interface BarcodeScannerProps {
  onScanSuccess: (code: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Inicializando scanner...");
  const [scannerActive, setScannerActive] = useState(false);
  const scannerRef = useRef<HTMLDivElement | null>(null);

  const initScanner = useCallback(() => {
    if (typeof window === "undefined") {
      setError("O scanner só funciona em navegadores com câmera.");
      setStatus("");
      return;
    }

    if (!scannerRef.current) {
      setError("Erro interno: scanner não inicializado corretamente.");
      setStatus("");
      return;
    }

    setStatus("Aguardando permissão da câmera...");

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: { ideal: 640, min: 320 },
            height: { ideal: 480, min: 240 },
            facingMode: "environment",
            advanced: [{ focusMode: "continuous" }]
          },
        },
        decoder: { readers: ["ean_reader", "ean_8_reader", "upc_reader", "code_128_reader"] },
        locator: { patchSize: "medium", halfSample: true },
        numOfWorkers: 0,
        locate: true,
      },
      (err: any) => {
        if (err) {
          console.error("Erro ao inicializar Quagga:", err);
          setError(
            err.name === "NotAllowedError"
              ? "Permissão da câmera negada."
              : err.message || "Falha ao iniciar o scanner."
          );
          setStatus("");
          return;
        }
        Quagga.start();
        setScannerActive(true);
        setStatus("Scanner ativo. Aponte para o código de barras.");
      }
    );

    Quagga.onDetected((result: any) => {
      const code = result?.codeResult?.code;
      if (!code) return;
      setStatus(`Código lido: ${code}`);
      onScanSuccess(code);
      if (scannerActive) {
        Quagga.stop();
        setScannerActive(false);
      }
    });
  }, [onScanSuccess, scannerActive]);

  const handleClose = () => {
    if (scannerActive) {
      Quagga.offDetected();
      Quagga.stop();
      setScannerActive(false);
    }
    if (scannerRef.current) scannerRef.current.innerHTML = "";
    onClose();
  };

  useEffect(() => {
  if (!scannerRef.current) return;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setError("O scanner não encontrou uma câmera disponível.");
    setStatus("");
    return;
  }

  initScanner();

  return () => {
    if (scannerActive) {
      Quagga.offDetected();
      Quagga.stop();
      setScannerActive(false);
    }
  };
}, [initScanner]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">📷 Aponte a câmera para o código de barras</h3>
      {status && <p className="text-gray-600 mb-2">{status}</p>}
      {error && (
        <div>
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setStatus("Inicializando scanner...");
              initScanner();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-2 hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      )}
      <div
        id="scanner-camera"
        ref={scannerRef}
        style={{ width: "100%", maxWidth: "500px", position: "relative" }}
      />
      <button
        onClick={handleClose}
        className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
        disabled={status.includes("Inicializando") || status.includes("Aguardando")}
      >
        Fechar Scanner
      </button>
    </div>
  );
};

export default BarcodeScanner;