import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import WordList from "@/components/WordList";
import { WordData } from "@/interfaces/WordData";
import { useRouter } from "expo-router";
import { loadGuesses, loadWords } from "@/services/storageService";

const WordListScreen = () => {
  const router = useRouter();
  const [words, setWords] = useState<WordData[] | null>(null);
  const [guesses, setGuesses] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadData = async () => {
      const loadedWords = await loadWords();
      const loadedGuesses = await loadGuesses();
      if (loadedWords) setWords(loadedWords);
      if (loadedGuesses) setGuesses(loadedGuesses);
    };

    loadData();
  }, []);

  return (
    words && (
      <View style={styles.container}>
        <WordList words={words} guesses={guesses} />
        <Button
          mode="contained"
          onPress={() => router.push("/")}
          style={{ marginTop: 20 }}
        >
          Назад
        </Button>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default WordListScreen;
