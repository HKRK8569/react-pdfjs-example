import { useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewPdf = async () => {
      const canvas = pdfCanvasRef.current;
      const textLayer = textLayerRef.current;
      const container = containerRef.current;
      if (!canvas || !textLayer || !container) return;
      const pdf = await pdfjs.getDocument("sample-local.pdf").promise;
      const page = await pdf.getPage(1);
      const scale = 1.0;
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      container.style.width = `${viewport.width}px`;
      container.style.height = `${viewport.height}px`;
      const context = canvas.getContext("2d");
      if (!context) return;

      const renderContext = {
        canvasContext: context,
        viewport,
      };
      page.render(renderContext);
    };
    viewPdf();
  }, [pdfCanvasRef]);

  return (
    <div className="h-screen w-screen ">
      <div ref={containerRef} className="relative mx-auto">
        <canvas ref={pdfCanvasRef} />
        <div className="PdfPage__textLayer" ref={textLayerRef} />
      </div>
    </div>
  );
}

export default App;
