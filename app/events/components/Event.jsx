/* eslint-disable @next/next/no-img-element */
import VerticalTab from "./VerticalTab";
const Event = () => {
  let eventData = {
    events: [
      {
        expData: {
          company: "1.",
          eventname: "Paper and poster presentation",
          img: "event1.webp",
          desc: `Submission Process: Abstracts are to be submitted, either individually or as a pair (author and co-author). Following the screening process:
          
          > Podium presentation
          > Poster Presentation
          
          Abstracts not selected for podium presentation will be given the opportunity to present posters. This includes case reports, research not chosen for podium presentation, and topics of significance.`,
        },
      },
      {
        expData: {
          company: "2.",
          eventname: "Med-Exibition",
          img: "event1.webp",
          desc: "goo goo ga ga",
        },
      },
      {
        expData: {
          company: "3.",
          eventname: "Symposium",
          img: "event2.jpg",
          desc: "hello world",
        },
      },
      {
        expData: {
          company: "4.",
          eventname: "Symposium",
          img: "event2.jpg",
          desc: "hello world",
        },
      },
      {
        expData: {
          company: "5.",
          eventname: "Ok boomer",
          img: "event2.jpg",
          desc: "hello world",
        },
      },
      {
        expData: {
          company: "6.",
          eventname: "super stong man",
          img: "event2.jpg",
          desc: "hello world",
        },
      },
    ],
  };

  return <VerticalTab data={eventData.events} />;
};

export default Event;
