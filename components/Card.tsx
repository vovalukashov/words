import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import * as Speech from "expo-speech";
import leven from "leven";
import { getSynonyms } from "@/services/synonymService";

interface CardProps {
  sentences: string[];
  word: string;
  translation: string;
  fullTranslations: string[];
  correctCount: number;
  onCorrectGuess: (word: string) => void;
  onIncorrectGuess: (word: string) => void;
  onNextCard: () => void;
}

const Card: React.FC<CardProps> = ({
  sentences,
  word,
  translation,
  fullTranslations,
  correctCount,
  onCorrectGuess,
  onIncorrectGuess,
  onNextCard,
}) => {
  const [input, setInput] = useState("");
  const [answerStatus, setAnswerStatus] = useState<
    "correct" | "incorrect" | "initial"
  >("initial");
  const [randomIndex, setRandomIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [synonyms, setSynonyms] = useState<string[]>([]);

  useEffect(() => {
    setInput("");
    setAnswerStatus("initial");
    setRandomIndex(Math.floor(Math.random() * sentences.length));
    fetchSynonyms();
  }, [sentences]);

  const fetchSynonyms = async () => {
    const fetchedSynonyms = await getSynonyms(word);
    setSynonyms(fetchedSynonyms);
  };

  const handleCheck = () => {
    const distance = leven(input.toLowerCase(), word.toLowerCase());

    if (input.toLowerCase() === word.toLowerCase()) {
      setAnswerStatus("correct");
      setMessage("");
      onCorrectGuess(word);
      Speech.speak(sentences[randomIndex].replace(word, input), {
        voice: "Aaron",
        pitch: 1,
        rate: 1,
      });
      setTimeout(() => {
        onNextCard();
      }, 1000);
    } else if (distance <= 2) {
      setAnswerStatus("incorrect");
      setMessage("Вы ввели похожее слово, попробуйте еще раз.");
    } else if (synonyms.includes(input.toLowerCase())) {
      setAnswerStatus("incorrect");
      setMessage("Вы ввели синоним слова, попробуйте еще раз.");
    } else {
      setAnswerStatus("incorrect");
      setMessage("");
      onIncorrectGuess(word);
      Speech.speak(sentences[randomIndex].replace(word, word), {
        voice: "Aaron",
        pitch: 1,
        rate: 1,
      });
      setInput(word);
      setTimeout(() => {
        onNextCard();
      }, 1000);
    }
  };

  const handleChangeText = (text: string) => {
    setInput(text);
    setAnswerStatus("initial");
    setMessage("");
  };

  const renderSentenceWithInput = () => {
    const parts = sentences[randomIndex].split(word);
    return (
      <Text style={styles.sentence}>
        {parts[0]}
        <TextInput
          value={input}
          onChangeText={handleChangeText}
          style={[
            styles.input,
            answerStatus === "initial" && { borderBottomColor: "black" },
            answerStatus === "correct" && { borderBottomColor: "green" },
            answerStatus === "incorrect" && { borderBottomColor: "red" },
          ]}
        />
        {parts[1]}
      </Text>
    );
  };

  return (
    <View>
      {renderSentenceWithInput()}
      <Text style={styles.translation}>Перевод слова: {translation}</Text>
      <Text style={styles.translation}>
        Полный перевод предложения: {fullTranslations[randomIndex]}
      </Text>
      <Text style={styles.translation}>
        Правильных ответов: {correctCount} / 5
      </Text>
      <View>
        <ProgressBar
          progress={correctCount / 5}
          color="green"
          style={styles.progressBar}
        />
      </View>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Button mode="contained" onPress={handleCheck} style={styles.button}>
        Проверить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  sentence: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    ...(Platform.OS === "web" ? { outlineWidth: 0 } : {}),
    backgroundColor: "transparent",
    borderBottomColor: "black",
    borderStyle: "solid",
    borderBottomWidth: 2,
    width: 100,
    padding: 0,
    fontSize: 18,
  },
  translation: {
    fontSize: 18,
    marginBottom: 20,
  },
  progressBar: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  message: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Card;
