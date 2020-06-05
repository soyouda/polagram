import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT
        return generateToken(user.id);
      } else {
        throw Error("이메일로 전송된 인증 문자와 일치하지 않습니다.");
      }
    }
  }
};
