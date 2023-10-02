import { StyleSheet } from 'react-native';

export const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignContent: 'center',
        paddingHorizontal: 20,
    },
    titleContainer: {
        //marginBottom: 20,
        //marginTop: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30
    },
    subTitle: {
        fontSize: 18
    },
    label: {
        fontSize: 15,
        marginTop: 10,
    },
    textValidation: {
        fontSize: 12,
        color: 'red',
        marginBottom: 10,
    },
    inputField: {
        padding: 4
    },
    inputFieldIOS: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 20
    },
    forgotPassword: {

    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})