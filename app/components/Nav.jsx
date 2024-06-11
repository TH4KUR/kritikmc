import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-bgNav">
        <div className="text-2xl font-bold px-4 py-2">
          <Link href={"/"}>
            kriti<span className="text-accent">.</span>
          </Link>
        </div>
        <div className="flex items-center gap-3 mr-4">
          <Link
            href={"#"}
            className="text-xs font-bold text-accent underline underline-offset-1"
          >
            Register Now!
          </Link>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
