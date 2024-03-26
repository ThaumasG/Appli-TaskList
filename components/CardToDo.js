// components/CardToDo.js
import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

const CardToDo = ({ toDo, onPress, onLongPress }) => {
  // Fonction pour gérer le clic sur la carte
  const handlePress = () => {
    onPress(toDo.id); // Transmettre l'ID de la tâche au lieu de toute la tâche
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      onLongPress={onLongPress}
    >
      <Text style={[styles.cardText, toDo.isCompleted && styles.completedText]}>
        {toDo.title}
      </Text>
      {!toDo.isCompleted && (
        <Image
          source={require("../assets/check.png")}
          style={styles.cardImage}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  cardImage: {
    width: 20,
    height: 20,
  },
});

export default CardToDo;
