import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary';
import {Row, Col} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import PricingOptions from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = ({tripCost, options}) => (  
  <Row>
    {/* maps through pricing from data to get options for options components */}
    {PricingOptions.map(option => 
      (<Col md={4} key={option.id}><OrderOption {...option}/></Col> ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} tripOptions={options}/>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;