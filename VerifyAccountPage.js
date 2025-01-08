import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

export default function VerifyAccountPage({ navigation }) {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        if (verificationCode.length !== 6) {
            setError('Please enter a valid 6-digit verification code.');
            return;
        }

        setError('');
        setLoading(true);

        // Simulate verification process
        setTimeout(() => {
            setLoading(false);
            console.log(`Verification code: ${verificationCode}`);
            navigation.navigate('FindRoom'); // Navigate on successful verification
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify Your Account</Text>
            <Text style={styles.message}>
                We’ve sent a verification code to your email address. Please enter it below.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#888"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="numeric"
                maxLength={6}
                accessibilityLabel="Verification Code Input"
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
                style={styles.button}
                onPress={handleVerify}
                disabled={loading}
                accessibilityLabel="Verify Button"
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Verify</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => console.log('Resend Code')} // Placeholder for resend code logic
                accessibilityLabel="Resend Code Button"
            >
                <Text style={styles.linkText}>Resend Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('Login')}
                accessibilityLabel="Back to Login Button"
            >
                <Text style={styles.linkText}>Back to Login</Text>
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
        marginBottom: 20,
    },
    input: {
        height: 50,
        width: '90%',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        color: '#fff',
        fontSize: 16,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#0055ff',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 15,
    },
    linkText: {
        color: '#fff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
