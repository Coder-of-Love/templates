const path = require('path');

module.exports = {
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx'],
		alias: {
			'@common': path.resolve(__dirname, 'frontend/apps/common/js/components/'),
			'@hoc': path.resolve(__dirname, 'frontend/apps/common/js/hoc'),
			'@modal': path.resolve(__dirname, 'frontend/apps/common/js/components/modal'),
			'@reducer': path.resolve(__dirname, 'frontend/apps/common/js/reducers'),
			'@util': path.resolve(__dirname, 'frontend/apps/common/js/components/Util'),
			'@utils': path.resolve(__dirname, 'frontend/apps/common/js/utils'),

			actions$: path.resolve(__dirname, 'frontend/apps/common/js/actions.js'),
			api$: path.resolve(__dirname, 'frontend/apps/common/js/api.js'),
			global$: path.resolve(__dirname, 'global.js'),
		}
	}
};