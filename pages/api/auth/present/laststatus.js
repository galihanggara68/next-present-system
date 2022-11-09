import { withDb } from "../../../../helpers/api/response";
import { ObjectId } from "mongodb";

export default function handler(req, res) {
	withDb(req, res, async (db, json, auth) => {
		const hasPresent = await db
			.collection("present")
			.find({ user_id: ObjectId(auth.userId) })
			.limit(1)
			.sort({ check_in: 1 })
			.toArray();

		json.data = hasPresent[0] || null;
	});
}
