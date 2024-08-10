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
    console.log(obj);
    // const startDatetime = new Date(obj.)
    return {
      day: obj.conferenceDay,
      date: obj.conferenceDate,
      schedule: obj.timeslots.map((el, j) => {
        // let startHours = `${new Date(el.startTime).getHours() < 10 ? `0${new Date(el.startTime).getHours()}` : new Date(el.startTime).getHours()}`;
        // let startMinutes = `${new Date(el.startTime).getMinutes() < 10 ? `0${new Date(el.startTime).getMinutes()}` : new Date(el.startTime).getMinutes()}`;

        // let endHours = `${new Date(el.endTime).getHours() < 10 ? `0${new Date(el.endTime).getHours()}` : new Date(el.endTime).getHours()}`;
        // let endMinutes = `${new Date(el.endTime).getMinutes() < 10 ? `0${new Date(el.endTime).getMinutes()}` : new Date(el.endTime).getMinutes()}`;
        const startTimeArr = new Date(el.startTime)
          .toLocaleTimeString({
            timezone: "Asia/Kolkata",
          })
          .split(":");
        const endTimeArr = new Date(el.endTime)
          .toLocaleTimeString({
            timezone: "Asia/Kolkata",
          })
          .split(":");
        return {
          time: `${startTimeArr[0] + ":" + startTimeArr[1] + startTimeArr[2].slice(-2)}- ${endTimeArr[0] + ":" + endTimeArr[1] + endTimeArr[2].slice(-2)}`,
          postNriLunch: el.postNriLunch === "Yes" ? true : false,
          events: el.events.map(({ eventName }) => eventName),
        };
      }),
    };
  });

  return parsedRes;
}
