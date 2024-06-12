import { blockContent } from "./schemaTypes/blockContent";
import { category } from "./schemaTypes/category";
import { post } from "./schemaTypes/post";
import { author } from "./schemaTypes/author";
import { deadline } from "./schemaTypes/deadline";
import { siteSettings } from "./schemaTypes/siteSettings";

export const schema = {
  types: [post, author, category, blockContent, deadline, siteSettings],
};
