
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';

export const QrGeneratorStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    buttonContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
      width: '25%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 10,
      elevation: 3,
      borderColor: '#0d3c61',
      borderWidth: 1,
    },
    pressedButton: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#0d3c61',
      },
      messageContainer:{
        width: '80%',
        backgroundColor: '#33bfff1a',
        margin: '2%',
        padding: '2%',
        borderRadius: 5
      },
      message:{
        color: '#17a5e6',
        fontSize: RFPercentage(2.3)
      },
      generateBtn:{
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#0d3c61',
      },
      timeStampMainContainer:{
        width: '80%',
        marginVertical: '2%'
      },
      timestampContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: '1%'
      },
      qrButtonsContainer:{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      disabled:{
        opacity: 0.7
      }, 
      errorText: {
        color: '#b32d23', 
        maxWidth:'80%', 
        marginBottom: '2%'
      }
  });