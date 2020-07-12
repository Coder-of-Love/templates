process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
let fs = require('fs');

const app = express();
const server = 	require('http').createServer(app);
const { mainChunk } = require('../webpack.common'); //TODO abstract

let dist = 'dist';

app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }));
app.use(bodyParser.json({ limit: '25mb' }));


if(process.env.NODE_ENV === 'development') {
	const webpackConfig = require('../webpack.dev');

	const compiler = require('webpack')(webpackConfig);
	const devMiddleware = require('webpack-dev-middleware')(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {
			children: false,
			colors: true,
			modules: false,
			version: false
		}
	});

	fs = devMiddleware['fileSystem'];
	dist = webpackConfig.output.path;

	app.use(devMiddleware);
	app.use(require('webpack-hot-middleware')(compiler));

	app.use(express.static('./frontend/templates/'));
}

const mainChunkPaths = ['*']
app.get(
	mainChunkPaths,
	(req, res) => {
		const filePath = path.resolve(dist, mainChunk, 'index.html');
		const html = fs.readFileSync(filePath);

		res.end(html);
	}
);

app.use(express.static('public'));
app.use(express.static('dist'));

const port = process.env.PORT || 3500;
server.setTimeout(10 * 60 * 1000);
server.listen(port, '127.0.0.1', () => {
	console.log(`Server is listening on: ${ port }`);
});