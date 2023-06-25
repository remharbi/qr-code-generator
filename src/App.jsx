import { useState } from "react";
import ReactDOM from "react-dom/client";
import QRCode from "react-qr-code";
import { renderSvgAsImage, setDomRenderer } from "react-svg-image";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
      <div className="objects absolute top-0 left-0 w-full h-full overflow-hidden">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 className="text-white mb-28 text-3xl sm:text-5xl md:text-7xl lg:text-8xl">QR Code Generator</h1>
      <div className="container mx-auto relative z-10">
        <form onSubmit={(e) => generateImage(e)} className="bg-color shadow-lg rounded-lg p-5 sm:p-10 lg:p-20 mx-5">
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
            <div className="flex justify-end select-none">
              <input
                type="reset"
                value="clear"
                className="cursor-pointer hover:opacity-80 pr-2 mt-1"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="select-none text-2xl hover:text-cyan-950 text-white font-semibold py-2 px-4 rounded-md mt-5"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
      {show ? (
        <div className="modal absolute z-20 backdrop-blur-lg bg-white/30 h-5/6 lg:h-2/4 w-11/12 lg:w-1/3 rounded-lg">
          <div className="flex items-center justify-center flex-col relative h-full">
            <XMarkIcon
              className="w-8 absolute top-5 left-5 text-white hover:scale-125 cursor-pointer transition ease-in-out duration-150"
              onClick={() => {
                setShow(false);
              }}
            />
            <img src={img} alt="generated qr image" />
            <a
              href={img}
              download="qrcode.png"
              className="select-none bg-cyan-800 text-xl hover:bg-cyan-950 text-white font-semibold py-2 px-4 rounded-md mt-12"
            >
              Download
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}

export default App;
