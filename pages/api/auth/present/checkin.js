import { withDb } from "../../../../helpers/api/response";
import { ObjectId } from "mongodb";

export default function handler(req, res) {
	withDb(req, res, async (db, json, auth) => {
		const hasPresent = await db
			.collection("present")
			.find({ user_id: ObjectId(auth.userId), check_out: null })
			.limit(1)
			.sort({ check_in: -1 })
			.toArray();
		if (hasPresent.length > 0) {
			throw "Anda sudah checkin";
		}
		const moment = require("moment-timezone");
		const tz = moment().tz(process.env.TZ);
		const present = await db.collection("present").insertOne({
			user_id: ObjectId(auth.userId),
			check_in: tz.format("YYYY-MM-DD HH:mm:ss"),
			check_out: null,
		});
		if (!present.insertedId) {
			throw "Gagal checkin";
		}
		json.message = "Sukses checkin";
	});
}
