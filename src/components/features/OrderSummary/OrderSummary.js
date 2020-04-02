import React from 'react';
import styles from './OrderSummary.scss'; 
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

import {promoPrice} from '../../../utils/promoPrice';
import settings from '../../../data/settings';

const OrderSummary = ({tripCost, tripOptions}) => {

  const standardTripCost = calculateTotal(formatPrice(tripCost), tripOptions);
  const promoTripCost = promoPrice(standardTripCost, settings.discount);
  
  return (
    <div className={styles.component}>
      <h2>Total happy hour price from: {formatPrice(promoTripCost)}</h2>
      <p>Total standard price: {formatPrice(standardTripCost)}</p>
    </div>
  );
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  tripOptions: PropTypes.object,
};

export default OrderSummary;