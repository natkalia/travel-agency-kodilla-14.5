
import React from 'react';
import {shallow} from 'enzyme';
import Trip from './Trip';

const mockProps = {
  name: 'This is text from mockProps',
  image: 'https://loremflickr.com/400/200/landscape,Timor-Leste/all?lock=3',
  country: {
    name: 'This is country.name from mockProps',
    flag: 'This is country.flag from mockProps',
    currencies: ['This is country.currencies[0] from mockProps'],
  },
  cost: '$100,000.11',
};
 
describe('Component Trip', () => {  
    
  it('should render component if props provided', () => {
    const component = shallow(<Trip {...mockProps} />);
    // console.log(component.debug()); 
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<Trip/>).toThrow());
  });

});
