import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import UploadWords from "@/components/UploadWords";
import { WordData } from "@/interfaces/WordData";
import { generateSentence, translateText } from "@/services/openAIService";
import { saveWords } from "@/services/storageService";
import { useRouter } from "expo-router";

const UploadWordsScreen = () => {
  const router = useRouter();

  const handleWordsLoaded = (loadedWords: WordData[]) => {
    saveWords(loadedWords);
  };

  const handleUpload = async (words: string[]) => {
    const wordDataArray: WordData[] = [];
    for (const word of words) {
      const translation = await translateText(word);
      const sentence = await generateSentence(word);
      const fullTranslation = await translateText(sentence);
      wordDataArray.push({
        word,
        translation,
        sentences: [sentence],
        fullTranslations: [fullTranslation],
      });
    }
    handleWordsLoaded(wordDataArray);
  };

  return (
    <View style={styles.container}>
      <UploadWords onWordsLoaded={handleUpload} />
      <Button
        mode="contained"
        onPress={() => router.push("/")}
        style={{ marginTop: 20 }}
      >
        Назад
      </Button>
    </View>
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

export default UploadWordsScreen;
