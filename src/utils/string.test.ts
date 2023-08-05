import { capitalizeFirstLetter, formatName } from './string';

test('capitalizeFirstLetter', () => {
  expect(capitalizeFirstLetter('')).toEqual('');
  expect(capitalizeFirstLetter('hi')).toEqual('Hi');
});

test('formatName', () => {
  expect(formatName('')).toEqual('');
  expect(formatName('hi')).toEqual('Hi');
  expect(formatName('hi-there')).toEqual('Hi there');
});
