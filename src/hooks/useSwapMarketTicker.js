import React, { useEffect } from "react";
import libController from "../LibController";

export default function useSwapMarketTicker() {
  const todo = (data) => {
    console.log("[swap.market.ticker] from service worker", data);
  };
  useEffect(() => {
    libController.on("swap.market.ticker", todo);

    return () => {
      libController.off("swap.market.ticker", todo);
    };
  }, []);
}
