import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Générer le code"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
