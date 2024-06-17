import AsyncStorage from "@react-native-async-storage/async-storage";
import { WordData } from "@/interfaces/WordData";

const WORDS_KEY = "words";
const GUESSES_KEY = "guesses";

export const saveWords = async (words: WordData[]) => {
  try {
    const jsonValue = JSON.stringify(words);
    await AsyncStorage.setItem(WORDS_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save words.", e);
  }
};

export const loadWords = async (): Promise<WordData[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(WORDS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load words.", e);
    return null;
  }
};

export const saveGuesses = async (guesses: Record<string, number>) => {
  try {
    const jsonValue = JSON.stringify(guesses);
    await AsyncStorage.setItem(GUESSES_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save guesses.", e);
  }
};

export const loadGuesses = async (): Promise<Record<string, number> | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(GUESSES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load guesses.", e);
    return null;
  }
};
