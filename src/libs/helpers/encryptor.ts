import bjs from "bcryptjs";

const encryptor = {
  encrypt: async (password: string, salt: number = 10) => {
    return await bjs.hash(password, salt);
  },
  decrypt: async (password: string, passwordFromDb: string) => {
    return await bjs.compare(password, passwordFromDb);
  },
};

export default encryptor;
