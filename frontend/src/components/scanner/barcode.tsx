import React, { useEffect, useRef, useState, useCallback } from "react";
import Quagga from "quagga";

interface BarcodeScannerProps {
  onScanSuccess: (code: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Inicializando scanner...");
  const isMounted = useRef(false); // Evita inicialização dupla em Strict Mode
  const scannerRef = useRef<HTMLDivElement | null>(null); // Referência ao elemento DOM

  // Função para inicializar o scanner, memorizada com useCallback
  const initScanner = useCallback(() => {
    try {
      setStatus("Aguardando permissão da câmera...");
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current!, // Elemento onde o vídeo será renderizado
            constraints: {
              facingMode: "environment", // Câmera traseira
              width: { ideal: 1280, min: 640 },
              height: { ideal: 720, min: 480 },
            },
          },
          decoder: {
            readers: [
              "ean_reader", // EAN-13 (comum em produtos como macarrão)
              "ean_8_reader",
              "upc_reader",
              "code_128_reader",
            ],
          },
          locator: {
            patchSize: "medium", // Tamanho do patch para detecção
            halfSample: true, // Melhora performance
          },
          numOfWorkers: 0, // quagga@0.12.1 não suporta Web Workers diretamente
          locate: true, // Tenta localizar o código automaticamente
        },
        (err: any) => {
          if (err) {
            console.error("Erro ao inicializar Quagga:", err);
            setError(
              err.name === "NotAllowedError"
                ? "Permissão da câmera negada. Habilite a câmera nas configurações do navegador."
                : "Falha ao iniciar o scanner. Tente novamente."
            );
            setStatus("");
            return;
          }
          Quagga.start();
          setStatus("Scanner ativo. Aponte para o código de barras.");
        }
      );

      // Registra o callback para detecção
      Quagga.onDetected((result: any) => {
        const code = result.codeResult?.code;
        if (code) {
          setStatus(`Código lido: ${code}`);
          console.log("Código de barras detectado:", code);
          onScanSuccess(code);
          Quagga.stop(); // Para o scanner após leitura
        }
      });
    } catch (err) {
      console.error("Erro ao configurar Quagga:", err);
      setError("Falha ao iniciar o scanner. Verifique as permissões da câmera ou tente novamente.");
      setStatus("");
    }
  }, [onScanSuccess]);

  useEffect(() => {
    if (isMounted.current) return; // Evita dupla inicialização
    isMounted.current = true;

    initScanner();

    // Cleanup
    return () => {
      isMounted.current = false;
      Quagga.offDetected(); // Remove listeners
      Quagga.stop(); // Para o scanner
      console.log("Scanner parado no cleanup");
      if (scannerRef.current) {
        scannerRef.current.innerHTML = ""; // Limpa o container
      }
    };
  }, [initScanner]);

  const handleClose = () => {
    Quagga.offDetected(); // Remove listeners
    Quagga.stop(); // Para o scanner
    console.log("Scanner fechado pelo botão");
    if (scannerRef.current) {
      scannerRef.current.innerHTML = ""; // Limpa o container
    }
    onClose();
  };

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