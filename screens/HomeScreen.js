import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEntries = async () => {
    const storedEntries = await AsyncStorage.getItem('entries');
    if (storedEntries) setEntries(JSON.parse(storedEntries));
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEntries().then(() => setRefreshing(false));
  }, []);

  const deleteEntry = async (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    await AsyncStorage.setItem('entries', JSON.stringify(updatedEntries));
  };

  const renderEntry = ({ item }) => (
    <View style={styles.entryContainer}>
      <TouchableOpacity
        style={styles.entry}
        onPress={() => navigation.navigate('ViewEntry', { entry: item })}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteEntry(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEntry}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateEntry')}>
        <Text style={styles.addButtonText}>Add New Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#fff',
    height:50,
  },
  entry: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height:40,
    marginRight:3,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'purple',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
