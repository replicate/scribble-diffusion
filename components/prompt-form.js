import { useEffect, useState } from "react";

export default function PromptForm({
  initialPrompt,
  onSubmit,
  disabled = false,
}) {
  const [prompt, setPrompt] = useState(initialPrompt);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
      <div className="flex mt-4">
        <input
          id="prompt-input"
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="block w-full flex-grow rounded-l-md"
        />

        <button
          className={`bg-black text-white rounded-r-md text-small inline-block p-3 flex-none ${
            disabled ? "opacity-20 cursor-not-allowed	" : ""
          }`}
          type="submit"
          disabled={disabled}
        >
          Go
        </button>
      </div>
    </form>
  );
}
