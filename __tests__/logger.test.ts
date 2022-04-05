import Logger from '../src/lib/logger';

describe('Logger Class Parameters', () => {
  test('Default parameters', () => {
    const logger = new Logger({});
    expect(logger.level).toBe(Logger.LOG_LEVEL.none);
    expect(logger.namespace).toBe('');
  });

  test('Undefined log level', () => {
    const level = process.env.LOG_LEVEL; // undefined
    const logger = new Logger({ level: level });
    expect(logger.level).toBe(Logger.LOG_LEVEL.none);
  });

  test('Setting parameters', () => {
    const namespace = 'Api-Request';
    const logger = new Logger({
      level: Logger.LOG_LEVEL.debug,
      namespace
    });
    expect(logger.level).toBe(Logger.LOG_LEVEL.debug);
    expect(logger.namespace).toBe(namespace);
  });

  test('Setting log level via env', () => {
    process.env.LOG_LEVEL = 'debug';
    const logger = new Logger({});
    expect(logger.level).toBe(Logger.LOG_LEVEL.debug);
  });
});

describe('Logger Error Method', () => {
  const originalError = console.error;

  afterEach(() => (console.error = originalError));

  test('Default parameters', () => {
    const consoleOutput: Array<unknown> = [];
    const mockedError = (output: unknown) => consoleOutput.push(output);
    console.error = mockedError;

    const logger = new Logger({ level: Logger.LOG_LEVEL.info });
    const err = new Error();

    logger.error(err);

    expect(consoleOutput).toEqual(['[Lambda Error]']);
  });
});
