import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type formTypes = {
  navigation: any;
};

function Form({navigation}: formTypes): JSX.Element {
  const [text, setText] = useState('');
  
  const onPressSubmit = () => {
    navigation.navigate('country-details', {
      country: text,
    });
  };

  const onChangeText = (val: string) => {
    setText(val);
  };

  return (
    <SafeAreaView >
      <View style={styles.sectionContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="please enter country name"
          data-testid="text-input"
        />
        <Button
          title="submit"
          disabled={text === '' ? true : false}
          onPress={onPressSubmit}
          data-testid="submit-button"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Form;
