import { useEffect } from "react";
import "./App.css";
import libController from "./LibController";
import useSwapMarketTicker from "./hooks/useSwapMarketTicker";
import ws from "./ws";

function App() {
  useSwapMarketTicker();

  function handle() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.controller.postMessage({
        "@type": "getFileError",
        data: 1,
      });
    }
  }

  function fn(data) {
    console.log('[swap.market.ticker] from ws direct', data);
  }

  const start = () => {
    ws.addChannel(
      {
        op: "sub",
        topic: "swap.market.ticker",
        params: {
          contractCode: "BTC-USDT",
        },
      },
      fn
    );
  };
  const close = () => {
    ws.removeChannel(
      {
        op: "sub",
        topic: "swap.market.ticker",
        params: {
          contractCode: "BTC-USDT",
        },
      },
      fn
    );
  };

  return (
    <>
      <div className="App" onClick={start}>
        <button>start</button>
      </div>
      <div className="App" onClick={close}>
        <button>close</button>
      </div>
    </>
  );
}

export default App;
