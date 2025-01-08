import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const LandingPage = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('./assets/bg.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <StatusBar style="light" />
            <SafeAreaView style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.title}>Hotel Quest</Text>
                    <Text style={styles.subtitle}>
                        Find your perfect stay, anywhere, anytime.
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUpPage')}
                    accessible={true}
                    accessibilityLabel="Get Started"
                    accessibilityRole="button"
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Improved readability
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 16, // Dynamic font scaling can be added
        color: '#d1e7ff',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#ffaa00',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LandingPage;
