import React from 'react';
import styles from './OrderSummary.scss'; 
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderSummary = ({tripCost, tripOptions}) => (
  <h2 className={styles.component}>
    Total: <strong>{calculateTotal(formatPrice(tripCost), tripOptions)}</strong>
  </h2>
);

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  tripOptions: PropTypes.object,
};

export default OrderSummary;