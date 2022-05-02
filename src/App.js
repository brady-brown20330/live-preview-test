import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import Stack from './sdk/entry';
import { render } from '@testing-library/react';
// import { onEntryChange } from "./sdk/entry.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      header: undefined
    };
  }

  // const [header, setHeader] = useState([])


  // const updateData = () => {
  //   const fetchedData = getData();
  //   setHeader(fetchedData);
  // };

  // useEffect(() => {

  //   getData().then((res) => {
  //     setHeader(res)
  //     console.log('I am the great and powerful res: ', res)
  //   })

    // onEntryChange(updateData);

  // }, [])
      getData = async () => {
      const header = await Stack.getEntry("header", "en-us")
      return header[0][0]
    }
  render() {

    if (!this.state.header) return <h1>loading</h1> 
    
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>
              {this.state.header.title}
            </h1>
            <p>
              {this.state.header.subtext}
            </p>
          </header>
        </div>
      );
  
    }



  componentDidMount() {
    this.getData().then((res) => {
      this.setState({
        header: res
      })
      console.log('I am the great and powerful res: ', res)
    }
    )}
}

export default App;
