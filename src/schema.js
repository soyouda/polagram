import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

/** api 폴더 내에는 .graphql, .js 이외의 파일이 있을 시 오류 발생함! */
const allTypes = fileLoader(path.join(__dirname,"/api/**/*.graphql"));
const allResolvers =  fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolver: mergeResolvers(allResolvers)
});
export default schema;