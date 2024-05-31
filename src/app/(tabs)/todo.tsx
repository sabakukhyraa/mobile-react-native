import { Pressable, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@/Firebase';

interface Todo {
  id: string;
  value: string;
  isDone: boolean;
  userId: string;
}

const auth = getAuth()

export default function TodoScreen() {

  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);


  const getter = async () => {
    setTodos([])
    const q = query(collection(FIREBASE_DB, 'todos'), where("userId", "==", auth.currentUser?.uid || ''))
    const querySnapshots = await getDocs(q);
    const newTodos: Todo[] = [];
    querySnapshots.forEach((doc) => {
      const a = doc.data()
      if (todos.find(todo => a.id == todo.id)) {
      } else {
        newTodos.push({ id: doc.id, value: a.value, isDone: a.isDone, userId: a.userId });
      }
    });

    setTodos((prevTodos) => [...prevTodos, ...newTodos]);
  }

  useEffect(() => {
    getter()
  }, []);

  const addTodo = async () => {
    if (todo.length > 0) {
      const userId = auth.currentUser?.uid ?? 'defaultUser';
      const myCollection = collection(FIREBASE_DB, 'todos')
      const newTodo = { value: todo, isDone: false, userId: userId }
      const newDocRef = await addDoc(myCollection, newTodo);
      setTodos([...todos, { id: newDocRef.id, value: todo, isDone: false, userId: userId }]);
      setTodo('');
    }
  };

  const removeTodo = (todoId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const doneTodo = (todoId: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do's</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.listSection}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add a todo"
            placeholderTextColor="rgba(255,255,255,.6)"
            style={styles.input}
            onChangeText={text => setTodo(text)}
            value={todo}
          />
          <Pressable style={styles.button} onPress={addTodo}>
            <Text style={styles.buttonText}>
              Add todo
            </Text>
          </Pressable>
        </View>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => doneTodo(item.id)} onLongPress={() => removeTodo(item.id)}>
              <View style={[styles.todoItem, item.isDone && styles.todoItemDone]}>
                <Text style={item.isDone ? styles.todoTextDone : styles.todoText}>{item.value}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  listSection: {
    paddingHorizontal: 12,
    width: '100%',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
    width: '100%',
    gap: 12
  },
  input: {
    width: '100%',
    height: 44,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: .2,
    borderBottomColor: 'white',
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
  },
  todoItem: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  todoItemDone: {
    backgroundColor: 'rgb(200, 255, 200)',
  },
  todoText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16
  },
  todoTextDone: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});
