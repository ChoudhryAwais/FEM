/* eslint-disable quotes */
import React from "react";
import { MdOutlineCancel } from "react-icons/md";

// import { Button } from ".";
import { useNavigate } from "react-router-dom";
import ConfigButton from "./ConfigButton";
import Button from "./Button";
import avatar from "../data/avatar.jpg";
import { useStateContext } from "../contexts/ContextProvider";

const UserProfile = (props) => {
  const { userInfo, userName } = props
  const userType = userInfo.role.toUpperCase()
  const { handleClickFalse } = useStateContext();
  const navigate = useNavigate();
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <ConfigButton
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        {userInfo.role === "admin"
          ?
          <img
            className="rounded-full h-24 w-24"
            src={avatar}
            alt="user-profile"
          />
          :
          <img
            className="rounded-full h-24 w-24"
            src={(userInfo || {}).fileToBase64}
            alt="user-profile"
          />
        }
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {userName}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {userType}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {(userInfo || {}).email}
          </p>
        </div>
      </div>
      {/* <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="flex mt-5">
        <Button
          onClick={() => {
            handleClickFalse("userProfile");
            localStorage.removeItem("userInfo");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
