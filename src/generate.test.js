import moment from 'moment';
import { generatePESEL } from './generate';

it('generated PESEL from data should start with does number', () => {
   expect(generatePESEL(moment("20111031")).substring(0, 6)).toBe('111031');
   expect(generatePESEL(moment("19740112")).substring(0, 6)).toBe('740112');
   expect(generatePESEL(moment("20130412")).substring(0, 6)).toBe('130412');
});
