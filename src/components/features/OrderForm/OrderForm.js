import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary';
import {Row, Col} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import PricingOptions from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';

console.log(PricingOptions);

const OrderForm = props => (  
  <Row>

    {PricingOptions.map(option => 
      (<Col md={4} key={option.id}><OrderOption {...option}/></Col> ))}
   
    <Col xs={12}>
      <OrderSummary tripCost={props.tripCost} tripOptions={props.options}/>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;