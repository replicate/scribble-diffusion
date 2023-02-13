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
    setPrompt("");
    onSubmit(e);
  };

  if (disabled) {
    return;
  }

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">

      <div className="flex mt-8">
        <input
          id="prompt-input"
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt..."
          className={`block w-full flex-grow${
            disabled ? " rounded-md" : " rounded-l-md"
          }`}
          disabled={disabled}
        />

        {disabled || (
          <button
            className="bg-black text-white rounded-r-md text-small inline-block p-3 flex-none"
            type="submit"
          >
            Go
          </button>
        )}
      </div>
    </form>
  );
}
