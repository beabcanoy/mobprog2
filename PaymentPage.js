import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const PaymentPage = ({ route, navigation }) => {
  const { totalAmount } = route.params; // Retrieve totalAmount from navigation parameters
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    number: '',
    pin: '',
    expirationDate: '',
    cvv: '',
  });
  const [amountPaid, setAmountPaid] = useState(''); // Amount the user is paying

  const handlePaymentOptionSelect = (option) => {
    setSelectedPayment(option);
    setPaymentDetails({ number: '', pin: '', expirationDate: '', cvv: '' });
  };

  const handleInputChange = (field, value) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmountPaidChange = (value) => {
    setAmountPaid(value);
  };

  const validateInputs = () => {
    const { number, pin, expirationDate, cvv } = paymentDetails;

    if (!number) {
      Alert.alert('Error', 'Account or card number is required.');
      return false;
    }

    if (selectedPayment === 'GCASH' || selectedPayment === 'BDO' || selectedPayment === 'CHINA BANK') {
      if (!pin) {
        Alert.alert('Error', 'PIN is required.');
        return false;
      }
    }

    if (selectedPayment === 'VISA') {
      if (!expirationDate || !cvv) {
        Alert.alert('Error', 'Expiration date and CVV are required for VISA.');
        return false;
      }
    }

    if (!amountPaid || parseFloat(amountPaid) < totalAmount) {
      Alert.alert('Error', 'Amount paid is not sufficient or missing.');
      return false;
    }

    return true;
  };

  const handleSubmitPayment = () => {
    if (validateInputs()) {
      navigation.navigate('ConfirmPayment', {
        paymentDetails: {
          method: selectedPayment,
          ...paymentDetails,
        },
        totalAmount,
        amountPaid,
      });
    }
  };

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case 'GCASH':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your GCash number"
              value={paymentDetails.number}
              onChangeText={(text) => handleInputChange('number', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your GCash PIN"
              secureTextEntry
              value={paymentDetails.pin}
              onChangeText={(text) => handleInputChange('pin', text)}
            />
          </View>
        );
      case 'BDO':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your BDO account number"
              value={paymentDetails.number}
              onChangeText={(text) => handleInputChange('number', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your BDO account PIN"
              secureTextEntry
              value={paymentDetails.pin}
              onChangeText={(text) => handleInputChange('pin', text)}
            />
          </View>
        );
      case 'VISA':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your VISA card number"
              value={paymentDetails.number}
              onChangeText={(text) => handleInputChange('number', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your card expiration date"
              value={paymentDetails.expirationDate}
              onChangeText={(text) => handleInputChange('expirationDate', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your CVV"
              secureTextEntry
              value={paymentDetails.cvv}
              onChangeText={(text) => handleInputChange('cvv', text)}
            />
          </View>
        );
      case 'CHINA BANK':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your China Bank account number"
              value={paymentDetails.number}
              onChangeText={(text) => handleInputChange('number', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your China Bank PIN"
              secureTextEntry
              value={paymentDetails.pin}
              onChangeText={(text) => handleInputChange('pin', text)}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      {/* Payment Options */}
      <View style={styles.paymentOptions}>
        {['GCASH', 'BDO', 'VISA', 'CHINA BANK'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.paymentButton,
              selectedPayment === option && styles.selectedPaymentButton,
            ]}
            onPress={() => handlePaymentOptionSelect(option)}
          >
            <Text
              style={[
                styles.paymentButtonText,
                selectedPayment === option && styles.selectedPaymentButtonText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display Total Amount */}
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>Total Amount: ₱{totalAmount}</Text>
      </View>

      {/* Amount User is Paying */}
      <View style={styles.amountPaidContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount You Are Paying"
          keyboardType="numeric"
          value={amountPaid}
          onChangeText={handleAmountPaidChange}
        />
      </View>

      {/* Render Payment Form */}
      {renderPaymentForm()}

      {/* Submit Button */}
      {selectedPayment && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPayment}>
          <Text style={styles.submitButtonText}>Submit Payment</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  paymentButton: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 8,
    width: 80,
    alignItems: 'center',
  },
  selectedPaymentButton: {
    backgroundColor: '#00C6AE',
  },
  paymentButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedPaymentButtonText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  totalAmountContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  amountPaidContainer: {
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: '#00C6AE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentPage;
