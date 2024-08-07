"use server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  apiKey: process.env.UPLOADTHING_SECRET,
});

export const renameFiles = async (oldname, newname) => {
  return utapi.renameFiles({
    keyey: oldname,
    newName: `${newname}.jpg`,
  });
};
