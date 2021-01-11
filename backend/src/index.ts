import express from 'express';
import config from './config/config';
import authRoutes from './routes/auth';
import mongoose from 'mongoose';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes //
app.use('/api/auth', authRoutes);
// /Routes //

const start = async () => {
	await mongoose
		.connect(config.mongo.url, config.mongo.options)
		.then((result) => {
			console.log('Connected to mongodb');
		})
		.catch((err) => {
			console.error('Failed to connect to mongodb', err);
		});

	app.listen(config.server.port, () => {
		console.log(`Server is running on port ${config.server.port}`);
	});
};

start();
