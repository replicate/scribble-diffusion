/**
 * The Footer component displays an error message if one is provided
 *
 * @param {Object} props - The props object containing the `error` prop
 * @returns {JSX.Element|null} The rendered component, or null if no error is provided
 */
export default function Footer({ error }) {
  // If no error is provided, do not render anything
  if (!error) {
    return null;
  }

  // Otherwise, display the error message within a container div
  return (
    <div className="mx-auto w-full">
      {error && (
        <p className="font-bold text-red-500 pb-5">{error}</p>
      )}
    </div>
  );
}
