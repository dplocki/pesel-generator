const isSameDay = require('date-fns/isSameDay')

expect.extend({
  toBeTheSameAs(received, excepted) {
    if (isSameDay(received, excepted)) {
      return { pass: true, message: () => `Dates match (${received})` };
    }

    return { pass: false, message: () => `Date don't match\n\nReceived: ${received}\nExpected: ${excepted}` };
  }
});
