import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,  // This hides the top navbar
      }}
    />
  );
};

export default Layout;
