"use strict";
const { resizeHelper } = require("./helper");
module.exports.resizeOnFly = async event => {
  try {
    const imagePath = await resizeHelper.process(event);
    const URL = `https://static.campk12.com`;
    return {
      headers: { location: `${URL}/${imagePath}` },
      statusCode: 301,
      body: ""
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
