import React from 'react';
import Home from './Home.js'
import Trending from './Trending.js'
import {getTableData} from './api';

function App() {
  return (
    <div>
      <Home getTableData={getTableData}></Home>
      <Trending getTableData={getTableData}></Trending>
    </div>
  );
}

export default App;
