import React from 'react';
import {shallow} from 'enzyme';
import Hero from './Hero';

describe('Component Hero', () => {
  const expectedTitle = 'Lorem ipsum';
  const expectedImage = 'image.jpg';

  it('should render without crashing', () => {
    const component = shallow(<Hero 
      titleText={expectedTitle} 
      imageSrc={expectedImage} />);
    expect(component).toBeTruthy();
  });
  
  it('should throw error without required props', () => {
    expect(() => shallow(<Hero />)).toThrow();
  });

  it('should render correct title and image', () => {
    const component = shallow(<Hero 
      titleText={expectedTitle} 
      imageSrc={expectedImage} />);
    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedTitle);
    expect(component.find('.image').prop('src')).toEqual(expectedImage);
  });

  it('renders correct classNames', () => {
    const mockVariants = 'small dummy';
    const component = shallow(<Hero 
      titleText={expectedTitle} 
      imageSrc={expectedImage} 
      variant={mockVariants} />);
    expect(component.hasClass('component')).toBe(true);
    expect(component.hasClass('small')).toBe(true);
    expect(component.hasClass('dummy')).toBe(true);
  });
});