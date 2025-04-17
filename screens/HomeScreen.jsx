import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

const categoryColors = {
  University: '#5C9DFF',
  Home: '#FF6B6B',
  Work: '#FFB74D',
  Personal: '#957DAD',
};

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route.params?.newTask && isFocused) {
      setTasks((prevTasks) => [route.params.newTask, ...prevTasks]);
    }
  }, [route.params?.newTask, isFocused]);

  const renderTaskItem = ({ item }) => {
    const taskTime = new Date(item.date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={styles.taskCard}>
        <View style={styles.taskRow}>
          <TouchableOpacity style={styles.circle} />
          <View style={{ flex: 1 }}>
            <Text style={styles.taskTitle}>{item.taskName}</Text>
            <Text style={styles.taskTime}>Today at {taskTime}</Text>
          </View>

          {item.category ? (
            <View
              style={[styles.categoryTag, { backgroundColor: categoryColors[item.category] || '#ccc' }]}
            >
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          ) : null}

          <View style={styles.commentBox}>
            <Ionicons name="chatbubble-outline" size={14} color="#B0B0B0" />
            <Text style={styles.commentCount}>1</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Index</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          placeholder="Search for your task..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>Today</Text>
        <Ionicons name="chevron-down-outline" size={16} color="#fff" />
      </TouchableOpacity>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTaskScreen', { onAddTask: (newTask) => setTasks((prevTasks) => [newTask, ...prevTasks]) })}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#8A63D2" />
          <Text style={[styles.navText, { color: '#8A63D2' }]}>Index</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
        <View style={{ width: 60 }} />
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('FocusScreen')}
        >
          <Ionicons name="timer-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Focus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    color: '#fff',
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 20,
  },
  filterText: {
    color: '#fff',
    marginRight: 4,
  },
  taskCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 15,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  taskTime: {
    color: '#999',
    fontSize: 13,
  },
  categoryTag: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 10,
  },
  commentCount: {
    color: '#B0B0B0',
    fontSize: 12,
    marginLeft: 3,
  },
  fab: {
    backgroundColor: '#8A63D2',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 75,
    alignSelf: 'center',
    elevation: 6,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default HomeScreen;
