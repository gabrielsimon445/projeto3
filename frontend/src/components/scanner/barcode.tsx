import React, { useEffect, useRef, useState, useCallback } from "react";
import Quagga from "quagga";

interface BarcodeScannerProps {
  onScanSuccess: (code: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScanSuccess,
  onClose,
}) => {
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
            width: { ideal: 430 },
            height: { ideal: 932 },
            facingMode: "environment",
            advanced: [{ focusMode: "continuous" }],
          },
        },
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader",
            "upc_reader",
            "code_128_reader",
          ],
        },
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
    <div className="m-0 overflow-hidden">
      <div className="relative w-screen h-screen bg-black">
        {/* Área do vídeo (preenche toda a tela) */}
        <div
          id="scanner-camera"
          ref={scannerRef}
          className="absolute top-0 left-0 w-full h-full object-cover md:flex md:flex-col md:items-center"
        />

        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="bg-black/50 w-full h-2/5"/>
          <div className="w-full h-1/5"/>
          <div className="bg-black/50  w-full h-2/5"/>
        </div>

        {/* Camada sobreposta com texto e botões */}
        <div className="absolute inset-0 flex flex-col justify-between text-white p-6 text-center items-center">
          <h3 className="text-2xl font-semibold mb-2">
            Aponte a câmera para o código de barras
          {status && <p className="text-gray-200 text-sm mb-4">{status}</p>}
          </h3>


          {error ? (
            <div className="flex flex-col items-center">
              <p className="text-red-400 mb-2">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setStatus("Inicializando scanner...");
                  initScanner();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-2 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          ) : null}

          <button
            onClick={handleClose}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg mt-4 w-2/3 transition-colors"
            disabled={
              status.includes("Inicializando") ||
              status.includes("Aguardando")
            }
          >
            Fechar Scanner
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
