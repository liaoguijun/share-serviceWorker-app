import { useEffect } from "react";
import "./App.css";
import libController from "./LibController";
import ws from './ws'

function App() {

  function handle() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.controller.postMessage({
        "@type": "getFileError",
        data: 1,
      });
    }
  }

  function fn() {
    console.log('ws push pingpong', 222222)
  }

  useEffect(() => {
    const message = {op: 'ping'}
    ws.addChannel(message, fn)
    return () => {
      ws.removeChannel(message)
    }
  }, []);

  return (
    <>
      <div className="App" onClick={handle}>
        <button>handle</button>
      </div>
    </>
  );
}

export default App;
