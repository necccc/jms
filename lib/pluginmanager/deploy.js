var Transform     = require('stream').Transform;
var PassThrough   = require('stream').PassThrough;
var streamCombine = require('stream-combiner');

var paths         = require('../../lib/paths');
var config        = require(paths.libdir + '/getconfig');
var pluginConfigs = config.plugins;

var log           = require(paths.libdir + '/debug/log');
var PluginRunner  = require(paths.libdir + '/pluginmanager/runner');

module.exports = function () {
	var deployPlugins = streamCombine(new PassThrough({ objectMode: true }));

	var pluginConf;

	for (var pgin in pluginConfigs) {

		pluginConf = pluginConfigs[pgin];

		if (pluginConf.enabled) {

			var plug = require(paths.pluginsdir + '/' + pluginConf.name);

			if (plug.deploy) {
				var plugin = new plug.deploy({ objectMode: true }, pluginConf.options);
				plugin.setEncoding('utf8');
				deployPlugins = streamCombine(deployPlugins, plugin);
			}
		}

	}
	return new PluginRunner({ objectMode: true }, deployPlugins);
};
