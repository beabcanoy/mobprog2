import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function SignUpPage({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSignUp = async () => {
    const userData = { fullName, email, phoneNumber };
    try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    navigation.navigate('UserProfile'); // Navigate to UserProfile
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};


    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.form}>
                {/* Full Name Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={20} color="#666" style={styles.icon} />
                    <TextInput placeholder="Full Name" style={styles.input} />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={20} color="#666" style={styles.icon} />
                    <TextInput 
                        placeholder="Email" 
                        style={styles.input} 
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                    />
                </View>

                {/* Phone Number Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="phone" size={20} color="#666" style={styles.icon} />
                    <TextInput 
                        placeholder="+63" 
                        style={styles.input} 
                        keyboardType="phone-pad" 
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
                    <TextInput 
                        placeholder="Password" 
                        style={styles.input} 
                        secureTextEntry={!passwordVisible} 
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Ionicons 
                            name={passwordVisible ? 'eye-off' : 'eye'} 
                            size={20} 
                            color="#666" 
                        />
                    </TouchableOpacity>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('Welcome')}
                    accessible={true}
                    accessibilityLabel="Create Account"
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                {/* Social Sign-in Options */}
                <Text style={styles.orText}>or sign in using</Text>
                <View style={styles.socialButtons}>
                    <TouchableOpacity 
                        style={[styles.socialButton, { backgroundColor: '#3b5998' }]}
                        onPress={() => alert('Facebook sign-in')}
                    >
                        <Text style={styles.socialButtonText}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.socialButton, { backgroundColor: '#db4437' }]}
                        onPress={() => alert('Google sign-in')}
                    >
                        <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer Text */}
                <Text style={styles.footerText}>
                    By creating an account, you agree to our <Text style={styles.link}>Terms</Text>
                </Text>
                <Text style={styles.signInText}>
                    Already have an account? <Text style={styles.link} onPress={() => navigation.navigate('SignInPage')}>Sign In</Text>
                </Text>
            </View>
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
        paddingHorizontal: 5,
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
    signInText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
});
