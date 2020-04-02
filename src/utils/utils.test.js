import {formatTime} from './formatTime';
import {promoPrice} from './promoPrice';

describe('utils', () => {

  describe('formatTime', () => {

    it('should return null if there is no argument provided', () => {
      expect(formatTime()).toBe(null);
    });

    it('should return null if argument is not a number', () => {
      expect(formatTime('abc')).toBe(null); // check for string
      expect(formatTime(() => {})).toBe(null); // check for function
    });

    it('should return null if argument is lower than zero', () => {
      expect(formatTime(-1)).toBe(null);
      expect(formatTime(-2)).toBe(null);
    });

    it('should return time in hh:mm:ss if argument is proper', () => {
      expect(formatTime(122)).toBe('00:02:02');
      expect(formatTime(3793)).toBe('01:03:13');
      expect(formatTime(120)).toBe('00:02:00');
      expect(formatTime(3604)).toBe('01:00:04');
    });

  });

  describe('promoPrice', () => {

    it('should return null if no arguments', () => {
      expect(promoPrice()).toBe(null);
    });

    it('should return null if one or both arguments are strings', () => {
      expect(promoPrice('test', 1)).toBe(null);
      expect(promoPrice(1, 'test')).toBe(null);
      expect(promoPrice(1, 'test')).toBe(null);
      expect(promoPrice('test', 'test')).toBe(null);
    });

    it('should return null if one or both arguments are less than 1', () => {
      expect(promoPrice(-10,10)).toBe(null);
      expect(promoPrice(20,-2)).toBe(null);
      expect(promoPrice(-100,-100)).toBe(null);
    });

    it('should return promotion price if received positive number arguments', () => {
      expect(promoPrice(100,20)).toBe(80);
      expect(promoPrice(200,10)).toBe(180);
      expect(promoPrice(33,1)).toBe(32.67);
      expect(promoPrice(77.13,1)).toBe(76.3587);
    });

  });

});
