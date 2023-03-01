import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import Stack from './sdk/entry';
import { onEntryChange } from "./sdk/entry.js";
import { addEditableTags } from '@contentstack/utils'

function App() {

  const [header, setHeader] = useState([])

  const getData = async () => {
    const header = await Stack.getEntry("header", "en-us")
    addEditableTags(header[0][0], 'header', true)
    return header[0][0]
  }

  const updateData = () => {
  const fetchedData = getData();
    
    setHeader(fetchedData.then(function(result) {
      setHeader(result)
   }));
  };

  useEffect(() => {

    getData().then((res) => {
      setHeader(res)
      // console.log('I am the great and powerful res: ', res)
    })

    onEntryChange(updateData);

  }, [])

  if (!header.title) return <h1>loading</h1>
  console.log('this is the header: ', header)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 {...header.$.title}>
          {header.title}
        </h1>
        <p{...header.$.subtext}>
          {header.subtext}
        </p>
        <div>
        <p {...header.$.subtext}>{header.copyright}</p>
      </div>
      </header>
    </div>
  );

}

export default App;
