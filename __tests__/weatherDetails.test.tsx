import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import axios from 'axios';
import CountryDetails from '../src/CountryDetails';
import WeatherDetails from '../src/WeatherDetails';

jest.mock('axios');

describe('CountryDetails', () => {
  test('renders country details correctly', async () => {
    const mockAxios = (axios.get as jest.Mock).mockImplementation(() =>
    Promise.resolve({ data: {
      current: {
        temperature: '25',
        precip: '10%',
        weather_icons: ['https://example.com/icon.png'],
        wind_speed: '15',
      },
    }, })
  );
    const navigation = { navigate: jest.fn() };
    const route = { params: { capital: 'dehli' } };
    render(<WeatherDetails navigation={navigation} route={route} />);

    await waitFor(() => screen.getByText('dehli'));
    expect(screen.getByText('precipitation : 10%')).toBeTruthy();
  });
});

