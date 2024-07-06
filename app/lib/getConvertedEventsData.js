import { sanityFetch } from "@/sanity";

export default async function getConvertedEventsData() {
  const res = await sanityFetch({
    query: `*[_type == 'conferenceBreakdown']{
    conferenceDay,conferenceDate,
    timeslots[]{
      startTime,endTime,postNriLunch,
      events[]->{
        eventName,
      },
    },
  }`,
  });

  const parsedRes = res.map((obj, i) => {
    return {
      day: obj.conferenceDay,
      date: obj.conferenceDate,
      schedule: obj.timeslots.map((el, j) => {
        return {
          time: `${new Date(el.startTime).getHours() < 10 ? `0${new Date(el.startTime).getHours()}` : new Date(el.startTime).getHours()}:${new Date(el.startTime).getMinutes() < 10 ? `0${new Date(el.startTime).getMinutes()}` : new Date(el.startTime).getMinutes()} - ${new Date(el.endTime).getHours() < 10 ? `0${new Date(el.endTime).getHours()}` : new Date(el.endTime).getHours()}:${new Date(el.endTime).getMinutes() < 10 ? `0${new Date(el.endTime).getMinutes()}` : new Date(el.endTime).getMinutes()}`,
          postNriLunch: el.postNriLunch === "Yes" ? true : false,
          events: el.events.map(({ eventName }) => eventName),
        };
      }),
    };
  });

  return parsedRes;
}
