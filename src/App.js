import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import Stack from './sdk/entry';
import { onEntryChange } from "./sdk/entry.js";

const App = () => {

  const [header, setHeader] = useState([])

  const getData = async () => {
    const header = await Stack.getEntry("header", "en-us")
    return header[0][0]
  }

  const updateData = () => {
    const fetchedData = getData();
    setHeader(fetchedData);
  };

  useEffect(() => {

    getData().then((res) => {
      setHeader(res)
      console.log('I am the great and powerful res: ', res)
    })

    onEntryChange(updateData);

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          {header.title}
        </h1>
        <p>
          {header.subtext}
        </p>
      </header>
    </div>
  );
}

export default App;
