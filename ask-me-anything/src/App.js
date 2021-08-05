import React from 'react';
import Home from './Home.js'
import AdminBoard from './Admin.js'
import {getTableData} from './api';

function App() {
  return (
    <div>
      {/* <Home getTableData={getTableData}></Home> */}
      <AdminBoard getTableData={getTableData}></AdminBoard>
    </div>
  );
}

export default App;
