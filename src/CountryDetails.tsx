import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Button,
  FlatList,
  Text,
} from 'react-native';

type formTypes = {
  navigation: any;
  route: any;
};

type itemType = {
  capital: string;
  latlng: any[];
  flag: string;
  population:string;
  name : {
    common : string;
  }
};

function CountryDetails({navigation, route}: formTypes): JSX.Element {
  const [countryData, setCountryData] = useState<itemType[]>();
  const {country} = route.params;

  const getCountryDetails = async () => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`,
    );
    const data: itemType[]= response.data;
    setCountryData(data);
  };

  useEffect(() => {
      getCountryDetails();
  }, [country]);

  const navigateToCapitalWeather = (capital: string) => {
    navigation.navigate('capital-weather', { capital });
  };

  const renderItem = ({item}: {item:itemType}) => {
    return (
      <>
         <View style={styles.itemContainer}>
          <Text style={{fontSize:24}}>Country Name:{item.name.common}</Text>
        <Text style={styles.capital}>Capital:{item.capital}</Text>
        <Text style={styles.latitudeLongitude}>
          Latitude: {item.latlng[0]}, Longitude: {item.latlng[1]}
        </Text>
        <Text style={styles.population}>Population: {item.population}</Text>
        <Text style={styles.flag}>{item.flag}</Text>
      </View>
      <Button
        title="Capital Weather"
        onPress={() => navigateToCapitalWeather(item.capital)}
      />
      </>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <FlatList data={countryData} renderItem={renderItem} keyExtractor={item => item.capital[0]} 
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
  flatlist:{
    marginBottom : 20,
    backgroundColor: "#fff"
  },
  flatlistItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  itemContainer: {
    marginBottom: 8,
  },
  capital: {
    fontSize: 18,
    fontWeight: '600',
  },
  latitudeLongitude: {
    fontSize: 16,
    color: 'gray',
  },
  population: {
    fontSize: 16,
  },
  flag: {
    fontSize: 44,
  },
});

export default CountryDetails;
