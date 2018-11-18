import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import RF from 'react-native-responsive-fontsize';

import * as actions from '../../../actions/ActionCreator';
import * as configActions from '../../../actions/AppConfig';
import LinearButton from '../../../components/linearGradient/LinearButton';
// import { getQRCodeData } from '../../../actions/ActionCreator';
// import { updateSavedContactInputs } from '../../../actions/ActionCreator';
// import ContactAddresses from '../menu/contacts/SelectedContact';
// import BackupPhrase from '../menu/settings/BackupPhrase';


/**
 * React Component
 * Full Screen component used to scan QrCodes and save the Qr-data in
 * state
 */
class QrCodeScanner extends Component {
  /**
     * Initializes the "qrcode" variable, which can be used to
     * keep track of the data scanned by the scanner.
     * The parameters that were passed from the addContact screen are also assigned in
     * state
     * @param {Object} props
     */
  constructor(props) {
    super(props);
    console.log({invoker: this.props.invoker});
    
    this.state = {
      qrcode: '',
      invoker: this.props.invoker,
      coinInvoker: this.props.coinInvoker,
      previousInputs: this.props.currentContact,
      activeTab: 1,
      scanned: true,
    };
  }

    navigate = () => {
      console.log(this.props.invoker);
      
      const navigateToCreateOrRestore = NavigationActions.navigate({
        routeName: this.state.invoker,
        params: { activeTab: this.state.activeTab }
      });
      this.props.navigation.dispatch(navigateToCreateOrRestore);
    };

    /**
     * Method invoked whenever the camera scans a qrcode.
     * After being invoked the local state variable is updated with
     * the data in the QrCode, and the 'getQRCodeData' action is invoked in
     * order to update the global state variable
     */
    onBarCodeRead = (e) => {
      this.setState({ qrcode: e.data, scanned: !this.state.scanned });
      if (this.state.invoker === 'TokenFunctionality') { // Coin Send page
        // this.props.getQRCodeData(e.data);
        this.props.setGlobalAddress(e.data);
          this.setState({activeTab: 1});
      } else if (this.state.invoker === 'AddTokenFunctionality') {
        this.props.updateNewTokenAddress(e.data);
        this.setState({activeTab: 3});
      } else {
        const oldInputs = this.state.previousInputs;
        oldInputs.contactAddress[this.state.coinInvoker] = e.data;
        const contactInputs = oldInputs;
        this.props.updateSavedContactInputs(contactInputs);
        this.setState({activeTab: 1});
      }
    
      this.navigate();
    };

    /**
     * Returns a screen with the react-native-camera component as the background
     *  - a text box to  see the text that was scanned
     *  - a button to go back to the invoking screen and fill in the input field
     */
    render() {
      return (
        <View style={[styles.container, this.state.scanned ? {borderColor: 'green'} : {borderTopColor: 'black'}  ]}>
          <View style={{flex: 1}}>
              <Camera
                  style={styles.preview}
                  onBarCodeRead={this.onBarCodeRead}
                  ref={(cam) => { return this.camera = cam; }}
                  aspect={Camera.constants.Aspect.fill}
                  showMarker={true}>
                <View style={styles.btnContainer}>
                  <View style={styles.footerGrandparentContainer}>
                      <View style={styles.footerParentContainer} >
                          <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                      </View>
                  </View>
                </View>                  
              </Camera>
            </View>
        </View>
      );
    }
}

/**
 * Styles for QrCode Scanner component
 */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  contentContainer: {
    marginTop: 25,
  },
  form: {
    width: 340,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonStyle: {
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 3,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    marginBottom: '3%',
    marginTop: '3%',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(1.7),
    color: '#c0c0c0',
    letterSpacing: 0.5,
  },
});

/**
 * Reterives the name of the page that invoked the screen.
 * @param {Object} state
 */
const mapStateToProps = ({ QrScanner, contacts }) => {
  return {
    invoker: QrScanner.invoker,
    coinInvoker: QrScanner.coinInvoker,
    currentContact: contacts.incompleteContactInputs,
  };
};

export default connect(mapStateToProps, actions)(QrCodeScanner);
