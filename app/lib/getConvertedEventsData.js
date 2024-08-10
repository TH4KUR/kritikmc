import { sanityFetch } from "@/sanity";

export default async function getConvertedEventsData() {
  const res = await sanityFetch({
    query: `*[_type == 'conferenceBreakdown']{
    conferenceDay,conferenceDate,
    timeslots[]{
      cardTitle,startTime,endTime,postNriLunch,
      events[]->{
        eventName,
      },
    },
    }`,
  });

  const parsedRes = res.map((obj, i) => {
    console.log(obj);
    // const startDatetime = new Date(obj.)
    return {
      day: obj.conferenceDay,
      date: obj.conferenceDate,
      schedule: obj.timeslots.map((el, j) => {
        return {
          time: `${el.cardTitle}`,
          postNriLunch: el.postNriLunch === "Yes" ? true : false,
          events: el.events.map(({ eventName }) => eventName),
        };
      }),
    };
  });

  return parsedRes;
}
