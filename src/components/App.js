import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

import Web3 from 'web3';
// npm install --save ipfs-http-client

// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient('localhost', '5001', {protocol:'http'}) // leaving out the arguments will default to these values

const { create } = require('ipfs-http-client')
const ipfs = create('https://ipfs.infura.io:5001')



class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }


  //  Get account
  //  Get the network
  //  Get smart contract
  //  Get image hash
  async loadBlockchainData(){
    const web3= window.web3
    const accounts= await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    console.log(accounts)
  }
  

  constructor(props){
    super(props);
    this.state={
      buffer:null,
      imageHash: '',
      account: '',
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  captureFile=(e)=> {
    e.preventDefault();
    console.log("file caught")
    console.log(e.target.files) // returns an object with all the details about the object
    // To get exact file name
    // e.target.files[0]
    const file= e.target.files[0];
    // Now, we'll store the bytes of the file on the IPFS
    const reader= new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend= ()=>{
      // console.log('buffer', Buffer(reader.result))
      this.setState({buffer:Buffer(reader.result)})
    
    }
  }

  onSubmit= async (e)=>{
    e.preventDefault();
    console.log("Submitting the form..")
    const file= await ipfs.add(this.state.buffer)
    const imageHash= file['path']
    this.setState({imageHash :imageHash})
    console.log(imageHash)
    // const file = await ipfs.add(urlSource('https://ipfs.io/images/ipfs-logo.svg'))
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Image that you uploaded
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.imageHash}`} className="App-logo" alt="logo" />
                </a>
                <form onSubmit={this.onSubmit}>
                  <br></br>
                  <h2>Change the image</h2>
                  <input type='file' onChange={this.captureFile}  />
                  <input type="submit" value="Submit" className="btn btn-outline-danger" />
                </form>              
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
