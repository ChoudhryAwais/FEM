import React from "react";
import profilePic from "../data/avatar3.png";

const Profile2 = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
      <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
        <div className="px-3 py-4 sm:px-6">
          <h3 className="text-lg leading-6 mb-4 font-medium text-gray-900">
            Teacher Profile
          </h3>
          <img
            className="object-contain h-44 w-44 rounded bg-slate-400"
            alt="profile"
            src={profilePic}
          />
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className=" text-base font-medium text-gray-600">
                Teacher's name
              </dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                Mickael Poulaz
              </dd>
            </div>
            <div className="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className=" text-base font-medium text-gray-600">ID</dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                102354
              </dd>
            </div>
            <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className=" text-base font-medium text-gray-600">Courses</dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                CS101, EN102, MA203
              </dd>
            </div>
            <div className="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className=" text-base font-medium text-gray-600">Department</dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                CS
              </dd>
            </div>
            <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className=" text-base font-medium text-gray-600">Year</dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                2022
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile2;
