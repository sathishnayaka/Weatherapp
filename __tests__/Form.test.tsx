import React from 'react';
import Form from '../src/Form';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
// jest.mock('axios');

describe('Form', () => {
  test('after the text-input it should navigate to country-details page with input text', () => {
    const navigation = { navigate: jest.fn() };
    const component = shallow(<Form navigation={navigation} />);
    expect(component).toMatchSnapshot();
    const textInput = component.find("[data-testid='text-input']");
    textInput.simulate('changeText', "india");
    const button = component.find("[data-testid='submit-button']");
    expect(button).toBeTruthy();
    button.simulate('press');
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
