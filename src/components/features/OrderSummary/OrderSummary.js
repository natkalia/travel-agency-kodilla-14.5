import React from 'react';
import styles from './OrderSummary.scss'; 
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderSummary = ({tripCost, tripOptions}) => {
  const finalTripCost = calculateTotal(formatPrice(tripCost), tripOptions);
  return (
    <h2 className={styles.component}>
      {`Total: `}
      <strong>
        {formatPrice(finalTripCost)}
      </strong>
    </h2>
  );
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  tripOptions: PropTypes.object,
};

export default OrderSummary;