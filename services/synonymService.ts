import axios from "axios";

export const getSynonyms = async (word: string): Promise<string[]> => {
  try {
    const response = await axios.get("https://api.datamuse.com/words", {
      params: {
        rel_syn: word,
        max: 10,
      },
    });
    return response.data.map((item: { word: string }) => item.word);
  } catch (error) {
    console.error("Error fetching synonyms:", error);
    return [];
  }
};
