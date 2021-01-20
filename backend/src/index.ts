import path from 'path';
import express from 'express';
import cors from 'cors';
import config from './config/config';
import mongoose from 'mongoose';
import routes from './routes/routes';
import errorHandler from './middleware/error-handler.middleware';
import errorLogger from './middleware/error-logger.middleware';

const app = express();

app.use(cors());

app.use(express.static(path.resolve(config.server.clientDir)));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

const start = async () => {
	try {
		await mongoose.connect(config.mongo.url, config.mongo.options).then(() => {
			console.log('Connected to mongodb');
		});

		app.listen(config.server.port, () => {
			console.log(`Server is running on port ${config.server.port}`);
		});
	} catch (err) {
		console.error(err);
	}
};

start();
