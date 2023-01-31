import React, { ReactElement, useState } from "react";
import ReactDOM from "react-dom/client";

import Characters from "./views/character";
import Home from "./views/home";

function App(): ReactElement {
  const [loadImages, setLoadImages] = useState<boolean>(false);

  //CAMBIAR NOMBRE A ESTA FUNCION
  const parentFunction = () => {
    setLoadImages(!loadImages);
  };

  return (
    <div className="App">
      <p className="title">Rick & Mroty</p>
      {!loadImages ? (
        <Home parentFunction={parentFunction} />
      ) : (
        <Characters parentFunction={parentFunction} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
