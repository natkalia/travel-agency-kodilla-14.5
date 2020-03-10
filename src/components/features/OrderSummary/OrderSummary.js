import React from 'react';
import styles from './OrderSummary.scss'; 
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderSummary = props => (
  <h2 className={styles.component}>
    Total: <strong>{calculateTotal(formatPrice(props.tripCost), props.tripOptions)}</strong>
  </h2>
);

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  tripOptions: PropTypes.object,
};

export default OrderSummary;