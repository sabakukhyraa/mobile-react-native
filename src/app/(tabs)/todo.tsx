import { Pressable, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc, query, where, setDoc } from 'firebase/firestore'
import { FIREBASE_AUTH, FIREBASE_DB } from '@/Firebase';

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

  const todosCollection = collection(FIREBASE_DB, 'todos')

  const getter = async () => {
    const q = query(todosCollection, where("userId", "==", auth.currentUser?.uid || ''))
    const querySnapshots = await getDocs(q);
    const newTodos: Todo[] = [];
    querySnapshots.forEach((doc) => {
      const { value, isDone, userId } = doc.data()
      newTodos.push({ id: doc.id, value, isDone, userId });
    });
    setTodos(newTodos);
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const todos = await getter();
        // Gelen verileri işleme
      } catch (error) {
        console.error(error);
      }
    } else {
    }
  });

  const addTodo = async () => {
    if (todo.length > 0) {
      const userId = auth.currentUser?.uid ?? 'defaultUser';
      const newTodo = { value: todo, isDone: false, userId: userId }
      const newDocRef = await addDoc(todosCollection, newTodo);
      setTodos([...todos, { id: newDocRef.id, value: todo, isDone: false, userId: userId }]);
      setTodo('');
    }
  };

  const removeTodo = async (todoId: string) => {
    await deleteDoc(doc(todosCollection, todoId))
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const doneTodo = async (item: Todo) => {

    const myDocRef = doc(todosCollection, item.id)

    await setDoc(myDocRef, { value: item.value, isDone: !item.isDone, userId: item.userId })
    setTodos(todos.map(todo => {
      if (todo.id === item.id) {
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
            <TouchableOpacity onPress={() => doneTodo(item)} onLongPress={() => removeTodo(item.id)}>
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
