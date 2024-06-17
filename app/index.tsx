import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => router.push("/upload")}
        style={styles.button}
      >
        Добавить слова
      </Button>
      <Button
        mode="contained"
        onPress={() => router.push("/flash-cards")}
        style={styles.button}
      >
        Тренировка
      </Button>
      <Button
        mode="contained"
        onPress={() => router.push("/wordlist")}
        style={styles.button}
      >
        Список слов
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;
