import React from 'react';
import { mount } from 'enzyme';
import Application from './Application';

describe('<Application />', () => {
  let element;

  function mountApplication() {
    element = mount(<Application />);
  }

  function isGreetingDisplayed() {
    expect(element.html()).to.contain('Hello world!');
  }

  describe('Application should show greeting message', () => {
    it('Given the application is loaded', mountApplication);
    it('Expect that the greeting message is displayed', isGreetingDisplayed);
  });
});
