"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend = void 0;
const resend_1 = require("resend");
exports.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
// resend.emails.send({
//   from: "onboarding@resend.dev",
//   to: "fandyglitch3@gmail.com",
//   subject: "Hello World",
//   html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
// });
