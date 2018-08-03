import { generatePESEL } from './generate';

it('generated PESEL from data should start with does number', () => {
   expect(generatePESEL(new Date(2011, 10, 30)).substring(0, 6)).toBe('111030');
});
