import { sanityAnnouncementFetch } from "@/sanity";
import { urlForImage } from "@/sanity/lib/image";

async function getArchivesData() {
  const res = await sanityAnnouncementFetch({
    query: `*[_type=='archives']{_id ,archivesName, archivesDesc}`,
  });

  let newRes = res.map((obj) => {
    // let imagesarr = obj.archivesImgArr.map((el) => urlForImage(el));
    let newObj = {
      archiveId: obj._id,
      archivesName: obj.archivesName,
      archivesDesc: obj.archivesDesc,
    };
    return newObj;
  });

  return newRes;
}

export default getArchivesData;
