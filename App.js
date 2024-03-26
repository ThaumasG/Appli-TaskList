import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importez AsyncStorage pour stocker les données
import styles from "./App.style";
import CardToDo from "./components/CardToDo";
import TabBottomMenu from "./components/TabBottomMenu";

const App = () => {
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    loadTodoList(); // Chargez la liste des tâches au chargement du composant
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      saveTodoList(); // Sauvegardez la liste des tâches à chaque mise à jour
    } else {
      isFirstRender = false; // Marquez la première rendu comme terminée
    }
  }, [todoList]); // Utilisez la liste des tâches comme dépendance pour surveiller les mises à jour

  const saveTodoList = async () => {
    console.log("SAVE");
    try {
      await AsyncStorage.setItem("@todolist", JSON.stringify(todoList));
    } catch (err) {
      alert("Erreur " + err);
    }
  };

  const loadTodoList = async () => {
    console.log("LOAD");
    try {
      const stringifiedTodoList = await AsyncStorage.getItem("@todolist");
      if (stringifiedTodoList !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        setTodoList(parsedTodoList);
      }
    } catch (err) {
      alert("Erreur " + err);
    }
  };

  const handleTabPress = (tabName) => {
    setSelectedTabName(tabName);
  };

  const filteredTodoList = todoList.filter((todo) => {
    if (selectedTabName === "inProgress") {
      return !todo.isCompleted;
    } else if (selectedTabName === "done") {
      return todo.isCompleted;
    } else {
      return true;
    }
  });

  const updateTodoStatus = (todoId) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        id: todoList.length + 1,
        title: newTaskTitle,
        isCompleted: false,
      };
      setTodoList([...todoList, newTask]);
      setNewTaskTitle("");
      toggleModal();
    } else {
      Alert.alert("Erreur", "Veuillez saisir le titre de la tâche.");
    }
  };

  const deleteTodo = (todoToDelete) => {
    Alert.alert(
      "Suppression",
      "Supprimer cette tâche ?",
      [
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setTodoList((prevTodoList) =>
              prevTodoList.filter((todo) => todo.id !== todoToDelete.id)
            );
          },
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.header}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>
          Tu as probablement des trucs à faire
        </Text>
      </View>
      <ScrollView style={styles.body}>
        {filteredTodoList.map((task) => (
          <CardToDo
            key={task.id}
            toDo={task}
            onPress={() => updateTodoStatus(task.id)}
            onLongPress={() => deleteTodo(task)}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TabBottomMenu
          onPress={handleTabPress}
          selectedTabName={selectedTabName}
          todoList={todoList}
        />
        <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter une tâche</Text>
            <TextInput
              style={styles.input}
              placeholder="Titre de la tâche"
              value={newTaskTitle}
              onChangeText={(text) => setNewTaskTitle(text)}
            />
            <Button title="Ajouter" onPress={handleAddTask} />
            <Button title="Annuler" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

let isFirstRender = true; // Déclarez isFirstRender en dehors du composant pour qu'il soit persistant
export default App;
