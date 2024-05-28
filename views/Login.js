import React, { useEffect, useState } from 'react';
import { Alert, Modal, View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import Camera from '../components/Camera';

export default function Login({ navigation }) {
    useEffect(() => {
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const [eventId, setEventId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const fillEventInput = (value) => {
        setEventId(value.data);
        setModalVisible(false);
    }
    const login = () => {
        axios.post('http://192.168.100.39:8000/api/v1/customer/login', {
            email,
            password
        }).then((response) => {
            console.log(JSON.stringify(response.data, null, 2));
            navigation.navigate('SignUp')

        }).catch((e) => {
            setErrors(e.response.data)
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Connexion</Text>
                <Text style={styles.subHeaderText}>Enter your credentials</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>

                <View style={styles.formContainer}>
                    {errors && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errors.message}</Text>
                        </View>
                    )}
                    <TextInput style={styles.input} placeholder='Phone / Email' value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
                    <View style={styles.eventIdContainer}>
                        <TextInput style={styles.eventIdInput} value={eventId} placeholder='ID de l événement' />
                        <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(true)}>
                            <Icon name="qrcode-scan" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={login}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Passez le scanner sur votre badge</Text>
                            <Camera onBarcodeScan={fillEventInput} />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Fermer</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
    },
    header: {
        backgroundColor: 'purple',
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subHeaderText: {
        color: 'white',
        fontSize: 16,
    },
    errorContainer: {
        padding: 10,
        backgroundColor: 'red',
        margin: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'white',
        fontSize: 14,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        padding: 20,
        width: '100%',
        height: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    eventIdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        width: '100%',
    },
    eventIdInput: {
        flex: 1,
    },
    iconContainer: {
        padding: 5,
    },
    orText: {
        textAlign: 'center',
        marginVertical: 10,
        color: 'gray',
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    camera: {
        width: 300,
        height: 400,
        marginBottom: 15,
    },
});
