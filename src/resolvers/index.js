import userResolver from "./user.resolver.js";
import projectResolver from "./project.resolver.js";

const { userQueries, userMutations, ...userRest } = userResolver;
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
