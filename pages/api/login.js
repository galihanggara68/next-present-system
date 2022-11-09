import { withDb } from "../../helpers/api/response";
import { crypto } from "../../helpers/crypto/crypto";

export default function handler(req, res) {
	if (req.method != "POST") {
		res.status(405).json({ message: "method not allowed" });
	}
	withDb(req, res, async (db, json) => {
		const { username, password } = req.body;
		if (!username || !password) {
			throw "Unauthorized";
		}
		const user = await db
			.collection("users")
			.findOne({ username: username });
		if (!user) {
			throw "Unauthorized";
		}
		const isPasswordMatch = crypto.compare(user.password, password);
		if (!isPasswordMatch) {
			json.status = 401;
			throw "Unauthorized";
		}
		const token = crypto.encode(user);
		json.token = token;
	});
}
