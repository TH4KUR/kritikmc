const Bullet = ({ size = 8, color = "#000", classname }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      className={classname}
    >
      <path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path>
    </svg>
  );
};

export default Bullet;
