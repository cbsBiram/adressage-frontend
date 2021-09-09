import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppLoading from "expo-app-loading";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import NoAccountNavigator from "./app/navigation/NoAccountNavigator";
import * as Sentry from "@sentry/react-native";
import * as Sentry from 'sentry-expo';

import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'YOUR DSN HERE',
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

// Access any @sentry/react-native exports via:
Sentry.Native.*

// Access any @sentry/browser exports via:
Sentry.Browser.*

Sentry.init({
  dsn: "https://a7a5844fe3d446518148480bce6ac2b6@o988745.ingest.sentry.io/5945748",
});

export default function App() {
  
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onError={(e) => console.warn(e)}
        onFinish={() => setIsReady(true)}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <NoAccountNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

