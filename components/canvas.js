import * as React from "react";
import { useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import { Undo as UndoIcon, Trash as TrashIcon } from "lucide-react";

export default function Canvas({ onScribble }) {
  const canvasRef = React.useRef(null);
  const [scribbleExists, setScribbleExists] = useState(false);

  const onChange = async () => {
    const paths = await canvasRef.current.exportPaths();

    setScribbleExists(paths.length > 0);

    if (!scribbleExists) return;

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
      {scribbleExists || (
        <div className="absolute grid w-full h-full place-items-center pointer-events-none opacity-40 text-xl">
          Draw something here!
        </div>
      )}

      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square"
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
