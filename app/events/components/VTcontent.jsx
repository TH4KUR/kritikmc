import "./VTStyles.css";

function VTcontent(props) {
  let data = props.data.expData;

  return (
    <div
      key={props.index}
      className="section__Jobs-styledContent w-10/12"
      style={
        props.activeTabId === props.index
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <img className="event-img" src={data.img} alt="event 1" />
      <div
        className={(() => {
          let clas = "px-4 py-5 ";
          if (props.index === 0) {
            clas += "bg-[#16040F]";
          } else if (props.index === 1) {
            clas += "bg-[#140828]";
          } else if (props.index === 2) {
            clas += "bg-[#131604]";
          } else if (props.index === 3) {
            clas += "bg-[#212208]";
          } else if (props.index === 4) {
            clas += "bg-[#1F0720]";
          } else if (props.index === 5) {
            clas += "bg-[#241307]";
          }
          return clas;
        })()}
      >
        <h3
          className={(() => {
            let clas =
              "event-name relative z-10 text-lg font-semibold text-center w-[20ch] ";
            if (props.index === 0) {
              clas += "text-[#FC6D6D] before:bg-[#310B0B]";
            } else if (props.index === 1) {
              clas += "text-[#4EB5FF] before:bg-[#2F104E]";
            } else if (props.index === 2) {
              clas += "text-[#70FF87] before:bg-[#10310B]";
            } else if (props.index === 3) {
              clas += "text-[#FFF170] before:bg-[#3F4410]";
            } else if (props.index === 4) {
              clas += "text-[#EB70FF] before:bg-[#320E44]";
            } else if (props.index === 5) {
              clas += "text-[#FF8F50] before:bg-[#43210E]";
            }
            return clas;
          })()}
        >
          {data.eventname}
        </h3>
        <p className="text-gray-200 text-sm">{data.desc}</p>
      </div>
    </div>
  );
}

export default VTcontent;
