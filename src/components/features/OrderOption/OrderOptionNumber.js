import React from 'react';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderOptionNumber = ({currentValue, limits, price, setOptionValue}) => (
  <div className={styles.number}> 
    <input 
      type="number"
      className={styles.inputSmall}
      value={currentValue}  
      min={limits.min}
      max={limits.max}
      onChange={e => setOptionValue(e.currentTarget.value)}
    /> {formatPrice(price)}
  </div>
);

OrderOptionNumber.propTypes = {
  limits: PropTypes.object,
  price: PropTypes.string,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
};

export default OrderOptionNumber;