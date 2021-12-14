
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const inlineCss = require("inline-css");

exports.getTemplate = async(template, data = {}, opts) => {
    const selection = {
      account: fs
        .readFileSync(
          path.join(process.cwd(), "/Utils/Email.Provider/account.ejs")
        ).toString(),
      forgotpassword: fs
        .readFileSync(
          path.join(process.cwd(), "/Utils/Email.Provider/forgotpassword.ejs")
        ).toString(),
      
    };
    const acceptedType = ["account", "forgotpassword"];
    if (!acceptedType.includes(template))
      throw new Error(
        `Unknown email template type expected one of ${acceptedType} but got ${template}`
      );
    const html = ejs.compile(selection[template], opts || {})(data);
    return await inlineCss(html, {
      applyStyleTags: false,
      applyTableAttributes: true,
      removeHtmlSelectors: true,
      url: "http://localhost:3000/",
    });
  }