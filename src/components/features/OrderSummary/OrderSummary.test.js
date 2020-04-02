import React from 'react';
import {shallow} from 'enzyme';
import OrderSummary from './OrderSummary';

const select = {
  title: 'p',
  promoTitle: 'h2',
};

const mockProps = {
  tripOptions: { 
    accommodation: 'hotel',
    features: [],
    adults: 1,
    children: 0,
  },
  tripCost: '$139,398.25',
};

const component = shallow(<OrderSummary {...mockProps} />);

describe('Component OrderSummary', () => {

  it('should throw error without props', () => {
    expect(() => shallow(<OrderSummary/>).toThrow());
  }); 

  it('should render component if props provided', () => {
    expect(component).toBeTruthy();
  });
   
  it('should render title and promo title if provided in props', () => {
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoTitle)).toEqual(true);
  });

  it('should render title and promo title texts based on props and after calc', () => {
    const renderedTitle = component.find('p').text();
    const renderedPromoTitle = component.find('h2').text();
    // TODO: fix bug with roundings/digits in standard price in Trip vs Ordersummary
    // resulting from formatting price or just cutting endings
    expect(renderedTitle).toContain('$139,399'); 
    expect(renderedPromoTitle).toContain('$111,519');
  });

});