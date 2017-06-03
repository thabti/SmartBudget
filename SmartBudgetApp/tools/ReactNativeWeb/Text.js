import React from 'react';

const Text = (({ children, style = [], ...otherProps }) => (
  <span
  {...otherProps}
  className={[].concat(style).join(' ')}
  >{children}</span>
));

export default Text;
