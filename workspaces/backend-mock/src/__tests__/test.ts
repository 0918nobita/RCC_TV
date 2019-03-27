import test from 'ava';

const fn = async () => Promise.resolve('foo');

test('example', async t => {
  t.is(await fn(), 'foo');
});
