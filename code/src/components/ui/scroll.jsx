import React from 'react';
import PropTypes from 'prop-types';

function ScrollableComponent({ children, height = '400px' }) {
  return (
    <div style={{ height, overflowY: 'auto', overflowX: 'hidden', padding: '8px' }}>
      {children}
    </div>
  );
}

ScrollableComponent.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are passed
  height: PropTypes.string, // Allows customization of height
};

export default ScrollableComponent;
