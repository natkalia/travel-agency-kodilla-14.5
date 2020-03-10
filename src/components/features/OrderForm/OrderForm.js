import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary';
import {Row, Col} from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const OrderForm = props => (
  <Row>
    <Col xs={12}>
      <OrderSummary tripCost={props.tripCost} tripOptions={props.options}/>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.number,
  options: PropTypes.object,
};

export default OrderForm;