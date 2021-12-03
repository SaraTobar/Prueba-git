import userResolver from "./users.resolvers.js";
import projectResolver from "./project.resolvers.js";

const { Query: userQueries, Mutation: userMutations, ...userRest } = userResolver;
const { Query: projectQueries, Mutation: projectMutations, ...projectRest } = projectResolver;

export default{
  Query: {
    ...userQueries,
    ...projectQueries,
  },
  Mutation: {
    ...userMutations,
    ...projectMutations,
  },
  ...userRest,
  ...projectRest
};