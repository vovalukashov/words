import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Главная" }} />
      <Stack.Screen name="home" options={{ title: "Домашняя страница" }} />
      <Stack.Screen name="flashcards" options={{ title: "Карточки" }} />
      <Stack.Screen name="upload" options={{ title: "Загрузка слов" }} />
      <Stack.Screen name="wordlist" options={{ title: "Список слов" }} />
    </Stack>
  );
}
