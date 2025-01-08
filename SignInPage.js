import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function SignInPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateInputs = () => {
        if (!email.includes('@')) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSignIn = () => {
        if (!validateInputs()) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('VerifyAccountPage'); // Mock successful login
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Ionicons
                            name={passwordVisible ? 'eye-off' : 'eye'}
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignIn}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign In</Text>
                    )}
                </TouchableOpacity>
                <Text style={styles.orText}>or sign up using</Text>
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3b5998' }]}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <div dir="auto" class="css-text-146c3p1 r-color-jwli3a r-fontSize-ubezar">Facebook</div>
                    </a>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#db4437' }]}>
                        <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.footerText}>
                    By signing in, you agree to our <Text style={styles.link}>Terms</Text>
                </Text>
                <Text style={styles.signUpText}>
                    Don't have an account?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('SignUpPage')}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '0000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#f4f4f4',
        marginBottom: 20,
    },
    form: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 15,
        width: '100%',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#0055ff',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 14,
        marginBottom: 10,
    },
    orText: {
        marginVertical: 15,
        fontSize: 14,
        color: '#666',
    },
    socialButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    socialButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    footerText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginVertical: 15,
    },
    link: {
        color: '#0055ff',
    },
    signUpText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
});
