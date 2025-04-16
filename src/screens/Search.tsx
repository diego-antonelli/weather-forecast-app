import React, {useState} from 'react';
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';
import {TextBox} from '../ui-components/TextBox.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../ui-components/theme.ts';
import {Text} from '../ui-components/Text.tsx';

const cities = ['San Francisco', 'San Antonio', 'San Diego'];

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <TextBox
        label="Search for a city..."
        containerStyle={styles.input}
        value={query}
        onChange={setQuery}
      />
      <FlatList
        data={cities.filter(city =>
          city.toLowerCase().includes(query.toLowerCase()),
        )}
        renderItem={({item}) => (
          <AnimatedView animation="fadeInUp">
            <TouchableOpacity
              style={[
                styles.item,
                {backgroundColor: theme.secondaryBackgroundColor},
              ]}>
              <Text style={styles.city}>{item}</Text>
            </TouchableOpacity>
          </AnimatedView>
        )}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  input: {
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  city: {fontSize: 18},
});

export default SearchScreen;
