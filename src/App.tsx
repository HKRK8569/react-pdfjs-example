import { useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
function App() {
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const viewPdf = async () => {
      const canvas = pdfCanvasRef.current;
      if (!canvas) return;
      const pdf = await pdfjs.getDocument("sample-local.pdf").promise;
      const page = await pdf.getPage(1);
      const scale = 1.0;
      const viewport = page.getViewport({ scale });
      const context = canvas.getContext("2d");
      if (!context) return;
      const outputScale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";

      const renderContext = {
        canvasContext: context,
        viewport,
      };
      page.render(renderContext);

      // TODO:textLayerなどの追加
    };
    viewPdf();
  }, [pdfCanvasRef]);

  return (
    <div className="mx-auto h-screen w-screen">
      <canvas ref={pdfCanvasRef} />
    </div>
  );
}

export default App;
