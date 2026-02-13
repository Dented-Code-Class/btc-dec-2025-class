export const randomIdGenerator = (inputLen = 6) => {
  /**
   * Function Description: Generate random string with length 6
   * inputLen: input length of string, default value is 6
   */
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let rString = "";
  let length = inputLen;

  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * characters.length);

    rString += characters[randomNumber];
  }

  return rString;
};
