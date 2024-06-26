import "./VTStyles.css";

function VTlist({ index, activeTabId, onClick }) {
  const Clicked = () => {
    onClick(index);
  };

  return (
    <li key={index} className=" list-none">
      <button
        disabled
        className="section__Jobs-buttonCompany w-full"
        onClick={Clicked}
        style={(() => {
          if (activeTabId === index) {
            if (index === 0) {
              return { color: "#FC6D6D" };
            } else if (index === 1) {
              return { color: "#4EB5FF" };
            } else if (index === 2) {
              return { color: "#70FF87" };
            } else if (index === 3) {
              return { color: "#FFF170" };
            } else if (index === 4) {
              return { color: "#EB70FF" };
            } else if (index === 5) {
              return { color: "#FF8F50" };
            } else if (index === 6) {
              return { color: "#FC8C50" };
            } else if (index === 7) {
              return { color: "#FB2F50" };
            }
          } else {
            return {
              color: "#8892b0",
            };
          }
        })()}
      >
        {index + 1}.
      </button>
    </li>
  );
}

export default VTlist;
