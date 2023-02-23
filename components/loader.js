// Import the PulseLoader component from the react-spinners package
import PulseLoader from "react-spinners/PulseLoader";

// Define a functional component called Loader
export default function Loader() {
  return (
    // A container element that wraps the PulseLoader component
    <div>
      {/* The PulseLoader component with props to set its size, margin, and opacity */}
      <PulseLoader size={12} margin={4} className="opacity-40" />
    </div>
  );
}
