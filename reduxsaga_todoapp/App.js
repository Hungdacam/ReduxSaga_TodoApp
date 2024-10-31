import React, { useEffect } from 'react';
import { Text, View, TextInput, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosRequest, addTodoRequest, updateTodoRequest, deleteTodoRequest } from './store/actions';
import ReduxProvider from './store/store';

function DataComponent({ data, loading, error, onSelectItem }) {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const limitedData = data ? data.slice(0, 20) : [];

  return (
    <ScrollView contentContainerStyle={styles.dataContainer}>
      {limitedData.map(item => (
        <TouchableOpacity key={item.id} style={styles.dataItem} onPress={() => onSelectItem(item)}>
          <Text style={styles.dataText}>{item.id}: {item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector(state => state);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const handleAdd = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a valid title");
      return;
    }
    dispatch(addTodoRequest(inputValue));
    setInputValue("");
  };

  const handleUpdate = () => {
    if (!selectedItem) {
      alert("Please select an item to update");
      return;
    }
    if (inputValue.trim() === "") {
      alert("Please enter a valid title");
      return;
    }
    dispatch(updateTodoRequest(selectedItem.id, inputValue));
    setInputValue("");
    setSelectedItem(null);
  };

  const handleDelete = () => {
    if (!selectedItem) {
      alert("Please select an item to delete");
      return;
    }
    dispatch(deleteTodoRequest(selectedItem.id));
    alert("Deleted item: " + selectedItem.title);
    setSelectedItem(null);
    setInputValue("");
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setInputValue(item.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List App</Text>

      <TextInput 
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter a todo item"
        style={styles.input}
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={handleAdd} />
        <Button title="Update" onPress={handleUpdate} />
        <Button title="Delete" onPress={handleDelete} />
      </View>

      <DataComponent data={todos} loading={loading} error={error} onSelectItem={handleSelectItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dataContainer: {
    padding: 10,
  },
  dataItem: {
    backgroundColor: '#2196F3',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  dataText: {
    fontSize: 18,
    color: '#FFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

// Wrap your App component with ReduxProvider in your entry point file
import { registerRootComponent } from 'expo';
registerRootComponent(() => (
  <ReduxProvider>
    <App />
  </ReduxProvider>
));
