'use strict';

/**
 * Jam3 custom plugin to fix issues with other plugins and/or
 * add new functionality not covered by serverless framework
 *
 * @class ServerlessJam3Plugin
 */
class ServerlessJam3Plugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      jam3: {
        usage:
          'Jam3 custom plugin to fix issues with other plugins or add new functionality not covered by serverless framework',
        lifecycleEvents: ['dry-run-plugin']
      }
    };

    this.hooks = {
      'before:package:finalize': this.beforeDeployHook.bind(this),
      'before:jam3:dry-run-plugin': this.beforeDryRunPluginCustomHook.bind(this)
    };
  }

  beforeDeployHook() {
    this.serverless.cli.log('Serverless Jam3 Plugin - Hook - Before Serverless Framework finishes packaging');
  }

  beforeDryRunPluginCustomHook() {
    this.serverless.cli.log('Serverless Jam3 Plugin - Custom Hook - Before executing the custom hook dry-run-plugin');
  }
}

module.exports = ServerlessJam3Plugin;
