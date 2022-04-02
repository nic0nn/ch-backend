const e = require("express");
const multer = require("multer");

const path = require("path");
const { APIError } = require("../utils");

exports.upload = (filename) => {
	return multer({
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, "./public/uploads/");
			},
			filename: function (req, file, cb) {
				cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
			}
		}),
		fileFilter: function (req, file, cb) {
			if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
				return cb(
					new APIError(400, "Solo se permiten imagenes jpg y png"),
					false
				);
			}
			cb(null, true);
		}
	}).single(filename);
};
