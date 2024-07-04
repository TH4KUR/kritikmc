/* eslint-disable @next/next/no-img-element */
import VerticalTab from "./VerticalTab";
const Event = () => {
  let eventData = {
    events: [
      {
        event: {
          eventNumber: "1",
          eventName: "Jeopardy",
          eventImg: "/jeopardy.jpg",
          eventDesc:
            "Modeled after the popular game show, Jeopardy challenges participants knowledge of medical trivia across various categories. Teams compete against each other, answering questions ranging from anatomy and physiology to medical history and current trends",
          slogan: "Unleash Your Inner Genius",
        },
      },
      {
        event: {
          eventNumber: "2",
          eventName: "Med-Exibition",
          eventImg: "/exhibition.jpg",
          eventDesc:
            "The medical exhibition is a vibrant hub of activity, featuring a variety of small games, workshops, and interactive displays. From hands-on demonstrations of medical procedures to informative sessions on healthcare innovations, attendees can immerse themselves in a diverse range of educational experiences.",
          slogan:
            "Where Science Meets Healing: Exploring Innovations in Medicine",
        },
      },
      {
        event: {
          eventNumber: "3",
          eventName: "Debate",
          eventImg: "/debate.jpg",
          eventDesc:
            "Participants engage in lively debates on contemporary medical topics, presenting arguments and counterarguments in a structured format.",
          slogan: "Debate the Issues, Defend Your Stance: Challenge Accepted?",
        },
      },
      {
        event: {
          eventNumber: "4",
          eventName: "Hackathon",
          eventImg: "/hackathon.jpg",
          eventDesc:
            "The hackathon is a collaborative event where participants work in teams to develop innovative solutions to specific medical challenges within a limited time frame. It encourages creativity, teamwork, and rapid prototyping, fostering a culture of innovation and problem-solving in healthcare.",
          slogan: "Where Ideas Transform into Reality",
        },
      },
      {
        event: {
          eventNumber: "5",
          eventName: "Paper Presentation",
          eventImg: "/paperpresentation.jpg",
          eventDesc:
            "Participants present their research findings and studies on various medical topics. Each presentation is followed by a Q&A session, allowing for a deeper discussion and analysis of the research presented.",
          slogan: "From Theory to Reality: Present your paper, Inspire Change",
        },
      },
      {
        event: {
          eventNumber: "6",
          eventName: "Symposium",
          eventImg: "/symposium.jpg",
          eventDesc:
            "The symposium brings together experts and professionals from various fields of medicine for in-depth discussions and presentations.",
          slogan: "Fueling Minds, Igniting Innovation: Symposium",
        },
      },
      {
        event: {
          eventNumber: "7",
          eventName: "Poster Presentation",
          eventImg: "/posterpresentation.jpg",
          eventDesc:
            "Participants present their research findings and studies on various medical topics. Each presentation is followed by a Q&A session, allowing for a deeper discussion and analysis of the research presented.",
          slogan: "From Theory to Reality: Present your paper, Inspire Change",
        },
      },
    ],
  };

  return <VerticalTab data={eventData.events} />;
};

export default Event;
