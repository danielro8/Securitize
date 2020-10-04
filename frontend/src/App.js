import React from 'react'
import './App.css';
import { useRef, useState } from "react"
import axios from "axios"
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { numberWithCommas } from "./helpers"
import Card from "./components/Card"

const App = () => {
  const searchStr = useRef(null)
  const [balance, setBalance] = useState()
  const [old, setOld] = useState(false)
  const handleSearch = async () => {
    try {
      const rtaBalance = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/wallet/addresses/${searchStr.current.value}/balance`)
      const rtaOld = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/wallet/addresses/${searchStr.current.value}/old`)
      setBalance(rtaBalance.data.result)
      setOld(rtaOld.data.result)
    } catch (err) {
      console.log('231321321321312312')
      store.addNotification({
        title: "Inexistent Address",
        message: "The input address could not be found. Please try again",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    }
  }
  return (
    <React.Fragment>
      <div className="row">
        <div className="col text-center">
          <input type="text" className="navigation-search-input" placeholder="Wallet Address" ref={searchStr} />
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <ReactNotification />
          <button type="button" className="btn btn-primary search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>
      {old ? <div className="row">
        <div className="col">
          <div className="alert alert-primary alert-danger" role="alert">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
              &nbsp;Wallet is old!
      </div>
        </div>
      </div> : <></>}
      <div className="row">
        <div className="col">
          <Card editable={false} />
        </div>
        <div className="col">
          <Card editable={true} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
