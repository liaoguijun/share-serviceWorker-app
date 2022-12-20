import React from "react";
import "./App.css";

function App() {
    function handle() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.controller.postMessage({ '@type': 'getFileError', data: 1 });
        }
    }
    return (
        <div className="App" onClick={handle}>
            <button>handle</button>
        </div>
    );
}

export default App;
