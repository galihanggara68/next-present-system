import { withDb } from "../../../helpers/api/response";
import { ObjectId } from "mongodb";

export default function handler(req, res) {
	withDb(req, res, async (db, json, auth) => {
		const user = await db
			.collection("users")
			.findOne({ _id: ObjectId(auth.userId) });

		json.user = user;
	});
}
