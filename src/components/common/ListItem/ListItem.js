import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Icon from '../Icon/Icon';
import styles from './ListItem.scss';

const ListItem = ({title, promoTitle, icon}) => {
  return(
    <div className={styles.component}>
      <Icon name={icon} />
      <span>
        {ReactHtmlParser(title)}
      </span>
      <div className={styles.promoTitle}>
        {promoTitle}
      </div>
    </div>
  );
};

ListItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  promoTitle: PropTypes.string,
};

export default ListItem;
