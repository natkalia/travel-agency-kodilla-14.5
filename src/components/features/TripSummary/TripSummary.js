import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from './TripSummary.scss';
import {Col} from 'react-flexbox-grid';
import {promoPrice} from '../../../utils/promoPrice';
import settings from '../../../data/settings';
import {formatPrice} from '../../../utils/formatPrice';

class TripSummary extends React.Component {
  
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    // intro: PropTypes.string,
    cost: PropTypes.string.isRequired,
    days: PropTypes.number.isRequired,
    tags: PropTypes.array,
  };

  render() {
    const {id, image, name, cost, days, tags} = this.props;
    const promoCost = formatPrice(promoPrice(Number(cost.substring(1).replace(',','')), settings.discount));
    const standardCost = cost.slice(0, cost.length - 3);
    return (
      <Col xs={12} sm={6} lg={4} className={styles.column}>
        <Link to={`/trip/${id}`} className={styles.link}>
          <article className={styles.component}>
            <img src={image} alt={name} />
            <h3 className={styles.title}>{name}</h3>
            <div className={styles.details}>
              <span><strong>{days} days</strong></span>
              <span><strong>Price from: {promoCost}</strong></span> 
              <span>Standard price: {standardCost}</span>
            </div>
            {tags && tags.length > 0 &&
              <div className={styles.tags}>
                {tags.map(tag => (
                  <span className={styles.tag} key={tag.toString()}>{tag}</span>
                ))}
              </div>}
          </article>
        </Link>
      </Col>
    );
  }
}

export default TripSummary;
