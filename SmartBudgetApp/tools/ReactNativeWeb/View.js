import React from 'react';

const View = (({ children, style, ...otherProps }) => (
  <div
  {...otherProps}
  className={[].concat(style).join(' ')}
  >{children}</div>
));

export default View;
