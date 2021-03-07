import moment from 'moment';

expect.extend({
  isTheSame(received, excepted) {
    const momentExcepted = moment.utc(excepted);
    if (received.isValid() && received.isSame(momentExcepted)) {
      return { pass: true, message: () => `Dates match (${received})` };
    }

    return { pass: false, message: () => `Date don't match\n\nReceived: ${received}\nExpected: ${momentExcepted}` };
  }
});
