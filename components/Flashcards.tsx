import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import Card from "./Card";
import { WordData } from "@/interfaces/WordData";

interface FlashcardsProps {
  words: WordData[];
  onCorrectGuess: (word: string) => void;
  onIncorrectGuess: (word: string) => void;
  guesses: Record<string, number>;
}

const Flashcards: React.FC<FlashcardsProps> = ({
  words,
  onCorrectGuess,
  onIncorrectGuess,
  guesses,
}) => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((currentCard + 1) % words.length);
  };

  const currentWordData = words[currentCard];

  return (
    <View style={{ padding: 20 }}>
      <Card
        sentences={currentWordData.sentences}
        word={currentWordData.word}
        translation={currentWordData.translation}
        fullTranslations={currentWordData.fullTranslations}
        correctCount={guesses[currentWordData.word] || 0}
        onCorrectGuess={onCorrectGuess}
        onIncorrectGuess={onIncorrectGuess}
        onNextCard={nextCard}
      />
      <Button mode="contained" onPress={nextCard} style={{ marginTop: 20 }}>
        Следующая карточка
      </Button>
    </View>
  );
};

export default Flashcards;
