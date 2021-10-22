import React from "react";
import './global.css';
import Routes from './routes';

import AppProvider from './hooks';
function App() {
  
  return (
    <AppProvider >
<Routes/>
</AppProvider>
  );
}

export default App;
