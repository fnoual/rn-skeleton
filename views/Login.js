import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const login = () => {
        axios.post('http://192.168.68.50:8000/api/v1/customer/login', {
            email,
            password
        }).then((response) => {
            console.log(JSON.stringify(response.data, null, 2));
        }).catch((e) => {
            setErrors(e.response.data)
            navigation.navigate('SignUp')
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
                            {Object.keys(errors.errors).map((key) => (
                                errors.errors[key].map((error, index) => (
                                    <Text key={`${key}-${index}`} style={styles.errorText}>{error}</Text>
                                ))
                            ))}
                        </View>
                    )}
                    <TextInput style={styles.input} placeholder='Phone / Email' value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
                    <View style={styles.eventIdContainer}>
                        <TextInput style={styles.eventIdInput} placeholder='EventId' />
                        <TouchableOpacity style={styles.iconContainer}>
                            <Icon name="qrcode-scan" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.cameraContainer} onPress={login}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
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
    cameraContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        width: '100%',
    },
});
