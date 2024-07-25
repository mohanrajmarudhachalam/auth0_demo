import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
const customScheme = 'com.okbosstaskernew.app'; 
function Home() {
  const { authorize,  clearSession, user, error, getCredentials } = useAuth0();
  const onLogin = async () => {
    try {
      await authorize({
        scope: 'openid profile email'
      }, {
        customScheme: customScheme
      });
      console.log('AUTH0')
    } catch (e) {
      //throw Error('There was an issue authenticating the user. Please try again.');
    }
    console.log(error)
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0 React Native - Login </Text>
        {user && <Text>You are logged in as {user.name}</Text>}
        {!user && <Text>You are not logged in</Text>}
        {error && <Text>{error.message}</Text>}
        <Button
        onPress={onLogin}
        title={'Log In'}
      />
    </View>
  );
}

export default function App() {
  return (
    <Auth0Provider domain="dev-kd2w18x3.us.auth0.com" clientId="A3uHag1SUjbFZ1pqHM8yXlrjncsQOHz9"> 
      <Home />
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
