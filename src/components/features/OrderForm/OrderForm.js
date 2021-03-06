import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary';
import {Row, Col} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import PricingOptions from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';
import styles from './OrderForm.scss';
import Button from '../../common/Button/Button';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

const sendOrder = (options, tripName, tripId, tripCost, tripCountryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  if ((options.name !== '') && (options.contact !== '')) {
    const payload = {
      ...options,
      totalCost,
      tripName,
      tripId,
      tripCountryCode,
    };
    const url = settings.db.url + '/' + settings.db.endpoint.orders;
    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  } else {
    window.alert('Please provide name and contact before sending the order!');
  }
};

const OrderForm = ({tripName, tripId, tripCost,  tripCountryCode, options, setOrderOption}) => (  
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

    <Button onClick={() => sendOrder(options, tripName, tripId, tripCost, tripCountryCode)}>Order now!</Button>

  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
  tripCountryCode: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;