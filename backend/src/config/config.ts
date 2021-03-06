import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const PASSWORD_HASH_SALT_LENGTH = parseInt(process.env.PASSWORD_HASH_SALT_LENGTH || '4');
const CLIENT_DIR = process.env.CLIENT_DIR || '';

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: PORT,
	jwtSecret: JWT_SECRET,
	jwtExpiresIn: JWT_EXPIRES_IN,
	passwordHeshSaltLength: PASSWORD_HASH_SALT_LENGTH,
	clientDir: CLIENT_DIR,
};

const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	socketTimeoutMS: 30000,
	keepAlive: true,
	poolSize: 50,
	autoIndex: false,
	retryWrites: true,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_HOST = 'cluster0.lry34.mongodb.net';
const MONGO_DB = process.env.MONGO_DB || '';

const MONGO = {
	host: MONGO_HOST,
	username: MONGO_USERNAME,
	password: MONGO_PASSWORD,
	options: MONGO_OPTIONS,
	url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`,
};

export default {
	server: SERVER,
	mongo: MONGO,
};
