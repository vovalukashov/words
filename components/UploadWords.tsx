import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";

interface UploadWordsProps {
  onWordsLoaded: (words: string[]) => void;
}

const UploadWords: React.FC<UploadWordsProps> = ({ onWordsLoaded }) => {
  const [words, setWords] = useState("");

  const handleUpload = () => {
    const wordArray = words.split(",").map((word) => word.trim());
    onWordsLoaded(wordArray);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Введите слова через запятую"
        value={words}
        onChangeText={setWords}
        mode="outlined"
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleUpload}>
        Загрузить
      </Button>
    </View>
  );
};

export default UploadWords;
