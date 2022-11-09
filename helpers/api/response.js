import { MongoClient as client } from "mongodb";
import { crypto } from "../crypto/crypto";

const connectDb = async () =>
	new Promise((resolve, reject) => {
		client
			.connect(process.env.MONGO_URL)
			.then((mongoClient) => {
				resolve(mongoClient.db(process.env.MONGO_DB));
			})
			.catch((err) => {
				reject(err);
			});
	});

const auth = (token) => {
	return crypto.decode(token);
};

const withDb = async (req, res, callback) => {
	var resJson = {};
	try {
		const dbClient = await connectDb();
		const token = req.headers.token;
		await callback(dbClient, resJson, auth(token));
		resJson.result = true;
	} catch (e) {
		console.log(e);
		resJson.message = e.toString();
		resJson.result = false;
	}
	res.status(resJson.result ? 200 : resJson.status).json(resJson);
};

const withoutDb = async (req, res, callback) => {
	var resJson = {};
	try {
		const token = req.headers.token;
		await callback(resJson, auth(token));
		resJson.result = true;
	} catch (e) {
		console.log(e);
		resJson.message = e.toString();
		resJson.result = false;
	}
	res.status(resJson.result ? 200 : resJson.status).json(resJson);
};

export { withDb, withoutDb };
