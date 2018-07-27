import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FormInput, Card } from 'react-native-elements';
import { newWalletCreation, newWalletNameEntry } from '../../../actions/ActionCreator';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';

/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * the wallet has been recovered
 */
class CreateWalletName extends Component {
    /**
     * Method is used to navigate back to the recoverWallet screen.
     */
    navigate = () => {
      const navigateToPassphrase = NavigationActions.navigate({ routeName: 'recoverWallet' });
      this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Executes the action "newWalletNameEntry" with "name" as the parameter
     * in order to update the name of the wallet in the global state variable
     * @param {String} name
     */
    getWalletName(name) {
      this.props.newWalletNameEntry(name);
    }

    /**
     * Main Component
     * Returns the form required for the user to set the name of their wallet
     */
    render() {
      const {
        mainContainer,
        textHeader,
        contentContainer,
        cardContainer,
        cardText,
        txtWalletName,
        btnContainer,
        button,
        footerGrandparentContainer,
        footerParentContainer,
        textFooter,
      } = styles;

      return (
            <View style={mainContainer}>
                <BackWithMenuNav
                    showMenu={false}
                    showBack={true}
                    navigation={this.props.navigation}
                    backPage={'createOrRestore'}
                />
                <Text style={textHeader}>Wallet Name</Text>
                <View style={contentContainer}>
                    <Card containerStyle={cardContainer}>
                        <Text style={cardText}>
                            Create a name for your wallet, for example: My Wallet
                        </Text>
                        <FormInput
                            placeholder={'Ex. My Wallet'}
                            onChangeText={this.getWalletName.bind(this)}
                            inputStyle={txtWalletName}
                        />
                    </Card>
              </View>
            <View style={btnContainer}>
                <LinearButton
                    onClickFunction={this.navigate }
                    buttonText= 'Next'
                    customStyles={button}
                />
            </View>
            <View style={footerGrandparentContainer}>
                <View style={footerParentContainer} >
                    <Text style={textFooter} >Powered by ChainSafe </Text>
                </View>
            </View>
        </View>
      );
    }
}

/**
 * Styles used in the "CreateWalletNameRecovery" screen
 */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: '5%',
    backgroundColor: '#fafbfe',
    width: '100%',
    height: '100%',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: 26,
    letterSpacing: 0.8,
    paddingLeft: '9%',
    paddingBottom: '3%',
    color: '#1a1f3e',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  cardContainer: {
    width: '82%',
    height: '55%',
    borderRadius: 7.5,
    shadowOpacity: 0.5,
    shadowRadius: 1.3,
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 1, height: 2 },
  },
  cardText: {
    paddingBottom: '5%',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    fontSize: 16,
  },
  txtWalletName: {
    width: '100%',
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Regular',  
  },
  btnContainer: {
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,  
  },
  footerGrandparentContainer: {
    alignItems: 'center',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
    marginTop: '3.5%',
    color: '#c0c0c0',
  },
});

/**
 * This method is not being used here
 * @param {Object} param
 */
const mapStateToProps = ({ newWallet }) => {
  const { walletName } = newWallet;
  return { walletName };
};

export default connect(mapStateToProps, { newWalletNameEntry, newWalletCreation })(CreateWalletName);
