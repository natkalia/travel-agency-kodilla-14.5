import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary';
import {Row, Col} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import PricingOptions from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';
import styles from './OrderForm.scss';

const OrderForm = ({tripCost, options, setOrderOption}) => (  
  <Row center="md">
    {/* maps through pricing from data to get options for options components */}
    {PricingOptions.map(option => 
      (<Col
        md={3} 
        key={option.id}
        className={styles.box}
      >
        <OrderOption
          {...option}
          setOrderOption={setOrderOption} 
          currentValue={options[option.id]}/>
      </Col> ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} tripOptions={options}/>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;