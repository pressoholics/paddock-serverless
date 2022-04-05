/* eslint-disable @typescript-eslint/no-explicit-any */

enum LogLevel {
  'none' = 0,
  'error' = 1,
  'warn' = 2,
  'info' = 3,
  'debug' = 4
}

enum ErrorPrefix {
  'Error' = '[Lambda Error]',
  'ClientError' = '[Lambda 4xx]',
  'ServerError' = '[Lambda 5xx]'
}

class Logger {
  static LOG_LEVEL = LogLevel;
  static ERROR_PREFIX = ErrorPrefix;

  public level: LogLevel;
  public namespace: string;
  public prefix: string;

  constructor({
    level = (<any>LogLevel)[process.env.LOG_LEVEL || 'none'] || LogLevel.none,
    namespace = '',
    prefix = ErrorPrefix.Error
  }: {
    level?: any;
    namespace?: string;
    prefix?: string;
  }) {
    this.level = level;
    this.prefix = prefix;
    this.namespace = namespace;
  }

  private jsonify(args: any[]) {
    return args.map((arg: any) => {
      if (arg instanceof Error) {
        return arg;
      } else if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch {
          return arg;
        }
      }
      return arg;
    });
  }

  public input(...args: any): void {
    if (this.level >= LogLevel.info) {
      const namespace = this.namespace ? `[${this.namespace}]` : '';
      console.log(`${namespace}`, 'Input', ...this.jsonify(args));
    }
  }

  public output(...args: any): void {
    if (this.level >= LogLevel.info) {
      const namespace = this.namespace ? `[${this.namespace}]` : '';
      console.log(`${namespace}`, 'Output', ...this.jsonify(args));
    }
  }

  public info(...args: any): void {
    if (this.level >= LogLevel.info) {
      const namespace = this.namespace ? `[${this.namespace}]` : '';
      console.log(`${namespace}`, ...this.jsonify(args));
    }
  }

  public warn(...args: any): void {
    if (this.level >= LogLevel.warn) {
      const namespace = this.namespace ? `[${this.namespace}]` : '';
      console.warn(`${namespace}`, ...this.jsonify(args));
    }
  }

  public error(...errorArgs: any): void {
    if (this.level >= LogLevel.error) {
      const namespace = this.namespace ? `[${this.namespace}]` : '';
      console.error(this.prefix, `${namespace}`, ...this.jsonify(errorArgs));
    }
  }

  public errorPrefixed(prefix = this.prefix, ...errorArgs: any): void {
    this.error(prefix, ...errorArgs);
  }

  public debug(...args: any): void {
    if (this.level >= LogLevel.debug) {
      const namespace = this.namespace ? `[${this.namespace}]` : '';
      console.trace(`${namespace}`, ...this.jsonify(args));
    }
  }
}

export default Logger;
