import userSchema from "./users.schema.js";
import projectSchema from "./project.schema.js";

export default [
  ...userSchema,
  ...projectSchema,
]