import React from 'react';
import Home from './Home.js'
import {getTableData} from './api';

function App() {
  return (
    <div>
      <Home getTableData={getTableData}></Home>
    </div>
  );
}

export default App;
