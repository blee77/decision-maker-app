function generateRandomString() {
  let characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let stringLength = 6;

  let randomString = "";

  for (let i = 0; i < stringLength; i++) {
    let randomNumber = Math.floor(Math.random() * characters.length);
    randomString += characters[randomNumber];
  }
  return randomString;
}

function generateAdminLink() {
  let uniqueID = generateRandomString();
  let finalURL = "/results/" + uniqueID;
  return finalURL;
}

function generateSubmissionLink() {
  let uniqueID = generateRandomString();
  let finalURL = "/vote/" + uniqueID;
  return finalURL;
}

module.exports = { generateAdminLink, generateSubmissionLink };
