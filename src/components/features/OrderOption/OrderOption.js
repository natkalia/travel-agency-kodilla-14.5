import React from 'react';
import styles from './OrderOption.scss'; 
import PropTypes from 'prop-types';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OrderOptionDate';

/* used to toggle between subcomponents 
when rendering them in OrderForm
depending on input type */
const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons, 
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate,
};

const OrderOption = ({ name, type, setOrderOption, id, ...otherProps }) => {
  const OptionComponent = optionTypes[type];
  /* OptionComponent changes value depending on map iteration in OrderForm, 
  e.g. OrderOptionIcons, OrderOptionNumber - components depending on input type */
  if (!OptionComponent) {
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        {/* send only other props related to order options (without option name, type) */}
        <OptionComponent
          setOptionValue={value => setOrderOption({[id]: value})}
          {...otherProps}
        />
      </div>
    );
  }
};

OrderOption.propTypes = {
  name: PropTypes.string,
};

export default OrderOption;