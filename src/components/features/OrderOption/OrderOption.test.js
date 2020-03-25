import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {

  const props = {
    name: 'Your name',
    type: 'text',
    title: 'title',
  };

  it('should render component if props name, type provided', () => {
    const component = shallow(<OrderOption name={props.name} type={props.type}/>);
    const renderedElement = component.exists();
    expect(renderedElement).toBeTruthy();
  });

  it('should return empty object / null if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render title received from props', () => {
    const expectedTitle = props.name;
    const component = shallow(<OrderOption name={expectedTitle} type={props.type}/>);
    const renderedTitle = component
      .find('.title')
      .first()
      .text();
    expect(renderedTitle).toEqual(expectedTitle);
  });
});

/* integration tests */

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption} 
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
      // console.log(component.debug());
      // console.log(subcomponent.debug());
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'checkboxes': {
        /* tests for checkboxes */
        it('contains input with type checkbox', () => {
          const input = renderedSubcomponent.find('input[type="checkbox"]');
          expect(input.length).toBe(mockProps.values.length);   
        });
        
        it('should run setOrderOption function on change', () => {
          const input = renderedSubcomponent.find(`input[value="${testValue}"]`);
          input.simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [mockProps.currentValue, testValue]});
        });
        break;
      }
      case 'dates': { 
        /* tests for date */
        it('contains DatePicker', () => {
          const datePicker = renderedSubcomponent.find('DatePicker');
          expect(datePicker.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          const datePicker = renderedSubcomponent.find(DatePicker);
          datePicker.simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        }); 
        break;
      }
      case 'icons': {
        /* tests for icons */
        it('contains divs with class icon', () => {
          const div = renderedSubcomponent.find('div.icon');
          expect(div.length).toBe((mockProps.values.length+2)); 
        });
        it('should run setOrderOption function on click', () => {
          const div = renderedSubcomponent.find('div.icon');
          div.at(2).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
        });
        break;
      }
      case 'number': { 
        /* tests for number */
        it('contains input with type number', () => {
          const input = renderedSubcomponent.find('input[type="number"]');
          expect(input.length).toBe(1);  
        });
        
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input[type="number"]').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text': { 
        /* tests for text */
        it('contains input with type text', () => { 
          const input = renderedSubcomponent.find('input[type="text"]');
          expect(input.length).toBe(1);
        }); 

        it('should run setOrderOption function on change', () => {
          const input = renderedSubcomponent.find('input[type="text"]');
          input.simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }   
    }
  });
}