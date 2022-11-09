import { NextResponse } from "next/server";

// const isAuthenticated = (request) => {
// 	const token = request.headers.get("token");
// 	if (!token) {
// 		return false;
// 	}
// 	const decodedToken = decode(token);
// 	if (!decodedToken) {
// 		return false;
// 	}

// 	request._user_info = decodedToken;
// 	return true;
// };

export function middleware(request) {
	if (request.method != "POST") {
		return NextResponse.rewrite(new URL("/api/unauthorized", request.url));
	}
	const token = request.headers.get("token");
	if (!token) {
		return NextResponse.rewrite(new URL("/api/unauthorized", request.url));
	}
	var cryptoJs = require("crypto-js");
	const decoded = cryptoJs.DES.decrypt(
		token,
		process.env.TOKEN_SECRET
	).toString(cryptoJs.enc.Utf8);
	if (!decoded) {
		return NextResponse.rewrite(new URL("/api/unauthorized", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/api/auth/:path*",
};
