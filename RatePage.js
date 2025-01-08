import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RatePage = ({ route, navigation }) => {
  const [hotelRating, setHotelRating] = useState(0);
  const [appRating, setAppRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingSubmit = () => {
    // Logic to save ratings (e.g., sending data to a backend or saving locally)
    alert('Thank you for your feedback!');
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomePage' }], // Replace 'HomePage' with the actual home page route
    });
  };

  const renderStars = (rating, setRating) => (
    <View style={styles.starsContainer}>
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesome
          key={index}
          name={index < rating ? 'star' : 'star-o'}
          size={30}
          color="#FFD700"
          onPress={() => setRating(index + 1)}
          style={styles.star}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rate Your Experience</Text>

      {/* Rate the Hotel */}
      <View style={styles.section}>
        <Text style={styles.label}>Rate the Hotel:</Text>
        {renderStars(hotelRating, setHotelRating)}
      </View>

      {/* Rate the App */}
      <View style={styles.section}>
        <Text style={styles.label}>Rate the App:</Text>
        {renderStars(appRating, setAppRating)}
      </View>

      {/* Feedback */}
      <View style={styles.section}>
        <Text style={styles.label}>Leave Additional Feedback:</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Share your thoughts..."
          value={feedback}
          onChangeText={setFeedback}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleRatingSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 4,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlignVertical: 'top',
    height: 100,
  },
  submitButton: {
    backgroundColor: '#00C6AE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RatePage;
