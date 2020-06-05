import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT
        return "TOKEN";
      } else {
        throw Error("이메일로 전송된 인증 문자와 일치하지 않습니다.");
      }
    }
  }
};
