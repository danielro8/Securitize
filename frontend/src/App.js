import React from 'react'
import './App.css';
import { useRef, useState, useEffect, useCallback } from "react"
import axios from "axios"
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { numberWithCommas } from "./helpers"
import Card from "./components/Card"

const App = () => {
  const searchStr = useRef(null)
  const balanceCurrencyRef = useRef("ETH")
  const currencyRef = useRef()
  const newCurrencyRef = useRef()
  const [balance, setBalance] = useState()
  const [old, setOld] = useState(false)
  const [currencies, setCurrencies] = useState()
  const [selectedCurrency, setSelectedCurrency] = useState()
  const [selectedEdition, setSelectedEdition] = useState(false)
  const ethCurrency =  [<option value={"ETH"} key="ETH">{"ETH"}</option>]
  const fetch = async () => {
    const rtaCurrencies = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/wallet/currencies`)
    setCurrencies(rtaCurrencies.data)
    if(!selectedCurrency) setSelectedCurrency(rtaCurrencies.data[0].value)
  }
  const stableFetch = useCallback(fetch, [])
  useEffect(()=> {
    stableFetch()
  }, [stableFetch])

  const handleChangeBalanceCurrency = async() => {
    const balanceSufix = balanceCurrencyRef.current.value === 'ETH' ? '' : `/${balanceCurrencyRef.current.value}`
    try {
      const rtaBalance = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/wallet/addresses/${searchStr.current.value}/balance${balanceSufix}`)
      setBalance(rtaBalance.data.result)
    } catch (err) {
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
  const handleChangeCurrency = async() => {
    setSelectedCurrency(currencies.filter(el => el.code === currencyRef.current.value)[0].value)
  }
  const handleSelectEdition = (editable) => {
    setSelectedEdition(editable)
  }
  const handleConfirmEdition = async () => {
    try {
      if(newCurrencyRef.current.value.length === 0 || isNaN(newCurrencyRef.current.value)){
        store.addNotification({
          title: "Invalid currency format",
          message: "The currency is required and need to be a number. Please try again",
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
        return false
      }
      const value = newCurrencyRef.current.value
      await axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/wallet/currencies/${currencyRef.current.value}`, 
      {value})
      fetch()
      await handleChangeBalanceCurrency()
      setSelectedCurrency(value)
      return true
    } catch (err) {
      console.log(err.message)
      store.addNotification({
        title: "Error updating Currency",
        message: "The currency couldn't be updated. Please try again",
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
              {currencies ?  ethCurrency.concat(currencies.map(el => <option value={el.code} key={el.code}>{el.code}</option>)) : <></>}
            </select>
            <div className="text-center balance"><b>{balance ? `${numberWithCommas(balance.toString().split('.')[0])}.${balance.toString().split('.')[1]}` : '-'}</b></div>
            </React.Fragment>
            }/>
           
        </div>
        <div className="col">
          <h4 className="text-center">Currency</h4>
          <Card editable={true}  content={
          <React.Fragment> 
            {currencies  ? <select className={`form-control ${selectedEdition ? 'd-none' : ''}`} ref={currencyRef}  disabled={currencies ? false : true}  onChange={handleChangeCurrency}>
              {currencies.map(el => <option value={el.code} key={el.code} price={el.value}>{el.code}</option>)}
            </select> : <></>}
            <div className="text-center balance"><b>{currencies && !selectedEdition ? `$${selectedCurrency}` :  currencies && selectedEdition ? <input className="form-control currency" ref={newCurrencyRef} autoFocus/>: '-'}</b></div>
            </React.Fragment>
            } handleEdition={handleSelectEdition} handleConfirmEdition={handleConfirmEdition}>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
