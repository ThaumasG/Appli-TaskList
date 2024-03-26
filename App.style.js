import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F9F9F9",
    backgroundColor: "#F9F9F9",
  },
  headerImage: {
    width: 150,
    height: 50,
    marginBottom: 10, // Ajout de marge inférieure pour séparer l'image du texte
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F9F9F9",
    borderBottomColor: "#F9F9F9",
    backgroundColor: "#F9F9F9",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  tabMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#F9F9F9",
  },
  tabMenuItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabMenuItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default styles;
