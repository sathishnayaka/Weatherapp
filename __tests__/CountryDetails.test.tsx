import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import axios from 'axios';
import CountryDetails from '../src/CountryDetails';

jest.mock('axios');

describe('CountryDetails', () => {
  test('renders country details correctly', async () => {
    const mockAxios = (axios.get as jest.Mock).mockImplementation(() =>
    Promise.resolve({ data: [
      {
        capital: 'Dehli',
        latlng: [123, 456],
        flag: 'flag',
        population: '13903222',
        name: {
          common : "india"
        }
      },
    ] })
  );
    const navigation = { navigate: jest.fn() };
    const route = { params: { country: 'india' } };
    render(<CountryDetails navigation={navigation} route={route} />);
    
    await waitFor(() => screen.getByText('Capital:Dehli'));
    expect(screen.getByText('Latitude: 123, Longitude: 456')).toBeTruthy();
    expect(screen.getByText('Population: 13903222')).toBeTruthy();
    expect(screen.getByText('flag')).toBeTruthy();
  });

  test('navigates to CapitalWeather on button press', async () => {
    const navigation = { navigate: jest.fn() };
    const route = { params: { country: 'india' } };
    render(<CountryDetails navigation={navigation} route={route} />);

    await waitFor(() => screen.getByText('Capital:Dehli'));

    fireEvent.press(screen.getByText('Capital Weather'));

    expect(axios.get).toHaveBeenCalledWith(
      'http://api.weatherstack.com/current?access_key=4046acade148754a6a71b689cce97826&query=Dehli'
    );

    // expect(navigation.navigate).toHaveBeenCalledWith('capital-weather', {
    //   capital: 'dehli',
    //   temperature: 28,
    //   precip: 10,
    //   weather_icons: ["https:weathericon"],
    //   wind_speed: 10,
    // });
  });
});
