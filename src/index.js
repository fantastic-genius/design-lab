import React from 'react';
import ReactDOM from 'react-dom';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { googleFonts } from './utils/fonts';

const config = {
  google: {
    families: googleFonts,
  }
};
 
// Callback receives the status of the general webfont loading process. *OPTIONAL*
const callback = status => {
  // I could hook the webfont status to for example Redux here.
  console.log('font loader status: ', status)
};

ReactDOM.render(
  <WebfontLoader config={config} onStatus={callback}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WebfontLoader>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
