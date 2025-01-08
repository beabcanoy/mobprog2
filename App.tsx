import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const firebaseConfig = {
    apiKey: "AIzaSyBGgo849iqG53sl7aFNlT-yx6JwvDGj3O8",
    authDomain: "hotel-booking-ac11b.firebaseapp.com",
    projectId: "hotel-booking-ac11b",
    storageBucket: "hotel-booking-ac11b.firebasestorage.app",
    messagingSenderId: "927956385809",
    appId: "1:927956385809:web:aa65b18390b22b8354b1b0",
    measurementId: "G-L9FV07PYFV"
  };
  

// Import the screens
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import WelcomePage from './WelcomePage';
import SignInPage from './SignInPage';
import VerifyAccountPage from './VerifyAccountPage';
import FindRoom from './FindRoom';
import PaymentPage from './PaymentPage';
import ConfirmPayment from './ConfirmPayment';
import RatePage from './RatePage';
import SettingsPage from './SettingsPage';
import UserProfile from './UserProfile';


// Create the Stack Navigator
const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LandingPage">
            
                <Stack.Screen
                     name="FindRoom" 
                     component={FindRoom} 
                     options={{ title: 'Find Room' }} />

                <Stack.Screen 
                    name="LandingPage" 
                    component={LandingPage} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="SignUpPage" 
                    component={SignUpPage} 
                    options={{ title: 'Sign Up' }}
                />
                
                <Stack.Screen
                    name="Welcome"
                    component={WelcomePage}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen
                    name="SignInPage"
                    component={SignInPage}
                    options={{ title: 'Sign In' }}
                />
                <Stack.Screen
                    name="VerifyAccountPage"
                    component={VerifyAccountPage}
                    options={{ title: 'Verify' }}
                />
                <Stack.Screen
                    name="PaymentPage"
                    component={PaymentPage}
                    options={{ title: 'Payment'}}
                />
                <Stack.Screen 
                    name="ConfirmPayment" 
                    component={ConfirmPayment} 
                />
                <Stack.Screen 
                    name="RatePage"
                    component={RatePage} />

                <Stack.Screen 
                 name="UserProfile" 
                 component={UserProfile} />


                <Stack.Screen 
                    name="Settings"
                    component={SettingsPage} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
