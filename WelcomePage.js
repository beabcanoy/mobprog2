import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomePage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.message}>
                Your account has been successfully created. Start exploring the app now!
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('FindRoom')} // Navigate to the next logical page
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.navigate('SignInPage')} // Option to return to login
            >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00d4ff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#0055ff',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#fff',
    },
    secondaryButtonText: {
        color: '#fff',
    },
});
