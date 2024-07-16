import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Input,
  InputSlot,
  InputIcon,
  InputField,
  Button,
  ButtonText,
  HStack,
  Divider,
} from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../../Contexts/AuthContext";
// import {
//   GoogleSignin,
//   statusCodes,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";

// GoogleSignin.configure({
//   webClientId:
//     "257394933258-dtvt1efikomo57q4tuscdqjaumldaj1r.apps.googleusercontent.com", // replace with your web client ID
//   offlineAccess: true,
// });

export default function Login({ navigation }: any) {
  const { user, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // }, []);

  // const _signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // console.log("User Info", userInfo);
  //     setUser(userInfo);
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log("user cancelled the login flow");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log("operation (e.g. sign in) already in progress");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log("play services not available or outdated");
  //     } else {
  //       console.log("some other error happened", error);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back-ios" size={22} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>Login</Text>

      <View py={"$4"} style={styles.loginArea}>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subHeading}>Enter your details below</Text>
        {/* email input */}
        <Text mt={"$3"} style={styles.inputLogo}>
          Email
        </Text>
        <Input variant="rounded" size="lg">
          <InputSlot ml={"$3"}>
            <MaterialIcons name="email" size={20} color={COLORS.tertiary} />
          </InputSlot>
          <InputField placeholder="Enter your Email" />
        </Input>
        {/* password input */}
        <Text mt={"$3"} style={styles.inputLogo}>
          Password
        </Text>
        <Input variant="rounded" size="lg">
          <InputSlot ml={"$3"}>
            <MaterialIcons name="password" size={20} color={COLORS.tertiary} />
          </InputSlot>
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />
          <InputSlot mr={"$2"}>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color={COLORS.tertiary}
              />
            </TouchableOpacity>
          </InputSlot>
        </Input>
        <TouchableOpacity>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>
        {/* sign in button */}
        <Button
          bg="#0ea5e9"
          mt={"$4"}
          w={"$full"}
          onPress={() => setUser(true)}
        >
          <ButtonText>Sign in</ButtonText>
        </Button>
        <HStack mt={"$3"} alignItems="center" justifyContent="center">
          <Divider w={PERCENT[20]} />
          <Text marginHorizontal={PERCENT[5]}>Or sign in with</Text>
          <Divider w={PERCENT[20]} />
        </HStack>
        Login with google
        <GoogleSigninButton
          style={{ width: "100%" }}
          onPress={_signIn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
        <HStack my={"$4"}>
          <Text>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
  },
  text: {
    marginTop: "15%",
    alignSelf: "center",
    color: "white",
    fontSize: PERCENT[10],
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
  },
  loginArea: {
    flex: 1,
    marginTop: "20%",
    backgroundColor: "white",
    borderTopLeftRadius: PERCENT[10],
    borderTopRightRadius: PERCENT[10],
    elevation: 10,
    paddingHorizontal: "10%",
  },
  backArrow: {
    position: "absolute",
    margin: "3%",
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  inputLogo: {
    color: COLORS.tertiary,
    fontSize: PERCENT[4],
    alignSelf: "flex-start",
    marginLeft: PERCENT[3],
    fontWeight: "bold",
    marginBottom: PERCENT[1],
  },
  heading: {
    marginTop: "3%",
    fontWeight: "bold",
    fontSize: PERCENT[8],
    alignSelf: "center",
  },
  subHeading: {
    fontSize: PERCENT[4],
    marginVertical: "3%",
    alignSelf: "center",
  },
  linkText: {
    color: COLORS.activeText,
  },
});
