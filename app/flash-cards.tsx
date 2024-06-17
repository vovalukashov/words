import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Flashcards from "@/components/Flashcards";
import { WordData } from "@/interfaces/WordData";
import { useRouter } from "expo-router";
import { loadGuesses, loadWords, saveGuesses } from "@/services/storageService";

const FlashcardsScreen = () => {
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

  const handleCorrectGuess = (word: string) => {
    const newGuesses = { ...guesses, [word]: (guesses[word] || 0) + 1 };
    setGuesses(newGuesses);
    saveGuesses(newGuesses);
  };

  const handleIncorrectGuess = (word: string) => {
    const newGuesses = {
      ...guesses,
      [word]: Math.max((guesses[word] || 0) - 1, 0),
    };
    setGuesses(newGuesses);
    saveGuesses(newGuesses);
  };

  return (
    words && (
      <View style={styles.container}>
        <Flashcards
          words={words}
          onCorrectGuess={handleCorrectGuess}
          onIncorrectGuess={handleIncorrectGuess}
          guesses={guesses}
        />
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

export default FlashcardsScreen;
