import React from 'react'
import './App.css';
import { useRef, useState } from "react"
import axios from "axios"
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { numberWithCommas } from "./helpers"
import Card from "./components/Card"
import { CURRENCIES } from "./constants"

const App = () => {
  const searchStr = useRef(null)
  const balanceCurrencyRef = useRef("ETH")
  const [balance, setBalance] = useState()
  const [old, setOld] = useState(false)
  const ethCurrency =  [<option value={"ETH"} key="ETH">{"ETH"}</option>]
  let currencies = CURRENCIES.map(el => <option value={el.code} key={el.code}>{el.name}</option>)
  const handleChangeBalanceCurrency = async() => {
    console.log('currency',balanceCurrencyRef.current.value )
    const balanceSufix = balanceCurrencyRef.current.value === 'ETH' ? '' : `/${balanceCurrencyRef.current.value}`
    try {
      const rtaBalance = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/wallet/addresses/${searchStr.current.value}/balance${balanceSufix}`)
      setBalance(rtaBalance.data.result)
    } catch (err) {
      console.log('231321321321312312')
      store.addNotification({
        title: "Error in getting Balance",
        message: "The balance couldn't be gotten. Please try again",
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
          <h4 className="text-center">Balance</h4>
          <Card editable={false} content={
          <React.Fragment> 
           <select className="form-control" ref={balanceCurrencyRef} onChange={handleChangeBalanceCurrency} disabled={balance ? false : true}>
              {ethCurrency.concat(currencies)}
            </select>
            <div className="text-center balance">{balance ? `${numberWithCommas(balance.toString().split('.')[0])}.${balance.toString().split('.')[1]}` : '-'}</div>
            </React.Fragment>
            }/>
           
        </div>
        <div className="col">
          <h4 className="text-center">Currency</h4>
          <Card editable={true}  content={
          <React.Fragment> 
           <select className="form-control" ref={balanceCurrencyRef}  disabled={balance ? false : true} >
              {currencies}
            </select>
            </React.Fragment>
            }>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
