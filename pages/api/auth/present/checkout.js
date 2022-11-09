import { withDb } from "../../../../helpers/api/response";
import { ObjectId } from "mongodb";

export default function handler(req, res) {
	withDb(req, res, async (db, json, auth) => {
		const hasPresent = await db
			.collection("present")
			.find({ user_id: ObjectId(auth.userId) })
			.limit(1)
			.sort({ check_in: -1 })
			.toArray();
		console.log(hasPresent);
		if (hasPresent.length < 1) {
			throw "Anda belum checkin";
		}
		if (hasPresent[0].check_out != null) {
			throw "Anda sudah checkout";
		}
		const moment = require("moment-timezone");
		const tz = moment().tz(process.env.TZ);
		const data = {
			check_out: tz.format("YYYY-MM-DD HH:mm:ss"),
		};
		console.log(data);
		const present = await db
			.collection("present")
			.updateOne({ _id: hasPresent[0]._id }, { $set: data });
		if (present.modifiedCount < 1) {
			throw "Gagal checkout";
		}
		json.message = "Sukses checkout";
	});
}
