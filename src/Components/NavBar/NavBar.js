import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="flex border-b">
        <Link to="/">
          <div className="-mb-px mr-1">
            <h3 className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold">
              Home
            </h3>
          </div>
        </Link>
        <Link to="/createschedule">
          <div className="mr-1">
            <p className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
              Create Schedule
            </p>
          </div>
        </Link>
        <Link to="/viewschedule">
          <div className="mr-1">
            <p className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
              View Schedule
            </p>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
