import React from 'react';
import {shallow} from 'enzyme';
import ListItem from './ListItem';

const select = {
  title: 'span',
  promoTitle: '.promoTitle',
};

const mockProps = {
  title: 'Standard price: $139,398',
  promoTitle: 'Price from: $111,519',
  icon: 'trash',
};

const component = shallow(<ListItem {...mockProps} />);

describe('Component ListItem', () => {

  it('should throw error without required props', () => {
    expect(() => shallow(<ListItem/>).toThrow());
  });

  it('should render component if props provided', () => {    
    expect(component).toBeTruthy();
  });

  it('should render title if provided in props', () => {
    expect(component.exists(select.title)).toEqual(true);
  });

  it('should render promo title based on props', () => {
    expect(component.exists(select.promoTitle)).toEqual(true);
  });

  it('should contain Icon with icon classname based on props', () => {
    const subcomponent = component.find('Icon');
    // console.log(subcomponent.debug());
    let renderedSubcomponent = subcomponent.dive();
    // console.log(renderedSubcomponent.debug());
    expect(renderedSubcomponent.length).toBe(1);
    expect(renderedSubcomponent.prop('className')).toBe(`fas fa-${mockProps.icon}`);
  });

  it('should render standard title text and promo title text based on props', () => {
    const renderedTitle = component.find('span').text();
    const renderedPromoTitle = component.find('.promoTitle').text();
    expect(renderedTitle).toEqual(`Standard price: $139,398`);
    expect(renderedPromoTitle).toEqual(`Price from: $111,519`);
  });

});