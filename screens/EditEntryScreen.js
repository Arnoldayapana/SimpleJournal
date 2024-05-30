import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity,Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditEntryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { entry } = route.params;
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);

  const saveEntry = async () => {
    const updatedEntry = { ...entry, title, content };
    const storedEntries = await AsyncStorage.getItem('entries');
    const entries = storedEntries ? JSON.parse(storedEntries) : [];
    const updatedEntries = entries.map((e) => (e.id === entry.id ? updatedEntry : e));
    await AsyncStorage.setItem('entries', JSON.stringify(updatedEntries));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={saveEntry}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
      },
      titleInput: {
        height: 40,
        borderColor: 'purple',
        borderWidth: 2,
        padding: 8,
        marginBottom: 16,
        borderRadius: 8,
      },
      contentInput: {
        height: 200,
        borderColor: '#000000',
        borderWidth: 1,
        padding: 8,
        textAlignVertical: 'top',
        borderRadius: 8,
        marginBottom: 16,
      },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default EditEntryScreen;