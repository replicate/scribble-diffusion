import * as React from "react";
import { useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Undo as UndoIcon, Trash as TrashIcon } from "lucide-react";

/**
 * Renders a canvas that allows users to draw and provides undo and clear buttons.
 *
 * @param {Array} startingPaths - The paths to load on component mount.
 * @param {Function} onScribble - A function to call with the exported image data whenever the user draws on the canvas.
 * @param {Boolean} scribbleExists - Whether or not there are paths on the canvas.
 * @param {Function} setScribbleExists - A function to call to update whether or not there are paths on the canvas.
 */
export default function Canvas({
  startingPaths,
  onScribble,
  scribbleExists,
  setScribbleExists,
}) {
  // Create a ref to the ReactSketchCanvas component.
  const canvasRef = React.useRef(null);

  // Load starting paths on component mount.
  useEffect(() => {
    loadStartingPaths();
  }, []);

  /**
   * Loads the starting paths on the canvas.
   */
  async function loadStartingPaths() {
    await canvasRef.current.loadPaths(startingPaths);
    setScribbleExists(true);
    onChange();
  }

  /**
   * Called whenever the canvas is updated.
   * Exports the paths as a JSON string and saves them to local storage.
   * Calls the onScribble function with the exported image data.
   */
  const onChange = async () => {
    const paths = await canvasRef.current.exportPaths();
    localStorage.setItem("paths", JSON.stringify(paths, null, 2));

    if (!paths.length) return;

    setScribbleExists(true);

    const data = await canvasRef.current.exportImage("png");
    onScribble(data);
  };

  /**
   * Undoes the last action on the canvas.
   */
  const undo = () => {
    canvasRef.current.undo();
  };

  /**
   * Clears the canvas and updates scribbleExists.
   */
  const reset = () => {
    setScribbleExists(false);
    canvasRef.current.resetCanvas();
  };

  return (
    <div className="relative">
      {/* If there are no paths, show a message prompting the user to draw. */}
      {scribbleExists || (
        <div>
          <div className="absolute grid w-full h-full p-3 place-items-center pointer-events-none text-xl">
            <span className="opacity-40">Draw something here.</span>
          </div>
        </div>
      )}

      {/* Render the ReactSketchCanvas component. */}
      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square border-none cursor-crosshair"
        strokeWidth={4}
        strokeColor="black"
        onChange={onChange}
        withTimestamp={true}
      />

      {/* If there are paths, show undo and clear buttons. */}
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
