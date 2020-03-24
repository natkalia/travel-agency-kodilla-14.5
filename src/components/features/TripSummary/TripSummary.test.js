import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  const props = {
    id: 'abc',
    name: 'name',
    image: 'image',
    cost: '$100',
    days: 7,
    tags: ['tag1', 'tag2', 'tag3'],
  };

  const component = shallow(<TripSummary {...props}/>);   

  it('should generate link to proper path based on id from props', () => {
    const expectedLink = `/trip/${props.id}`;
    const renderedLink = component
      .find('Link')
      .prop('to');
    expect(renderedLink)
      .toEqual(expectedLink);
  });

  it('should generate img with proper src and alt', () => {
    const expectedAlt = props.name;
    const expectedSrc = props.image;  
    const renderedAlt = component
      .find('img')
      .prop('alt');
    const renderedSrc = component
      .find('img')
      .prop('src');
    expect(renderedAlt)
      .toEqual(expectedAlt);
    expect(renderedSrc)
      .toEqual(expectedSrc);
  });

  it('should render correct name, days, cost', () => {
    const expectedName = props.name;
    const expectedDays = props.days;
    const expectedCost = props.cost;
    const renderedName = component
      .find('.title')
      .text();
    const renderedDays = component
      .find('.details span')
      .at(0)
      .text(); 
    const renderedCost = component
      .find('.details span')
      .at(1)
      .text(); 
    expect(renderedName)
      .toEqual(expectedName);
    expect(renderedDays)
      .toContain(expectedDays);
    expect(renderedCost)
      .toContain(expectedCost);
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary/>).toThrow());
  });
  
  it('should render tags in spans in proper order', () => {
    const expectedTags = props.tags;
    const renderedTags = [];
    renderedTags.push(
      component.find('.tag').at(0).text(),
      component.find('.tag').at(1).text(), 
      component.find('.tag').at(2).text());
    expect(renderedTags)
      .toEqual(expectedTags);   
  });

  it('should not render div with className "tags" if props tags is undefined or empty array', () => {
    const expectedTagsEmpty = []; 
    const componentWithTagsEmpty = shallow(
      <TripSummary 
        {...props} tags={expectedTagsEmpty}/>); 
    const renderedWithTagsEmpty = componentWithTagsEmpty
      .find('.tags')
      .exists();
    expect(renderedWithTagsEmpty)
      .toBeFalsy();

    let expectedTagsUndefined = undefined;
    const componentWithTagsUndefined = shallow(
      <TripSummary 
        {...props} 
        tags={expectedTagsUndefined}/>); 
    const renderedWithTagsUndefined = componentWithTagsUndefined
      .find('.tags')
      .exists();
    expect(renderedWithTagsUndefined)
      .toBeFalsy();
  });
});