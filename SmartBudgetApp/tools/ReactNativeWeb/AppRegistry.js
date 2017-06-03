import React from 'react';
import { render } from 'react-dom';

function runApplication(component, { rootTag }) {
  render(component, rootTag);
}

export default {
  runApplication
};
