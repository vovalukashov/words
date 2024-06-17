import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { WordData } from "@/interfaces/WordData";

interface WordListProps {
  words: WordData[];
  guesses: Record<string, number>;
}

const WordList: React.FC<WordListProps> = ({ words, guesses }) => {
  const renderItem = ({ item }: { item: WordData }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.word}>{item.word}</Text>
      <Text style={styles.translation}>{item.translation}</Text>
      <Text style={styles.guesses}>
        Правильных ответов: {guesses[item.word] || 0} / 5
      </Text>
    </View>
  );

  return (
    <FlatList
      data={words}
      renderItem={renderItem}
      keyExtractor={(item) => item.word}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  word: {
    fontSize: 18,
    fontWeight: "bold",
  },
  translation: {
    fontSize: 16,
    color: "#555",
  },
  guesses: {
    fontSize: 14,
    color: "#888",
  },
});

export default WordList;
