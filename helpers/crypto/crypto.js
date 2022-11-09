import { DES, enc } from "crypto-js";
import bcrypt from "bcryptjs";

const encode = (user) => {
	var now = (Date.now() / 1000) | 0;
	var message = `${now}|${user._id}`;
	var token = DES.encrypt(message, process.env.TOKEN_SECRET).toString();
	return token;
};
const decode = (token) => {
	try {
		const decoded = DES.decrypt(token, process.env.TOKEN_SECRET).toString(
			enc.Utf8
		);

		if (decoded.length == 0) throw "invalid token";
		var info = decoded.split("|");
		return { generatedAt: info[0], userId: info[1] };
	} catch (ex) {
		return null;
	}
};
const hash = (text) => {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(text, salt);
	return hash;
};
const compare = (hash, text) => {
	const isMatch = bcrypt.compareSync(text, hash);
	return isMatch;
};
export const crypto = {
	encode,
	decode,
	hash,
	compare,
};
