// components/TabBottomMenu.js
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export function TabBottomMenu({ selectedTabName, onPress, todoList }) {
  const [barPosition, setBarPosition] = useState(0);

  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: tabName === selectedTabName ? "#2F76E5" : "black",
    };
  }

  function handlePress(tabName, index) {
    setBarPosition(index);
    onPress(tabName);
  }

  // Fonction pour compter les tâches par statut
  const countByStatus = todoList.reduce(
    (acc, unTodo) => {
      if (unTodo.isCompleted) {
        acc.done++;
      } else {
        acc.inProgress++;
      }
      return acc;
    },
    { all: todoList.length, inProgress: 0, done: 0 }
  );

  // Calcul de la position du trait
  const barWidth = 100 / 3; // Largeur de chaque segment
  const barLeft = barPosition * barWidth; // Calcul de la position de départ

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress("all", 0)}>
        <Text style={getTextStyle("All")}>All ({countByStatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("inProgress", 1)}>
        <Text style={getTextStyle("In Progress")}>
          In progress ({countByStatus.inProgress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("done", 2)}>
        <Text style={getTextStyle("Done")}>Done ({countByStatus.done})</Text>
      </TouchableOpacity>
      <View style={[styles.bar, { left: `${barLeft}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    position: "relative", // Ajout de la propriété position
  },
  bar: {
    position: "absolute",
    bottom: 0,
    height: 3,
    backgroundColor: "#2F76E5",
    width: "33.33%",
    transitionProperty: "left",
    transitionDuration: "0.3s",
  },
});

export default TabBottomMenu;
