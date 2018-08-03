export function generatePESEL(date) {
    return date.format('YYMMDD') + '12345';
}