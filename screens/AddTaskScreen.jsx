import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const priorities = ['High', 'Medium', 'Low'];
const categories = ['Work', 'Home', 'University', 'Personal', 'Shopping'];

const AddTaskScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');

  const handleSaveTask = async () => {
    if (!taskName || !priority || !category) {
      alert('Please fill in all required fields.');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('User not authenticated.');
      return;
    }

    const newTask = {
      taskName,
      description,
      date: date.toISOString(),
      priority,
      category,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'tasks'), newTask);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding task to Firestore:', error);
      alert('Failed to save task. Try again.');
    }
  };

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate || date);
    setDatePickerVisible(false);
  };

  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add New Task</Text>

      <Text style={styles.label}>Task Name *</Text>
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Enter task name"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Date *</Text>
      <TouchableOpacity style={styles.input} onPress={openDatePicker}>
        <Text style={styles.dateText}>
          {date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
      />

      <Text style={styles.label}>Priority *</Text>
      <View style={styles.pillContainer}>
        {priorities.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.pill, priority === item && styles.pillSelected]}
            onPress={() => setPriority(item)}
          >
            <Text style={[styles.pillText, priority === item && styles.pillTextSelected]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Category *</Text>
      <View style={styles.pillContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.pill, category === item && styles.pillSelected]}
            onPress={() => setCategory(item)}
          >
            <Text style={[styles.pillText, category === item && styles.pillTextSelected]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveTask}
        disabled={!taskName || !priority || !category}
      >
        <Ionicons name="checkmark" size={24} color="#fff" />
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  heading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#aaa',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#2A2A2A',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateText: {
    color: '#fff',
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
  },
  pill: {
    borderWidth: 1,
    borderColor: '#888',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  pillSelected: {
    backgroundColor: '#8A63D2',
    borderColor: '#8A63D2',
  },
  pillText: {
    color: '#aaa',
    fontSize: 14,
  },
  pillTextSelected: {
    color: '#fff',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8A63D2',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
