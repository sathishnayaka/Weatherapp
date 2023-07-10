import React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import WeatherDetails from '../src/WeatherDetails';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('WeatherDetails component', () => {
  let wrapper: ShallowWrapper;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    mockAxios.onGet().reply(200, {
      current: {
        temperature: '25',
        weather_icons: ['http://example.com/icon.png'],
        precip: '20',
        wind_speed: '10',
      },
    });
    wrapper = shallow(<WeatherDetails navigation={{}} route={{ params: { capital: 'London' } }} />);
  });


  beforeEach(() => {
    wrapper = shallow(<WeatherDetails navigation={{}} route={{ params: { capital: 'London' } }} />);
  });
  
  afterEach(() => {
    mockAxios.restore();
  });

  it('renders the capital name correctly', () => {
    const capitalElement = wrapper.find('[data-testid="capital"]');
    expect(capitalElement.props().children[1]).toEqual('London');
  });
  it('redners temprature correclty', () => {
    const tempElement = wrapper.find('[data-testid="temp"]');
    expect(tempElement.props().children[1]).toEqual('');
  })

  it("after mounting it should call api",() => {
  
    const wrapper = mount(<WeatherDetails navigation={{}} route={{ params: { capital: 'London' } }} />);
    // console.log(wrapper.debug());
   
  })
});
