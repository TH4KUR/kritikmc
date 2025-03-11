import { sanityFetch } from "@/sanity";
import { urlForImage } from "@/sanity/lib/image";

async function getSpecificArchive(id) {
  const res = await sanityFetch({
    query: `*[_type=='archives' && _id=='${id}']{archivesName, archivesDesc,archivesImgArr}`,
  });
  let newRes = res.map((obj) => {
    let imagesarr = obj.archivesImgArr.map((el) => urlForImage(el));
    let newObj = {
      archiveId: obj._id,
      archivesName: obj.archivesName,
      archivesDesc: obj.archivesDesc,
      archivesImgs: imagesarr,
    };
    return newObj;
  });

  return newRes;
}

export default getSpecificArchive;
