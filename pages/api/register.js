import { withDb } from "../../helpers/api/response";
import { crypto } from "../../helpers/crypto/crypto";

export default function handler(req, res) {
	if (req.method != "POST") {
		res.status(405).json({ message: "method not allowed" });
	}
	withDb(req, res, async (db, json) => {
		const { username, password, name } = req.body;
		if (!username || !password || !name) {
			throw "Data tidak valid";
		}
		const isUsernameUsed = await db
			.collection("users")
			.findOne({ username: username });
		if (isUsernameUsed) {
			throw "Username telah digunakan";
		}
		const hashedPassword = crypto.hash(password);
		const user = await db.collection("users").insertOne({
			username: username,
			password: hashedPassword,
			name: name,
		});

		if (!user.insertedId) {
			throw "Gagal mendaftarkan user";
		}

		json.message = user.insertedId;
	});
}
