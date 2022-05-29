import sgMail from "@sendgrid/mail";
import { DetailedQuote } from "../domain/quote/quote";
import fs from "fs";
import path from "path";
import mjml2html from "mjml";

export const EmailClient = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const buildQuoteEmail = (quote: DetailedQuote) => {
    const mjml = fs
      .readFileSync(path.join(__dirname, "./quote.mjml"))
      .toString();
    let regexFirstName = /{{FIRST_NAME}}/gi;
    let template = mjml.replace(regexFirstName, quote.firstName);
    return mjml2html(template).html;
  };
  return {
    send: async (to: string, quote: DetailedQuote) => {
      const msg = {
        to: to,
        from: "info@onedaypaint.com.au",
        subject: "OneDayPaint In-Home Quote",
        html: buildQuoteEmail(quote),
      };
      await sgMail.send(msg);
    },
  };
};
