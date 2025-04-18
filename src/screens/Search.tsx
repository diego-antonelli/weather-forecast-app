import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';
import {TextBox} from '../ui-components/TextBox';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../ui-components/theme';
import {Text} from '../ui-components/Text';
import {useAppDispatch, useAppSelector} from '../utils/redux';
import {clearSuggestions, getCitySuggestions} from '../stores/slices/citySlice';
import debounce from 'lodash.debounce';
import {ClickableContainer} from '../ui-components/ClickableContainer';
import {
  addSearch,
  selectCity,
  setCurrentLocation,
} from '../stores/slices/searchSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {Routes} from '../utils/constants';
import {Spinner} from '../ui-components/Spinner';
import {Error} from '../ui-components/Error';
import {mapCountryEmoji} from '../utils/mappers.ts';

const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const searches = useAppSelector(state => state.search.searches);
  const loading = useAppSelector(state => state.city.loading);
  const error = useAppSelector(state => state.city.error);
  const cities = useAppSelector(state => state.city.suggestions);

  //eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetCitySuggestions = useCallback(
    debounce(() => {
      dispatch(getCitySuggestions(query));
    }, 300),
    [dispatch, query],
  );

  useEffect(() => {
    if (query.length > 2) {
      debouncedGetCitySuggestions();
    } else {
      dispatch(clearSuggestions());
    }
  }, [debouncedGetCitySuggestions, dispatch, query]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <TextBox
        role="searchbox"
        label="Search for a city..."
        containerStyle={styles.input}
        value={query}
        onChange={setQuery}
        onSubmitEditing={debouncedGetCitySuggestions}
        returnKeyType="search"
        onClean={() => {
          dispatch(clearSuggestions());
          setQuery('');
        }}
      />
      {error ? (
        <Error error={error} />
      ) : (
        <FlatList
          ListHeaderComponent={loading ? <Spinner /> : null}
          data={cities.length > 0 ? cities : searches}
          renderItem={({item, index}) => (
            <AnimatedView animation="fadeInUp">
              <ClickableContainer
                style={[
                  styles.item,
                  {backgroundColor: theme.secondaryBackgroundColor},
                ]}
                onPress={() => {
                  dispatch(selectCity(item));
                  dispatch(addSearch(item));
                  dispatch(setCurrentLocation(false));
                  navigation.navigate(Routes.Home);
                }}>
                <Text style={styles.city} testID={`search-city-${index}`}>
                  {item.name} ({mapCountryEmoji(item.country)})
                </Text>
              </ClickableContainer>
            </AnimatedView>
          )}
          keyExtractor={item =>
            `${item.longitude}_${item.latitude}_${item.country}`
          }
        />
      )}
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
