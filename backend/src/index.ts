import express from 'express';
import config from './config/config';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import routes from './routes/routes';
import shoppingCartRoutes from './routes/shopping-cart.routes';
import errorHandler from './middleware/error-handler.middleware';
import errorLogger from './middleware/error-logger.middleware';

const app = express();

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
