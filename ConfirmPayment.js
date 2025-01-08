import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

const ConfirmPayment = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    userDetails = {}, // From Sign In Page
    roomDetails = {}, // From Find Room Page
    paymentDetails = {}, // From Payment Page
  } = route.params || {};

  // Ensure calculatedAmount reflects accurate room price
  const calculatedAmount =
    paymentDetails.amount ||
    (roomDetails.rooms && roomDetails.pricePerRoom
      ? roomDetails.rooms * roomDetails.pricePerRoom
      : 'N/A');

  const handleConfirm = () => {
    if (!userDetails.name || !roomDetails.selectedHotel || !paymentDetails.method) {
      Alert.alert('Error', 'Some required details are missing. Please review your inputs.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('RatePage', {
        userDetails,
        roomDetails,
        paymentDetails: {
          ...paymentDetails,
          amount: calculatedAmount,
        },
      });
    }, 2000); // Simulate processing delay
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>Confirm Payment</Text>

        {/* User Details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>User Details</Text>
          <Text style={styles.detail}>Name: {userDetails.name || ''}</Text>
          <Text style={styles.detail}>Email: {userDetails.email || 'N/A'}</Text>
          <Text style={styles.detail}>Phone: {userDetails.phone || 'N/A'}</Text>
        </View>

        {/* Room Details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Room Details</Text>
          <Text style={styles.detail}>Hotel: {roomDetails.selectedHotel || 'N/A'}</Text>
          <Text style={styles.detail}>Check-in Date: {roomDetails.checkIn || 'N/A'}</Text>
          <Text style={styles.detail}>Check-out Date: {roomDetails.checkOut || 'N/A'}</Text>
          <Text style={styles.detail}>Number of Adults: {roomDetails.adults || '0'}</Text>
          <Text style={styles.detail}>Number of Children: {roomDetails.children || '0'}</Text>
          <Text style={styles.detail}>Number of Rooms: {roomDetails.rooms || '0'}</Text>
          <Text style={styles.detail}>
            Air Conditioned: {roomDetails.airConditioned ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.detail}>
            Price per Room: {roomDetails.pricePerRoom ? `₱${roomDetails.pricePerRoom}` : 'N/A'}
          </Text>
          <Text style={styles.detail}>
            Total Price: {calculatedAmount !== 'N/A' ? `₱${calculatedAmount}` : 'N/A'}
          </Text>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Payment Details</Text>
          <Text style={styles.detail}>Payment Method: {paymentDetails.method || 'N/A'}</Text>
          <Text style={styles.detail}>
            Amount Paid: {paymentDetails.amount ? `₱${paymentDetails.amount}` : 'N/A'}
          </Text>
        </View>
      </ScrollView>

      {/* Confirmation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>Confirm</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#00C6AE',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmPayment;
