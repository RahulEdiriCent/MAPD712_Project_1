import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import RadioButtonGroup from '../components/RadioButtonGroup';
import HomeScreen from './HomeScreen';

// Manually define __DEV__ for testing purposes
global.__DEV__ = true;

describe('HomeScreen', () => {
  // test for radio button
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const selectedOption = 'Option 2';
  let selectedValue = '';

  const onOptionSelect = (option) => {
    selectedValue = option;
  };

  test('renders correctly', () => {
    const { getByText } = render(
      <RadioButtonGroup options={options} selectedOption={selectedOption} onOptionSelect={onOptionSelect} />
    );

    options.forEach((option) => {
      expect(getByText(option)).toBeTruthy();
    });
  });

  test('selects the correct option on press', () => {
    const { getByText } = render(
      <RadioButtonGroup options={options} selectedOption={selectedOption} onOptionSelect={onOptionSelect} />
    );

    options.forEach((option) => {
      const optionButton = getByText(option);
      fireEvent.press(optionButton);
      expect(selectedValue).toBe(option);
    });
  });
  
  // test for homescreen
  test('renders correctly', () => {
    const tree = renderer.create(<HomeScreen navigation={{ navigate: jest.fn() }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('navigates to AllPatientsScreen on "View All Patient" button press', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('View All Patient'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AllPatientsScreen');
  });

  test('navigates to AddPatient on "Add New Patient" button press', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Add New Patient'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AddPatient');
  });
});
