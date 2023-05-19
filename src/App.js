import { useEffect } from "react";
import "./App.css";
import libController from "./LibController";
import useSwapMarketTicker from "./hooks/useSwapMarketTicker";
import ws from "./ws";
import { unregister } from "./registerServiceWorker";

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
    // ws.removeChannel(
    //   {
    //     op: "sub",
    //     topic: "swap.market.ticker",
    //     params: {
    //       contractCode: "BTC-USDT",
    //     },
    //   },
    // );
  };

  useEffect(() => {
    return () => {
      unregister()
    }
  }, [])

  return (
    <>
      <div className="App" onClick={start}>
        <button>订阅 ws</button>
      </div>
      <div className="App" onClick={close}>
        <button>清除订阅 ws</button>
      </div>
    </>
  );
}

export default App;
