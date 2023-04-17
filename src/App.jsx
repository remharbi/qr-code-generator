import { useState } from "react";
import ReactDOM from "react-dom/client";
import QRCode from "react-qr-code";
import { renderSvgAsImage, setDomRenderer } from "react-svg-image";
import "./App.css";

async function renderAsPromise(el, domEl) {
  const root = ReactDOM.createRoot(domEl);
  root.render(el);
  return new Promise((resolve) => {
    requestIdleCallback(resolve);
  });
}

setDomRenderer(renderAsPromise);

function App() {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(null);

  // Create PNG image from a QR Code generated from input
  const generateImage = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const src = await renderSvgAsImage(<QRCode value={json} />);
    setImg(src);
    setShow(true);
  };

  return (
    <main className="bg-gradient-radial from-cyan-800  to-slate-700 min-h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-white mb-28 font-bold text-6xl">QR Code Generator</h1>
      <div className="container mx-auto bg-slate-200 rounded-lg p-20">
        <form onSubmit={(e) => generateImage(e)}>
          <div className="mt-2">
            <input
              type="text"
              name="url"
              id="url"
              required
              // pattern="/^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/"
              placeholder="Enter a valid url starting with http(s)"
              className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-800 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md mt-5"
          >
            Generate
          </button>
        </form>
      </div>
      {show ? (
        <div className="modal absolute backdrop-blur-lg bg-white/30 h-2/4 w-3/12 rounded-lg flex items-center justify-center flex-col">
          <img src={img} alt="generated qr image" />
          <a
            href={img}
            download="qrcode.png"
            className="bg-cyan-800 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md mt-12"
          >
            Download
          </a>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}

export default App;
