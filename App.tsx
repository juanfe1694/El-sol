import React from "react";
import useCachedResources from "./src/hooks/useCachedResources";
import { Provider } from "react-redux";
import { store } from "./src/app/store";

//intl
import "intl";
import "intl/locale-data/jsonp/en";
import Main from "./Main";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import LinkingConfiguration from "./src/navigation/LinkingConfiguration";
import Toast from "react-native-toast-message";
import { NavigationProps } from "./src/interfaces/functionalInterfaces";


export default function App( navigation : NavigationProps) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Provider store={store}>
          <NavigationContainer
            linking={LinkingConfiguration}
            theme={
              DefaultTheme
            }
          >
            <Main { ...navigation } />
          </NavigationContainer>
        </Provider>
        <Toast />
      </>
    );
  }
}
