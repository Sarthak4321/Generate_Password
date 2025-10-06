import { useState } from "react";
import PopupPage from "./Ami";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [passWord, setPassWord] = useState("");
  const [showPopup, setShowPopup] = useState(false);


  // EASY reveal function using setTimeout
  const revealPassword = (finalPass) => {
    setPassWord(""); // clear old password first

    for (let i = 0; i < finalPass.length; i++) {
      setTimeout(() => {
        setPassWord((prev) => prev + finalPass[i]); // add 1 char each time
      }, i * 300);
    }
  };

  // Function to generate password
  const generatePass = () => {
    let pass = "";
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) char += "1234567890";
    if (specialChar) char += "!@#$%^&*()-_=+[]{};:,<.>/?`~";

    for (let i = 0; i < 16; i++) {
      let main = Math.floor(Math.random() * char.length);
      pass += char.charAt(main);
    }

    revealPassword(pass);
  };



  return (
    <>
      <div className="w-full ">
        <div className=" flex justify-end m-0 p-0">
          <DotLottieReact
            className="h-14 w-28 flex p-0 "
            src="https://lottie.host/8464d3f1-fad5-40ab-a33a-b6fbf0e8c8d6/4ClqOjraHb.lottie"
            loop
            autoplay
          />
        </div>


        <div className="flex justify-end">
          <span
            className="font-bold text-[8px] opacity-75 bg-gradient-to-r from-blue-500 via-black to-pink-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-[shine_3s_linear_infinite]"
            style={{
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              backgroundSize: '200% auto',
              animation: 'shine 2.47s linear infinite',
            }}
          >
            CONNECTING WITH SATELLITE
          </span>

          <style>{`
    @keyframes shine {
      0% { background-position: 200% center; }
      100% { background-position: 0% center; }
    }
  `}</style>
        </div>



        <div className="flex-col justify-center align-middle mt-24">
          <div className="inline-block w-full  ">
            <h1 className="text-white  text-4xl font-bold ">Password Generator</h1>
          </div>


          <div className="m-10 sm:flex gap-5  justify-center">
            <input
              className="justify-center align-middle font-bold shadow-gray-600 shadow-2xl bg-amber-50 py-2.5 px-6 rounded-3xl text-gray-700 outline-none"
              value={passWord}
              type="text"
              readOnly
              placeholder="Password"
            />


            <button
              id="myElement"
              className="transition-colors duration-300 hover:bg-red-900 transition-shadow duration-500 hover:shadow-lg hover:shadow-red-600 shadow-2xl bg-red-800 shadow-red-600 text-white px-4 py-2 rounded-4xl"
              onClick={() => {
                const element = document.getElementById("myElement")

                element.style.pointerEvents = "none";


                generatePass();

                setTimeout(() => {
                  element.style.pointerEvents = "auto";
                }, 4800);
              }}
            >
              Generate
            </button>

            <div>
              <button
                className="transition-colors duration-300 hover:bg-blue-900 transition-shadow duration-500 hover:shadow-lg hover:shadow-blue-700 shadow-2xl bg-blue-800 shadow-blue-700 text-white px-4 py-2 rounded-4xl"
                onClick={() => {
                  navigator.clipboard.writeText(passWord);
                  alert("Password copied!");
                  setShowPopup(true);
                }}
              >
                Copy
              </button>
              <PopupPage isOpen={showPopup} onClose={() => setShowPopup(false)} password={passWord} />
            </div>

          </div>




          <div className="flex items-center justify-center mt-8">
            <div className="mr-9">
              <input
                className="m-2 w-4 h-4 rounded-none align-middle"
                type="checkbox"
                checked={numbers}
                onChange={() => setNumbers(!numbers)}
              />
              <label>Add Numbers</label>
            </div>

            <div className="mx-9">
              <input
                className="m-2 w-4 h-4 rounded-none align-middle"
                type="checkbox"
                checked={specialChar}
                onChange={() => setSpecialChar(!specialChar)}
              />
              <label>Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;