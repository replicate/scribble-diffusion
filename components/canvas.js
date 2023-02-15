import * as React from "react";
import { useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import { Undo as UndoIcon, Trash as TrashIcon } from "lucide-react";

export default function Canvas({
  onScribble,
  scribbleExists,
  setScribbleExists,
}) {
  const canvasRef = React.useRef(null);
  const [hasScribbledBefore, setHasScribbledBefore] = useState(false);

  const onChange = async () => {
    const paths = await canvasRef.current.exportPaths();

    setScribbleExists(paths.length > 0);

    if (!scribbleExists) return;

    setHasScribbledBefore(true);

    const data = await canvasRef.current.exportImage("png");
    onScribble(data);
  };

  const undo = () => {
    canvasRef.current.undo();
  };

  const reset = () => {
    setScribbleExists(false);
    canvasRef.current.resetCanvas();
  };

  // const paths = await canvasRef.current.exportPaths();

  return (
    <div className="relative">
      {scribbleExists || hasScribbledBefore || (
        <div>
          <div className="absolute grid w-full h-full p-3 place-items-center pointer-events-none text-xl">
            <span className="opacity-40">Draw something here.</span>
            <video autoPlay loop muted playsInline>
              <source src="/happy-monster.mp4" />
            </video>
          </div>
        </div>
      )}

      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square border-none"
        strokeWidth={4}
        strokeColor="black"
        onChange={onChange}
      />

      {scribbleExists && (
        <div className="animate-in fade-in duration-700 text-left">
          <button className="lil-button" onClick={undo}>
            <UndoIcon className="icon" />
            Undo
          </button>
          <button className="lil-button" onClick={reset}>
            <TrashIcon className="icon" />
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
