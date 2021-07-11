import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import firebase from '../../config/firebase';
import 'firebase/firestore';
import { Icon, Ionicons, MaterialIcons } from 'react-native-vector-icons';


const screenWidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height
export default function Settings({ navigation }) {
    const arrowSize = 25;
    const iconSize = 20;
    function logout() {
        firebase.auth().signOut().then(() => {

            navigation.navigate("Login");
            // Sign-out successful.
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <SafeAreaView>
            <Text style={styles.settingsTitle}>Configurações</Text>
            <View style={styles.settingsPageView}>

                <View style={styles.settingsView}>
                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => navigation.navigate("ConfigOkr")}
                    >
                        <View style={styles.iconAndTextItemSetting}>
                            <MaterialIcons name="list-alt" size={iconSize} color="#000a4c" />
                            <Text style={styles.textButtonRegister}>Configurar O.K.Rs</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={arrowSize} color="#000a4c" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => navigation.navigate("ChangeUsername")}
                    >
                        <View style={styles.iconAndTextItemSetting}>
                            <MaterialIcons name="account-box" size={iconSize} color="#000a4c" style={{ marginRight: 3 }} />
                            <Text style={styles.textButtonRegister}>Trocar nome</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={arrowSize} color="#000a4c" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => navigation.navigate("ChangePassword")}
                    >
                        <View style={styles.iconAndTextItemSetting}>
                            <MaterialIcons name="lock-outline" size={iconSize} color="#000a4c" style={{ marginRight: 3 }} />
                            <Text style={styles.textButtonRegister}>Trocar Senha</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={arrowSize} color="#000a4c" />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => logout()}
                    >
                        <View style={styles.iconAndTextItemSetting}>
                            <MaterialIcons name="logout" size={iconSize} color="#000a4c" style={{ marginRight: 3 }} />
                            <Text style={styles.textButtonRegister}>Sair</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={arrowSize} color="#000a4c" />
                    </TouchableOpacity>
                </View>
                <View style={styles.appVersionView}>
                <MaterialIcons name="android" size={arrowSize} color="#bbb" />
                <Text style={styles.appVersionText} >v1.1.4</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    settingsTitle: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#000a4c',
        marginTop: 40,
        marginLeft: 20
    },
    settingsPageView:{
        flexDirection: 'column',
        justifyContent:'space-between',
        height:screenheight-150
    },
    settingsView: {

        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30


    },
    settingItem: {
        width: screenWidth * 0.8,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: "#000a4c",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 5,
    },
    textButtonRegister: {
        color: '#000a4c',
        fontSize: 18
    },
    iconAndTextItemSetting: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appVersionView: {
        justifyContent:'center',
        
        alignItems:'center',
        flexDirection:'row',

    },
    appVersionText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#bbb',
        marginLeft:8

    }
});