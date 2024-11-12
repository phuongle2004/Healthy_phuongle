import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Section from '../componenttt2/Section';

interface Todo {
  id: string;
  bietOn: string;
  hanhPhuc: string;
  date: string;
  color: string;
}

const App = () => {
  const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFF9C4', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#CFD8DC'];

  const [todos, setTodos] = useState<Todo[]>([]);
  const [bietOn, setBietOn] = useState<string>('');
  const [hanhPhuc, setHanhPhuc] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [editId, setEditId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [dailyGoal, setDailyGoal] = useState<number>(5); // Mục tiêu hàng ngày là 5 điều
  const [writtenToday, setWrittenToday] = useState<number>(0); // Số lượng đã viết hôm nay

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await firestore().collection('note').get();
      const fetchedTodos = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        date: doc.data().date.toString(),
      })) as Todo[];
      setTodos(fetchedTodos);
      updateWrittenToday(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const validateDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) {
      return false;
    }
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return false;
    }
    return dateString === date.toISOString().split('T')[0];
  };

  const updateWrittenToday = (todos: Todo[]) => {
    const today = new Date().toISOString().split('T')[0];
    const count = todos.filter(todo => todo.date === today).length;
    setWrittenToday(count);
  };

  const addTodo = async () => {
    if (!validateDate(date)) {
      Alert.alert('Invalid Date', 'Please enter a valid date in the format YYYY-MM-DD.');
      return;
    }
    if (editId !== null) {
      setTodos(todos.map(todo => (todo.id === editId ? { ...todo, bietOn, hanhPhuc, date } : todo)));
      await firestore().collection('note').doc(editId).update({
        bietOn,
        hanhPhuc,
        date,
      });
      setEditId(null);
    } else {
      const newTodo: Todo = { 
        id: Date.now().toString(), 
        bietOn, 
        hanhPhuc, 
        date, 
        color: colors[Math.floor(Math.random() * colors.length)] 
      };
      setTodos([...todos, newTodo]);
      await firestore().collection('note').add({
        bietOn,
        hanhPhuc,
        date,
        color: newTodo.color,
      });
      updateWrittenToday([...todos, newTodo]);
    }
    setBietOn('');
    setHanhPhuc('');
    setDate(new Date().toISOString().split('T')[0]);
    setModalVisible(false);
  };

  const deleteTodo = async (id: string) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: async () => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        await firestore().collection('note').doc(id).delete();
        updateWrittenToday(updatedTodos);
      } },
    ]);
  };

  const editTodo = (todo: Todo) => {
    setBietOn(todo.bietOn);
    setHanhPhuc(todo.hanhPhuc);
    setDate(todo.date);
    setEditId(todo.id);
    setModalVisible(true);
  };

  const filteredTodos = todos.filter(todo => todo.date.includes(search));

  const renderItem = ({ item }: { item: Todo }) => (
    <Section style={[styles.todoItem, { backgroundColor: item.color }]}>
      <Text style={styles.bietOnTitle}>Date: {item.date}</Text>
      <Text style={styles.todoContent}>Điều biết ơn: {item.bietOn}</Text>
      <Text style={styles.todoContent}>Hạnh phúc: {item.hanhPhuc}</Text>
      <View style={styles.todoActions}>
        <TouchableOpacity onPress={() => editTodo(item)} style={styles.actionButton}>
          <Image source={require('../componenttt2/img/edit.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.actionButton}>
          <Image source={require('../componenttt2/img/bin.png')} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </Section>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Note</Text>
      <Text style={styles.dailyGoal}>Mục tiêu: {writtenToday}/{dailyGoal} điều trong ngày</Text>
      
      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Search by date (YYYY-MM-DD)"
      />
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{editId !== null ? 'Edit Note' : 'Add Note'}</Text>
            <TextInput
              style={styles.input}
              value={bietOn}
              onChangeText={setBietOn}
              placeholder="Biết ơn"
            />
            <TextInput
              style={styles.input}
              value={hanhPhuc}
              onChangeText={setHanhPhuc}
              placeholder="Hạnh phúc"
            />
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="Date (YYYY-MM-DD)"
              keyboardType="numeric"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={addTodo}>
                <Text style={styles.modalButtonText}>{editId !== null ? 'Update' : 'Add'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dailyGoal: {
    fontSize: 16,
    marginBottom: 10,
    color: '#007AFF',
  },
  completedGoal: {
    fontSize: 16,
    marginBottom: 20,
    color: '#28A745',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 60,
  },
  todoItem: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  bietOnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 10,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
