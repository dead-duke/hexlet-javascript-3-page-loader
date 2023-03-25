import os from 'os';
import * as fsp from 'node:fs/promises';
import path from 'path';
import nock from 'nock';
import pageLoader, { getFilename } from '../src/loader.js';

nock.disableNetConnect();

const getFixturePath = (filename) => path.resolve(`__fixtures__/${filename}`);

let expected;
let tempDir;

beforeEach(async () => {
  expected = await fsp.readFile(getFixturePath('result.html'), 'utf-8');
  tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
  nock('https://ru.hexlet.io').get('/courses').reply(200, expected);
});

test('filename', () => {
  const filename = getFilename('https://ru.hexlet.io/courses');
  expect(filename).toBe('ru-hexlet-io-courses.html');
});

test('page loader', async () => {
  const filepath = await pageLoader(tempDir, 'https://ru.hexlet.io/courses');
  const actual = await fsp.readFile(filepath, 'utf-8');

  expect(actual).toEqual(expected);
});

test('page loader no such directoty error', async () => {
  const invalidDir = '/tsettset';
  const actual = await pageLoader(invalidDir, 'https://ru.hexlet.io/courses');
  expect(actual).toBe(`no such directory: ${invalidDir}`);
});
