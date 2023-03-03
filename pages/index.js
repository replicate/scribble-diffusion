import Canvas from "components/canvas";
import PromptForm from "components/prompt-form";
import Head from "next/head";
import { useState } from "react";
import Predictions from "components/predictions";
import Error from "components/error";
import uploadFile from "lib/upload";
import naughtyWords from "naughty-words";
import Script from "next/script";
import seeds from "lib/seeds";
import pkg from "../package.json";
import sleep from "lib/sleep";
import { waitUntilSymbol } from "next/dist/server/web/spec-extension/fetch-event";

const HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function Home() {
  const [error, setError] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [predictions, setPredictions] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [scribbleExists, setScribbleExists] = useState(false);
  const [photoMode, setPhotoMode] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
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

    let imageContents = '';
    if(photoMode) {
      let dataurl = document.querySelector("#dataurl");
      imageContents = dataurl.value;
    }else{
      imageContents = scribble
    }
    const fileUrl = await uploadFile(imageContents);

    const body = {
      prompt,
      image: fileUrl,
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
  
function treshold(canvas, level) {
  const pixels = _toPixels(canvas);

  if (level === undefined) {
    level = 0.5;
  }
  const thresh = Math.floor(level * 255);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let val;
    if (gray >= thresh) {
      val = 255;
    } else {
      val = 0;
    }
    pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
  }
};
function _toPixels (canvas) {
  if (canvas instanceof ImageData) {
    return canvas.data;
  } else {
    if (canvas.getContext('2d')) {
      return canvas
        .getContext('2d')
        .getImageData(0, 0, canvas.width, canvas.height).data;
    } else if (canvas.getContext('webgl')) {
      const gl = canvas.getContext('webgl');
      const len = gl.drawingBufferWidth * gl.drawingBufferHeight * 4;
      const data = new Uint8Array(len);
      gl.readPixels(
        0,
        0,
        canvas.width,
        canvas.height,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        data
      );
      return data;
    }
  }
};

  const takePicture = async() => {
    setPhotoTaken(true);
    let click_button = document.querySelector("#click-photo");
    let dataurl = document.querySelector("#dataurl");
    let contrastcanvas = document.querySelector("#contrastcanvas");
    let dataurl_container = document.querySelector("#dataurl-container");
    
    console.log('take pic');
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // start transform
    var ctxOrig = canvas.getContext("2d");
    var ctxOrigcontrasted = contrastcanvas.getContext("2d");
    var origBits = ctxOrig.getImageData(0, 0,canvas.width, canvas.height);
    //treshold(origBits, 0.77);
    ctxOrigcontrasted.putImageData(origBits, 0, 0);
    // end contrast

    let image_data_url = contrastcanvas.toDataURL('image/jpeg');
    console.log('image_data_url');

    dataurl.value = image_data_url;
    dataurl_container.style.display = 'block';
    video.style.display = 'none';
    contrastcanvas.style.display = 'block';
    //click_button.style.display = 'none';
  }
  const closeCamera = () => {
    setPhotoMode(false);
  }
  const openCamera = async () =>  {
    setPhotoMode(true);
    let stream = null;
    try {
    	stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
    catch(error) {
    	alert(error.message);
    	return;
    }
    setTimeout(() => {  
      let video =  document.querySelector("#video");
      video.srcObject = stream; }, 500);    
  };




  return (
    <div>
      <Head>
        <meta name="description" content={pkg.appMetaDescription} />
        <meta property="og:title" content={pkg.appName} />
        <meta property="og:description" content={pkg.appMetaDescription} />
        <meta
          property="og:image"
          content={`${HOST}/og-b7xwc4g4wrdrtneilxnbngzvti.png`}
        />
 
        <title>{pkg.appName}</title>s
      </Head>
      <main className="container max-w-[1024px] mx-auto p-5 ">
        <div className="container max-w-[512px] mx-auto">
          <hgroup>
            <h1 className="text-center text-5xl font-bold m-4">
              {pkg.appName}
            </h1>
            <p className="text-center text-xl opacity-60 m-4">
              {pkg.appSubtitle}
            </p>
          </hgroup>

          {photoMode == true && 
            <div>
              <video id="video" width="320" height="240" autoPlay></video>
              <button id="click-photo" onClick={takePicture} >Take Photo</button>
              <div id="dataurl-container">
                <canvas id="canvas" width="320" height="240"></canvas>
                <canvas id="contrastcanvas" width="320" height="240"></canvas>
                <div id="dataurl-header">Image Data URL</div>
                <textarea id="dataurl" readOnly></textarea>
              </div>
              <div id="contrast-container"></div>
              <button onClick={closeCamera}>Reset</button>
            </div>
            
          }

          {photoMode == false && 
            <div  >
              <Canvas
              startingPaths={seed.paths}
              onScribble={setScribble}
              scribbleExists={scribbleExists}
              setScribbleExists={setScribbleExists}
              />   
              <button onClick={openCamera}>Open camera</button>
            </div>
          }
          
          

          <PromptForm
            initialPrompt={initialPrompt}
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
            scribbleExists={photoTaken || scribbleExists}
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
    </div>
  );
}
