import { Stack } from 'expo-router';

export default function MoreLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="canvases" />
      <Stack.Screen name="lists" />
      <Stack.Screen name="assigned" />
      <Stack.Screen name="connections" />
    </Stack>
  );
}