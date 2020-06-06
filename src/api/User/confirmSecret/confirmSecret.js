import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          //확인된 유저는 loginsecret 지움.
          where: { id: user.id },
          data: {
            loginSecret: ""
          }
        });

        return generateToken(user.id);
      } else {
        throw Error("이메일로 전송된 인증 문자와 일치하지 않습니다.");
      }
    }
  }
};
