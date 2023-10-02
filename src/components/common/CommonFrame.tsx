import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function CommonFrame() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <ImageBackground source={require("./../../assets/images/portada.jpg")}>
          <View style={styles.text}></View>
        </ImageBackground>

        <Svg
         height={RFPercentage(30)}
         width={RFPercentage(60)}
          viewBox="0 0 1440 320"
          style={{
            bottom: RFPercentage(19.3),
          }}
        >
          <Path
            fill="white"
            d="M0,128L60,112C120,96,240,64,360,80C480,96,600,160,720,202.7C840,245,960,267,1080,266.7C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </Svg>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: Dimensions.get("screen").width,
    height: 300,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: Dimensions.get("screen").width,
    height: 300,
    backgroundColor: "rgba(242, 142, 42, 0.73)",
  },
});
