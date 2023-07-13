import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import axios from 'axios';
import WeatherDetails from '../src/WeatherDetails';

describe('CountryDetails', () => {
  test('renders weather  details correctly', async () => {
    const navigation = { navigate: jest.fn() };
    const route = { params: { 
      capital: 'dehli',
      temperature:"20",
      precip : "10%",
        weather_icons : ["https:weathericon.in"],
        wind_speed: "80"
   } };
    const wrapper = render(<WeatherDetails navigation={navigation} route={route} />);
    console.log(wrapper.debug());
    await waitFor(() => screen.getByText('dehli'));
    expect(screen.getByText('precipitation : 10%')).toBeTruthy();
  });
});

