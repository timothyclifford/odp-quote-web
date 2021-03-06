import sgMail from "@sendgrid/mail";
import {
  calculateQuoteDiscount,
  calculateQuoteSubTotal,
  calculateQuoteTotal,
  DetailedQuote,
} from "../domain/quote/quote";
import fs from "fs";
import path from "path";
import mjml2html from "mjml";
import { getEnvironmentConfiguration } from "./environmentConfiguration";
import {
  Area,
  calculateAreaPrice,
  calculateAreaTotalPrice,
} from "../domain/area/area";
import { AreaItem, calculateAreaItemPrice } from "../domain/area/areaItem";
import { Inclusion } from "../domain/inclusions/inclusion";
import { calculateExtraPrice, Extra } from "../domain/extra/extra";

const spacer = `<tr style="border-bottom:1px solid #C7C6D1">
  <td>&nbsp;</td>
  <td>&nbsp;</td>
  <td>&nbsp;</td>
  <td>&nbsp;</td>
</tr>`;

const buildPrice = (quote: DetailedQuote): string =>
  `${buildAreasEmail(quote.areas ?? [])}
  <tr style="border-bottom:1px solid #C7C6D1">
    <td style="text-align:left">Extras</td>
    <td style="text-align:center"></td>
    <td style="text-align:center"></td>
    <td style="text-align:center"></td>
  </tr>
  ${buildExtrasEmail(quote.extras ?? [])}
  ${spacer}
  ${
    calculateQuoteDiscount(quote)
      ? `<tr style="border-bottom:1px solid #C7C6D1">
          <td style="text-align:left">Subtotal</td>
          <td style="text-align:center"></td>
          <td style="text-align:center"></td>
          <td style="text-align:center">$${calculateQuoteSubTotal(quote)}</td>
        </tr>
        <tr style="border-bottom:1px solid #C7C6D1">
          <td style="text-align:left">Discount</td>
          <td style="text-align:center"></td>
          <td style="text-align:center"></td>
          <td style="text-align:center">$${calculateQuoteDiscount(quote)}</td>
        </tr>`
      : ""
  }
  <tr style="border-bottom:1px solid #C7C6D1">
    <td style="text-align:left">Total</td>
    <td style="text-align:center"></td>
    <td style="text-align:center"></td>
    <td style="text-align:center">$${calculateQuoteTotal(quote)}</td>
  </tr>`;

const buildAreasEmail = (areas: Array<Area>): string =>
  areas
    .map(
      (area) =>
        `<tr style="border-bottom:1px solid #C7C6D1">
      <td style="text-align:left">${area.name}</td>
      <td style="text-align:center"></td>
      <td style="text-align:center"></td>
      <td style="text-align:center">$${calculateAreaPrice(area)}</td>
    </tr>
    ${buildItemsEmail(area.items)}
    <tr style="border-bottom:1px solid #C7C6D1">
      <td style="text-align:left">Total</td>
      <td style="text-align:center"></td>
      <td style="text-align:center"></td>
      <td style="text-align:center">$${calculateAreaTotalPrice(area)}</td>
    </tr>
    ${spacer}`
    )
    .reduce((previous, next) => previous.concat(next), "");

const buildItemsEmail = (items: Array<AreaItem>): string =>
  items
    .map(
      (item) =>
        `<tr style="border-bottom:1px solid #C7C6D1">
      <td style="text-align:left;font-size:85%">&nbsp;&nbsp;&nbsp;${
        item.name
      }</td>
      <td style="text-align:center;font-size:85%">$${item.price}</td>
      <td style="text-align:center;font-size:85%">${item.quantity}</td>
      <td style="text-align:center;font-size:85%">$${calculateAreaItemPrice(
        item
      )}</td>
    </tr>`
    )
    .reduce((previous, next) => previous.concat(next), "");

const buildExtrasEmail = (extras: Array<Extra>) =>
  extras
    .map(
      (extra) =>
        `<tr style="border-bottom:1px solid #C7C6D1">
          <td style="text-align:left">${extra.name}</td>
          <td style="text-align:center">$${extra.price}</td>
          <td style="text-align:center">${extra.quantity}</td>
          <td style="text-align:center">$${calculateExtraPrice(extra)}</td>
        </tr>`
    )
    .reduce((previous, next) => previous.concat(next), "");

const buildInclusions = (inclusions: Array<Inclusion>): string => {
  const html = inclusions
    .filter((x) => x.default)
    .map((x) => {
      return `<mj-text mj-class="para" color="#152C52">??? ${x.name}</mj-text>`;
    })
    .reduce((previous, next) => previous.concat(next), "");
  return `
    <mj-section>
      <mj-column>
        <mj-text font-family="Work Sans,Arial,sans-serif" mj-class="hd-2" color="#152C52">Quote inclusions</mj-text>
        <mj-image width="80px" src="https://estimate.onedaypaint.com.au/images/divider-squiggle.png" />
        ${html}
      </mj-column>
    </mj-section>`;
};

const buildExclusions = (exclusions: Array<Inclusion>): string => {
  const html = exclusions
    .filter((x) => x.default)
    .map((x) => {
      return `<mj-text mj-class="para" color="#152C52">??? ${x.name}</mj-text>`;
    })
    .reduce((previous, next) => previous.concat(next), "");
  return `
    <mj-section>
      <mj-column>
        <mj-text font-family="Work Sans,Arial,sans-serif" mj-class="hd-2" color="#152C52">Quote exclusions</mj-text>
        <mj-image width="80px" src="https://estimate.onedaypaint.com.au/images/divider-squiggle.png" />
        ${html}
      </mj-column>
    </mj-section>`;
};

const buildComments = (comments: string): string => {
  return `
    <mj-section>
      <mj-column>
        <mj-text font-family="Work Sans,Arial,sans-serif" mj-class="hd-2" color="#152C52">Comments</mj-text>
        <mj-image width="80px" src="https://estimate.onedaypaint.com.au/images/divider-squiggle.png" />
        <mj-text mj-class="para" color="#152C52">${comments}</mj-text>
      </mj-column>
    </mj-section>`;
};

export const EmailClient = () => {
  const env = getEnvironmentConfiguration();
  sgMail.setApiKey(env.SENDGRID_API_KEY!);
  const buildQuoteEmail = (quote: DetailedQuote) => {
    const templateFilePath = path.join(process.cwd(), "emails");
    const mjml = fs
      .readFileSync(templateFilePath + "/quote.mjml", "utf8")
      .toString();
    let template = mjml
      .replace(/{{QUOTE_NUMBER}}/gi, quote.id)
      .replace(/{{FIRST_NAME}}/gi, quote.firstName)
      .replace(/{{LAST_NAME}}/gi, quote.lastName)
      .replace(/{{EMAIL}}/gi, quote.email)
      .replace(/{{PHONE}}/gi, quote.phone)
      .replace(/{{STREET}}/gi, quote.street)
      .replace(/{{SUBURB}}/gi, quote.suburb)
      .replace(/{{POSTCODE}}/gi, quote.postcode)
      .replace(/{{PRICE}}/gi, buildPrice(quote));
    if (quote.inclusions) {
      if (
        quote.inclusions.inclusions &&
        quote.inclusions.inclusions.length > 0
      ) {
        template = template.replace(
          /{{INCLUSIONS}}/gi,
          buildInclusions(quote.inclusions.inclusions)
        );
      }
      if (
        quote.inclusions.exclusions &&
        quote.inclusions.exclusions.length > 0
      ) {
        template = template.replace(
          /{{EXCLUSIONS}}/gi,
          buildExclusions(quote.inclusions.exclusions)
        );
      }
      if (quote.inclusions.comments && quote.inclusions.comments.length > 0) {
        template = template.replace(
          /{{COMMENTS}}/gi,
          buildComments(quote.inclusions.comments)
        );
      }
    }

    return mjml2html(template).html;
  };
  return {
    send: async (to: string, quote: DetailedQuote) => {
      const msg = {
        to: to,
        from: { name: "One Day Paint", email: "info@onedaypaint.com.au" },
        subject: "Your In-Home Quote",
        html: buildQuoteEmail(quote),
      };
      await sgMail.send(msg);
    },
  };
};
