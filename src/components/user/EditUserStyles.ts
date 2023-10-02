import { StyleSheet } from 'react-native';

export const editStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    paddingHorizontal: 35,
    marginTop: 25,
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
    padding: 4,
  },
  inputFieldIOS: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingBottom: 4
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    
  },
})