export default {
  Mutation: {
    createAccount: async (_, args, { prisma }) => {
      const { name, email, firstName = "", lastName = "", bio = "" } = args;
      const user = await prisma.createUser({
        name,
        email,
        firstName,
        lastName,
        bio
      });
      return user;
    }
  }
};
