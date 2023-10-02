import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const loginStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignContent: 'center',
        bottom: RFPercentage(6)
    },
    titleContainer:{
        backgroundColor: 'white',
        paddingHorizontal: RFPercentage(3),
    },
    title:{
        fontWeight: 'bold',
        fontSize: RFPercentage(5)
    },
    subTitle:{
        fontSize: RFPercentage(2.5),
        backgroundColor: 'white'
    },
    label:{
        fontSize: RFPercentage(2.3)
    },
    inputField:{
        padding: RFPercentage(1),
        marginBottom: RFPercentage(1.5),
        fontSize: RFPercentage(1.7)
    },
    inputFieldIOS:{
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        paddingBottom: RFPercentage(1)
    },
    forgotPasswordContainer:{
        alignItems: 'flex-end',
        marginBottom: RFPercentage(2.5)
    },
    forgotPassword:{
        fontSize: RFPercentage(2)
    },
    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    signupButton:{
        backgroundColor: 'white',
        borderColor: 'orange',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:RFPercentage(1),
        paddingHorizontal: RFPercentage(2.5)
    },
    loginButton:{
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:RFPercentage(1),
        paddingHorizontal: RFPercentage(2.5)
    },
    image: {
        width: 200,
        height: 200
      },
})