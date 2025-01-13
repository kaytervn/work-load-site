import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentDate_2 } from "../../types/utils";
import { TOOLS, QR_GENERATOR } from "../../types/pageConfig";
import Sidebar from "../../components/Sidebar";
import Breadcrumb from "../../components/Breadcrumb";
import { QRCodeCanvas } from "qrcode.react";

const QrCodeGenerator = () => {
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const [size, setSize] = useState<number>(200);
  const hiddenCanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = QR_GENERATOR.label;
  }, []);

  const handleDownload = () => {
    const canvas = hiddenCanvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpg");
    link.download = `qrcode_${getCurrentDate_2()}.jpg`;
    link.click();
  };

  return (
    <Sidebar
      activeItem={TOOLS.name}
      renderContent={
        <>
          <Breadcrumb
            parentLabel={TOOLS.label}
            childLabel={QR_GENERATOR.label}
            onClickParent={() => navigate(TOOLS.path)}
          />
          <div
            className={`p-6 rounded-2xl shadow-lg border w-full max-w-2xl mx-auto mt-10 transition-all bg-gray-900 border-gray-700 text-white`}
          >
            <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
              QR Code Generator
            </h1>
            <div className="space-y-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`w-full p-4 border rounded-lg focus:ring-2 focus:outline-none transition-all bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400`}
                rows={3}
                placeholder="Enter text or URL to generate QR code"
              ></textarea>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className={`w-full p-4 border rounded-lg text-center focus:ring-2 focus:outline-none transition-all bg-gray-700 border-gray-600 text-white focus:ring-blue-400`}
                placeholder="Width (min 100px)"
                min={100}
              />
            </div>
            <div
              className={`mt-6 p-4 rounded-lg flex justify-center transition-all bg-gray-50`}
            >
              <QRCodeCanvas value={text} size={size < 100 ? 100 : size} />
            </div>
            <button
              onClick={handleDownload}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-all flex items-center justify-center"
            >
              <i className="ri-download-line"></i>
              <span>Download QR Code</span>
            </button>
            <div ref={hiddenCanvasRef} className="hidden">
              <QRCodeCanvas value={text} size={size < 100 ? 100 : size} />
            </div>
          </div>
        </>
      }
    />
  );
};

export default QrCodeGenerator;
