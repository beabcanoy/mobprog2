import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to generate a random price between 700 and 6000
const generateRandomPrice = () => Math.floor(Math.random() * (6000 - 700 + 1)) + 700;

const FindRoom = ({ navigation }) => {
  const [airConditioned, setAirConditioned] = useState(true);
  const [fanSelected, setFanSelected] = useState(false); // Track fan selection
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [rooms, setRooms] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null); // Track selected hotel
  const [sortedHotels, setSortedHotels] = useState([]); // State to store the sorted hotels
  const [isSortedAscending, setIsSortedAscending] = useState(true); // State to track sorting order
  const [totalAmount, setTotalAmount] = useState(0); // State to store the total amount to pay

  const hotelsData = [
    { id: '1', name: 'The Loop Towers' },
    { id: '2', name: 'N Hotel' },
    { id: '3', name: 'FB Budgetel Suites' },
    { id: '4', name: 'FB Dormitel' },
    { id: '5', name: 'De Luxe Hotel' },
    { id: '6', name: 'Ultra Winds Mountain Resort' },
    { id: '7', name: 'Bridge Hotel' },
    { id: '8', name: 'Miami Inn' },
    { id: '9', name: 'Gardens of Malasag Eco-Tourism' },
    { id: '10', name: 'Seda Centrio' },
    { id: '11', name: 'The Pacifico Boutique Hotel' },
    { id: '12', name: 'RedDoorz near Lapasan Plaza' },
    { id: '13', name: 'The VIP Hotel' },
    { id: '14', name: 'Hotel Sogo - Cagayan De Oro' },
    { id: '15', name: 'RedDoorz @ Camaman-An' },
    { id: '16', name: 'Chali Resort & Conference Center' },
    { id: '17', name: 'Win Min Transient Inn' },
    { id: '18', name: 'Red Planet Cagayan De Oro' },
    { id: '19', name: 'Grand City Hotel' },
    { id: '20', name: 'Mallberry Suites' },
    { id: '21', name: 'New Dawn Hotel Plus' },
    { id: '22', name: 'Bridge Hotel Express' },
    { id: '23', name: 'New Dawn Pensionne' },
    { id: '24', name: 'Demiren Hotel' },
    { id: '25', name: 'GC Suites' },
  ];

  // Load hotels with stored prices or generate them
  useEffect(() => {
    const loadHotelPrices = async () => {
      try {
        const storedPrices = await AsyncStorage.getItem('hotelPrices');
        if (storedPrices) {
          // If prices are stored, parse and load them
          setSortedHotels(JSON.parse(storedPrices));
        } else {
          // Otherwise, generate random prices and store them
          const hotelsWithPrices = hotelsData.map((hotel) => ({
            ...hotel,
            price: generateRandomPrice(),
          }));
          await AsyncStorage.setItem('hotelPrices', JSON.stringify(hotelsWithPrices));
          setSortedHotels(hotelsWithPrices);
        }
      } catch (error) {
        console.error('Error loading hotel prices:', error);
      }
    };

    loadHotelPrices();
  }, []);

  const handleHotelPress = (hotelName) => {
    setSelectedHotel(hotelName); // Set the selected hotel
  };

  // Render hotel item with bed information based on price
  const renderHotelItem = ({ item }) => {
    // Determine bed types based on price
    const bedInfo =
      item.price <= 3349
        ? '3 beds: 1 Queen size, 2 Regular beds'
        : '4 beds: 1 Queen size, 1 King size, 2 Regular beds';

    return (
      <TouchableOpacity
        style={[
          styles.hotelItem,
          selectedHotel === item.name && styles.selectedHotelItem, // Apply selected style
        ]}
        onPress={() => handleHotelPress(item.name)}
      >
        <Text
          style={[
            styles.hotelItemText,
            selectedHotel === item.name && styles.selectedHotelText, // Apply selected text style
          ]}
        >
          {item.name} - ₱{item.price}
        </Text>
        <Text style={styles.bedInfoText}>{bedInfo}</Text>
      </TouchableOpacity>
    );
  };

  // Function to sort the hotels by price (ascending or descending order)
  const sortHotelsByPrice = () => {
    const sorted = [...sortedHotels].sort((a, b) => {
      if (isSortedAscending) {
        return a.price - b.price; // Ascending order
      } else {
        return b.price - a.price; // Descending order
      }
    });
    setSortedHotels(sorted);
    setIsSortedAscending(!isSortedAscending); // Toggle sorting order
  };

  // Calculate the total amount to pay
  const calculateTotalAmount = () => {
    if (!selectedHotel || !checkIn || !checkOut) return;

    // Calculate the number of days between check-in and check-out
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate - checkInDate;
    const days = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

    if (days < 1) return; // Avoid invalid dates

    // Get the price of the selected hotel
    const hotel = sortedHotels.find((item) => item.name === selectedHotel);
    const roomPrice = hotel ? hotel.price : 0;

    // Additional cost for air conditioning and fan
    let additionalCost = 0;
    if (airConditioned && fanSelected) {
      additionalCost = 150; // Both air-conditioned and fan
    } else if (airConditioned) {
      additionalCost = 100; // Air-conditioned
    } else if (fanSelected) {
      additionalCost = 50; // Fan only
    }

    // Calculate total price
    const total = roomPrice + days * 300 + additionalCost;
    setTotalAmount(total); // Update the total amount state
  };

  // Trigger calculation whenever the user changes check-in, check-out, or selection
  useEffect(() => {
    calculateTotalAmount();
  }, [checkIn, checkOut, airConditioned, fanSelected, selectedHotel]);

  return (
    <ScrollView style={styles.container}>
      {/* Hotels Tab */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>Hotels</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Button to toggle sorting by price */}
      <TouchableOpacity style={styles.sortButton} onPress={sortHotelsByPrice}>
        <Text style={styles.sortButtonText}>
          Sort by Price: {isSortedAscending ? 'Low to High' : 'High to Low'}
        </Text>
      </TouchableOpacity>

      {/* Horizontal List of Hotel Names with Prices */}
      <FlatList
        data={sortedHotels}
        horizontal
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hotelListContainer}
      />

      {/* Check-in Date & Time */}
      <TextInput
        style={styles.input}
        placeholder="Check-in date & time (e.g., year-month-day time)"
        value={checkIn}
        onChangeText={setCheckIn}
      />

      {/* Check-out Date & Time */}
      <TextInput
        style={styles.input}
        placeholder="Check-out date & time (e.g., year-month-day time)"
        value={checkOut}
        onChangeText={setCheckOut}
      />

      {/* Guests Selection: Adults, Children, Rooms */}
      <View style={styles.guestInputContainer}>
        <TextInput
          style={[styles.guestInput, styles.input]}
          placeholder="Adults"
          keyboardType="numeric"
          value={adults}
          onChangeText={setAdults}
        />
        <TextInput
          style={[styles.guestInput, styles.input]}
          placeholder="Children"
          keyboardType="numeric"
          value={children}
          onChangeText={setChildren}
        />
        <TextInput
          style={[styles.guestInput, styles.input]}
          placeholder="Rooms"
          keyboardType="numeric"
          value={rooms}
          onChangeText={setRooms}
        />
      </View>

      {/* Fan/Air Conditioned */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleOption, fanSelected && styles.activeOption]}
          onPress={() => setFanSelected(!fanSelected)}
        >
          <Text>Fan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleOption, airConditioned && styles.activeOption]}
          onPress={() => setAirConditioned(!airConditioned)}
        >
          <Text style={airConditioned ? styles.activeTabText : {}}>Air conditioned</Text>
        </TouchableOpacity>
      </View>

      {/* Total Amount to Pay */}
      <Text style={styles.totalAmountText}>Total Amount: ₱{totalAmount}</Text>

      {/* Pay Button */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate('PaymentPage', { totalAmount })} // Pass totalAmount as a parameter
      >
        <Text style={styles.searchButtonText}>PAY</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text onPress={() => navigation.navigate('FindRoom')} style={styles.footerText}>Room</Text>
        <Text onPress={() => navigation.navigate('UserProfile')} style={styles.footerText}>Profile</Text>
        <Text onPress={() => navigation.navigate('SettingsPage')} style={styles.footerText}>Settings</Text>
       <Text style={styles.footerText}>© 2024, All rights reserved.</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  activeTab: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sortButton: {
    backgroundColor: '#00C6AE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  hotelListContainer: {
    paddingVertical: 8,
  },
  hotelItem: {
    backgroundColor: '#ddd',
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  selectedHotelItem: {
    backgroundColor: '#00C6AE', // Highlight background color when selected
  },
  hotelItemText: {
    fontSize: 14,
    color: '#333',
  },
  selectedHotelText: {
    color: '#fff', // Highlight text color when selected
  },
  bedInfoText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  guestInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guestInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  toggleOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  activeOption: {
    backgroundColor: '#007BFF',
  },
  searchButton: {
    backgroundColor: '#00C6AE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 16,
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },
});

export default FindRoom;
