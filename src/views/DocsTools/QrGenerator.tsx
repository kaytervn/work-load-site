import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentDate_2 } from "../../types/utils";
import { DOCUMENT_TOOLS, QR_GENERATOR } from "../../types/pageConfig";
import Sidebar from "../../components/Sidebar";
import Breadcrumb from "../../components/Breadcrumb";
import { QRCodeCanvas } from "qrcode.react";

const QrCodeGenerator: React.FC = () => {
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
      activeItem={DOCUMENT_TOOLS.name}
      renderContent={
        <>
          <Breadcrumb
            parentLabel={DOCUMENT_TOOLS.label}
            childLabel={QR_GENERATOR.label}
            onClickParent={() => navigate(DOCUMENT_TOOLS.path)}
          />
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-2xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
              QR Code Generator
            </h1>
            <div className="space-y-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                rows={3}
                placeholder="Enter text or URL to generate QR code"
              ></textarea>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full p-4 border rounded-lg text-center focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Width (min 100px)"
                min={100}
              />
            </div>
            <div className="mt-6 bg-gray-50 p-4 rounded-lg flex justify-center">
              <QRCodeCanvas value={text} size={250} />
            </div>
            <button
              onClick={handleDownload}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center space-x-2"
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
