import { AsyncStorage } from 'react-native';
import { addTokenSetup } from "./ActionTypes";
import * as actionTypes from './ActionTypes';

function AddToken(payload) {
  return {
    type: addTokenSetup,
    payload
  }
}

/**
 * Action for adding tokens to the portfolio during the main setup
 * returns a dispatch => which invokes all the reducers to handle this action
 * @param {String} coin 
 */
export function addTokenToSetup(coin) {
  return dispatch => {
    coin.selected = !coin.selected
    dispatch({ type: actionTypes.ADD_TOKEN_SETUP, payload: coin })
  }
}


// export function login() {
//   return dispatch => {
//     dispatch({ type: LOADING })
//     // api call
//     .then(res => { dispatch({ type: LOGIN, payload: user}) })
//     .catch(err => { dispatch({type: LOGIN_FAILED, payload: null}) })
//   }
// }

/**
 * returns an action with a new crypto wallet create using
 * ethers.js as a payload
 * @param {ethers.js wallet} wallet 
 */
export function newWalletCreation(wallet) {
  return dispatch => {
    dispatch({
      type: actionTypes.CREATING_NEW_WALLET,
      payload: wallet
    })
  }
}


/**
 * retruns an action with the wallet name as a payload
 * @param {String} name 
 */
export function newWalletNameEntry(name) {
  return dispatch => {
    dispatch({ type: actionTypes.NEW_WALLET_NAME, payload: name })
  }
}

/**
 * returns an action that enables the state to restore a wallet
 */
export function restoreWallet() {
  return dispatch => {
    dispatch({ type: actionTypes.RESTORE_WALLET })
  }
}


/**
 * returns an action that contains the fiat currency that the user
 * wishes to view thier the wallet balance with
 * @param {String} currency 
 */
export function selectWalletCurrency(currency) {
  return dispatch => {
    dispatch({ type: actionTypes.SELECT_WALLET_CURRENCY, payload: currency })
  }
}

/**
 * returns an action that contains the language that the user wishes to
 * use thier wallet in.
 * 
 * @param {String} language 
 */
export function selectWalletLanguage(language) {
  return dispatch => {
    dispatch({ type: actionTypes.SELECT_WALLET_LANGUAGE, payload: language })
  }
}


/**
 * Returns an action that contains the -Name- of the new contact
 * that the user is creating.
 * 
 * Reducer: ContactsReducers
 * 
 * @param {String} contact 
 */
export function addingContact(contact) {
  return dispatch => {
    dispatch({ type: actionTypes.ADDING_CONTACT, payload: contact })
  }
}


/**
 * returns an action that contains an object which contains the name
 * of the new contact and all the coin address that belongs to it.
 * 
 * @param {String} contactName 
 * @param {Object} contactAddress 
 */
export function completeContact(contactName, contactAddress) {
  let contact = {}
  contact.name = contactName
  contact.contactAddress = contactAddress

  return dispatch => {
    dispatch({ type: actionTypes.COMPLETE_CONTACT, payload: contact })
  }
}

/**
 * returns an action that contain an object with all the tokens
 * that currently exists on the porfolio page.
 * This object also holds the addresses that were inputed by the user when 
 * adding a new contact
 * 
 * this is not being used
 * @param {Object} addresses 
 * @param {String} coinType 
 */
export function createContactAddresses(addresses, coinType) {

  return dispatch => {
    dispatch({ type: actionTypes.CONTACT_ADDRESS, payload: addresses })
  }
}

/**
 * returns an action that contains the data reterived by using the QrScanner
 * component
 * @param {String} data 
 */
export function getQRCodeData(data) {
  return dispatch => {
    dispatch({ type: actionTypes.QRSCANNER_DATA, payload: data })
  }
}

/**
 * Contains the name of the page from which the QrScanner was invoked from
 * @param {String} pageName 
 */
export function qrScannerInvoker(pageName) {
  return dispatch => {
    dispatch({ type: actionTypes.QRSCANNER_PAGE_INVOKER, payload: pageName })
  }
}


/**
 * Contains the inputs made in the addCOntact screen
 * @param {Object} completeInput 
 */
export function saveAddContactInputs(completeInput) {
  return dispatch => {
    dispatch({ type: actionTypes.SAVING_ADDCONTACT_INPUTS, payload: completeInput })
  }
}