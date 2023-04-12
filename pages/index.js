import { useEffect, useRef, useState } from "react";
import Canvas from "components/canvas";
import PromptForm from "components/prompt-form";
import Head from "next/head";
import Predictions from "components/predictions";
import Error from "components/error";
import uploadFile from "lib/upload";
import naughtyWords from "naughty-words";
import Script from "next/script";
import seeds from "lib/seeds";
import pkg from "../package.json";
import sleep from "lib/sleep";

const HOST = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export default function Home() {
    const [error, setError] = useState(null);
    const [submissionCount, setSubmissionCount] = useState(0);
    const [predictions, setPredictions] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [scribbleExists, setScribbleExists] = useState(false);
    const [seed] = useState(seeds[Math.floor(Math.random() * seeds.length)]);
    const [initialPrompt] = useState(seed.prompt);
    const [scribble, setScribble] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // track submissions so we can show a spinner while waiting for the next prediction to be created
        setSubmissionCount(submissionCount + 1);

        const prompt = e.target.prompt.value
            .split(/\s+/)
            .map((word) => (naughtyWords.en.includes(word) ? "something" : word))
            .join(" ");

        setError(null);
        setIsProcessing(true);

        const fileUrl = await uploadFile(scribble);

        const body = {
            prompt,
            image: fileUrl,
            structure: "scribble",
        };

        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let prediction = await response.json();

        setPredictions((predictions) => ({
            ...predictions,
            [prediction.id]: prediction,
        }));

        if (response.status !== 201) {
            setError(prediction.detail);
            return;
        }

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
            ) {
            await sleep(500);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();
            setPredictions((predictions) => ({
                ...predictions,
                [prediction.id]: prediction,
            }));
            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
        }

        setIsProcessing(false);
    };

    return (
        <>
            <Head>
                <title>{pkg.appName}</title>
                <meta name="description" content={pkg.appMetaDescription} />
                <meta property="og:title" content={pkg.appName} />
                <meta property="og:description" content={pkg.appMetaDescription} />
                <meta
                    property="og:image"
                    content={`${HOST}/og-b7xwc4g4wrdrtneilxnbngzvti.jpg`}
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>
            <main className="container max-w-[1024px] mx-auto p-5 ">
                <div className="container max-w-[512
px] mx-auto">
                    <hgroup>
                        <h1 className="text-center text-5xl font-bold m-4">
                            {pkg.appName}
                        </h1>
                        <p className="text-center text-xl opacity-60 m-4">
                            {pkg.appSubtitle}
                        </p>
                    </hgroup>

                    <Canvas
                        startingPaths={seed.paths}
                        onScribble={setScribble}
                        scribbleExists={scribbleExists}
                        setScribbleExists={setScribbleExists}
                    />

                    <PromptForm
                        initialPrompt={initialPrompt}
                        onSubmit={handleSubmit}
                        isProcessing={isProcessing}
                        scribbleExists={scribbleExists}
                    />

                    <Error error={error} />
                </div>

                <Predictions
                    predictions={predictions}
                    isProcessing={isProcessing}
                    submissionCount={submissionCount}
                />
            </main>

            <Script src="https://js.upload.io/upload-js-full/v1" />
        </>
    );
}
</main>

<Script src="https://js.upload.io/upload-js-full/v1" />
</>
);
}

const Canvas = ({ startingPaths, onScribble, scribbleExists, setScribbleExists }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [lineWidth, setLineWidth] = useState(2);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw starting paths on the canvas
        startingPaths.forEach((path) => {
            drawPath(context, path);
        });
    }, [startingPaths]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(true);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    };

    const continueDrawing = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const finishDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const scribbleUrl = canvas.toDataURL();
        onScribble(scribbleUrl);
        setScribbleExists(true);
    };

    const drawPath = (context, path) => {
        const { color, width, points } = path;
        context.strokeStyle = color;
        context.lineWidth = width;
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            context.lineTo(point.x, point.y);
        }
        context.stroke();
    };

    const handleColorChange = (event) => {
        setStrokeColor(event.target.value);
    };

    const handleLineWidthChange = (event) => {
        setLineWidth(event.target.value);
    };

    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        contextRef.current = context;
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={continueDrawing}
                onMouseUp={finishDrawing}
            />
            {scribbleExists && (
                <div className="my-4 flex items-center">
                    <label className="mr-4">Pen Color:</label>
                    <input type="color" value={strokeColor} onChange={handleColorChange} />
                    <label className="ml-8 mr-4">Pen Size:</label>
                    <input type="range" min="1" max="20" value={lineWidth} onChange={handleLineWidthChange} />
                </div>
            )}
        </>
    );
};
php
Copy code
</div>
</div>
</main>

<Script src="https://js.upload.io/upload-js-full/v1" />
</>
);
}

const Canvas = ({ startingPaths, onScribble, scribbleExists, setScribbleExists }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [lineWidth, setLineWidth] = useState(2);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
// Draw starting paths on the canvas
        startingPaths.forEach((path) => {
            drawPath(context, path);
        });
    }, [startingPaths]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(true);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    };

    const continueDrawing = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const finishDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const scribbleUrl = canvas.toDataURL();
        onScribble(scribbleUrl);
        setScribbleExists(true);
    };

    const drawPath = (context, path) => {
        const { color, width, points } = path;
        context.strokeStyle = color;
        context.lineWidth = width;
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            context.lineTo(point.x, point.y);
        }
        context.stroke();
    };

    const handleColorChange = (event) => {
        setStrokeColor(event.target.value);
    };

    const handleLineWidthChange = (event) => {
        setLineWidth(event.target.value);
    };

    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        contextRef.current = context;
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={continueDrawing}
                onMouseUp={finishDrawing}
            />
            {scribbleExists && (
                <div className="my-4 flex items-center">
                    <label className="mr-4">Pen Color:</label>
                    <input type="color" value={strokeColor} onChange={handleColorChange} />
                    <label className="ml-8 mr-4">Pen Size:</label>
                    <input type="range" min="1" max="20" value={lineWidth} onChange={handleLineWidthChange} />
                </div>
            )}
        </>
    );
};
<label className="mr-4">Pen Color:</label>
<input type="color" value={strokeColor} onChange={handleColorChange} />
<label className="ml-8 mr-4">Pen Size:</label>
<input type="range" min="1" max="20" value={lineWidth} onChange={handleLineWidthChange} />
</div>
)}

{scribbleExists && (
    <div className="my-4 flex items-center">
        <label className="mr-4">Pen Color:</label>
        <input type="color" value={strokeColor} onChange={handleColorChange} />
        <label className="ml-8 mr-4">Pen Size:</label>
        <input type="range" min="1" max="20" value={lineWidth} onChange={handleLineWidthChange} />
    </div>
)}

{scribble && (
    <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Your Scribble</h3>
        <img className="mb-4" src={scribble} alt="User's Scribble" />
    </div>
)}
</>
);
};

export default function Home() {
    const [error, setError] = useState(null);
    const [submissionCount, setSubmissionCount] = useState(0);
    const [predictions, setPredictions] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [scribbleExists, setScribbleExists] = useState(false);
    const [seed] = useState(seeds[Math.floor(Math.random() * seeds.length)]);
    const [initialPrompt] = useState(seed.prompt);
    const [scribble, setScribble] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // track submissions so we can show a spinner while waiting for the next prediction to be created
        setSubmissionCount(submissionCount + 1);

        const prompt = e.target.prompt.value
            .split(/\s+/)
            .map((word) => (naughtyWords.en.includes(word) ? "something" : word))
            .join(" ");

        setError(null);
        setIsProcessing(true);

        const fileUrl = await uploadFile(scribble);

        const body = {
            prompt,
            image: fileUrl,
            structure: "scribble",
        };

        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let prediction = await response.json();

        setPredictions((predictions) => ({
            ...predictions,
            [prediction.id]: prediction,
        }));

        if (response.status !== 201) {
            setError(prediction.detail);
            return;
        }

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
            ) {
            await sleep(500);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();
            setPredictions((predictions) => ({
                ...predictions,
                [prediction.id]: prediction,
            }));
            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
        }

        setIsProcessing(false);
    };

    return (
        <>
            <Head>
                <title>{pkg.appName}</title>
                <meta name="description" content={pkg.appMetaDescription} />
                <meta property="og:title" content={pkg.appName} />
                <meta property="og:description" content={pkg.appMetaDescription} />
                <meta property="og:image" content={pkg.appMetaImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pkg.appName} />
                <meta name="twitter:description" content={pkg.appMetaDescription} />
                <meta name="twitter:image" content={pkg.appMetaImage} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <h1 className="text-4xl font-bold mb-8">{pkg.appName}</h1>
                    <p className="text-xl mb-8">
                        {pkg.appDescription}
                    </p>
                    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                        <h2 className="text-2xl font-bold mb-8">Seed Scribble</h2>
                        <p className="text-xl mb-8">
                            {initialPrompt}
                        </p>
                        <ScribbleCanvas
                            scribbleExists={scribbleExists}
                            setScribbleExists={setScribbleExists}
                            setScribble={setScribble}
                        />
                        <form onSubmit={handleSubmit}>
                            <div className="my-4 flex items-center">
                                <label className="mr-4">Prompt:</label>
                                <input
                                    type="text"
                                    name="prompt"
                                    className="border border-gray-300 rounded px-2 py-1"
                                    defaultValue={initialPrompt}
                                />
                            </div>
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                        <div className="mt-4">
                            <a></a>
                                className="text-blue-500 hover:text-blue-700"
                                href="https://twitter.com/intent/tweet?text=Check%20out%20this%20cool%20AI-powered%20scribble%20generator%20I%20found%20on%20GitHub:%20https://scribble-generator.vercel.app"
                                target="_blank"
                                rel="noreferrer"
                        {error && (
                            <div className="mt-4 text-red-500">{error}</div>
                        )}
                        {isProcessing && (
                            <div className="mt-4 text-blue-500">
                                Processing... ({submissionCount})
                            </div>
                        )}
                        {Object.values(predictions).map((prediction) => (
                            <Prediction key={prediction.id} prediction={prediction} />
                        ))}
                <title>{pkg.appName}</title>
                <meta name="description" content={pkg.appMetaDescription} />
                <meta property="og:title" content={pkg.appName} />
                <meta property="og:description" content={pkg.appMetaDescription} />
                <meta property="og:image" content={pkg.appMetaImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pkg.appName} />
                <meta name="twitter:description" content={pkg.appMetaDescription} />
                <meta name="twitter:image" content={pkg.appMetaImage} />
                <link rel="icon" href="/favicon.ico" />
