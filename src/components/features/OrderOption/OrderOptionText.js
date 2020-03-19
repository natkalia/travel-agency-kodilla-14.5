import React from 'react';
import PropTypes from 'prop-types';

const OrderOptionText = ({setOptionValue}) => (
  <input 
    type='text'
    dateFormat='YYYY-MM-DD'
    onChange={e => setOptionValue(e.currentTarget.value)}
  />
);

OrderOptionText.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;