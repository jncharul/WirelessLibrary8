import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput, ImageBackground, Image, Alert } from 'react-native';
import firebase from 'firebase';
export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }
    handleLogin = async (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate("BottomTabs")
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    render() {
        return (
            <ImageBackground
                style={{
                    flex: 1, resizeMode: "cover", justifyContent: "center"
                }}
                source={require("../assets/background2.png")}
            >
                <View style={{ flex: 0.5, alignItems: "center" }}>
                    <Image source={require("../assets/appIcon.png")} />
                    <Image source={require("../assets/appName.png")}
                        style={{ marginTop: 20 }} />
                </View>
                <View style={{ flex: 0.5, alignItems: "center" }}>
                    <TextInput style={{ height: 25, width: 250, borderWidth: 2 }}
                        placeholder="Enter Email"
                        onChangeText={text => {
                            this.setState({
                                email: text
                            })
                        }}
                        autoFocus />
                    <TextInput style={{ height: 25, width: 250, borderWidth: 2, marginTop: 10 }}
                        placeholder="Enter Password"
                        onChangeText={text => {
                            this.setState({
                                password: text
                            })
                        }}
                        secureTextEntry />
                    <TouchableOpacity style={{ height: 25, width: 70, backgroundColor: "orange", alignItems: "center" }}
                        onPress={() => this.handleLogin(this.state.email, this.state.password)}>
                        <Text>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}