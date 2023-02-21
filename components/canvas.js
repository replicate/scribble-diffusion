// Importing necessary modules
import * as React from "react";
import { useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Undo as UndoIcon, Trash as TrashIcon } from "lucide-react";

// Defining the component named Canvas which takes some props
export default function Canvas({
  startingPaths,
  onScribble,
  scribbleExists,
  setScribbleExists,
}) {

  // Creating a reference to the canvas element
  const canvasRef = React.useRef(null);

  // Use effect hook to load the starting paths when the component mounts
  useEffect(() => {
    loadStartingPaths();
  }, []);

  // Function to load the starting paths
  async function loadStartingPaths() {
    // Wait until the starting paths are loaded
    await canvasRef.current.loadPaths(startingPaths);
    // Set scribble exists to true
    setScribbleExists(true);
    // Call the onChange function
    onChange();
  }

  // Function that is called whenever a change is made in the canvas
  const onChange = async () => {
    // Export the paths as JSON string and store it in local storage
    const paths = await canvasRef.current.exportPaths();
    localStorage.setItem("paths", JSON.stringify(paths, null, 2));

    // If there are no paths, return from the function
    if (!paths.length) return;

    // Set scribble exists to true
    setScribbleExists(true);

    // Export the image as png and pass the data to the onScribble callback
    const data = await canvasRef.current.exportImage("png");
    onScribble(data);
  };

  // Function to undo the last action in the canvas
  const undo = () => {
    canvasRef.current.undo();
  };

  // Function to clear the canvas
  const reset = () => {
    // Set scribble exists to false
    setScribbleExists(false);
    // Reset the canvas
    canvasRef.current.resetCanvas();
  };

  // Return JSX with the canvas, buttons and a placeholder if there is no scribble
  return (
    <div className="relative">
      {scribbleExists || (
        <div>
          <div className="absolute grid w-full h-full p-3 place-items-center pointer-events-none text-xl">
            <span className="opacity-40">Draw something here.</span>
          </div>
        </div>
      )}

      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square border-none cursor-crosshair"
        strokeWidth={4}
        strokeColor="black"
        onChange={onChange}
        withTimestamp={true}
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
