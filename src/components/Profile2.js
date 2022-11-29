import React from "react";
import profilePic from "../data/avatar3.png";

const Profile2 = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
      <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
        <div class="px-3 py-4 sm:px-6">
          <h3 class="text-lg leading-6 mb-4 font-medium text-gray-900">
            Teacher Profile
          </h3>
          <img
            className="object-contain h-44 w-44 rounded bg-slate-400"
            alt="profile"
            src={profilePic}
          />
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class=" text-base font-medium text-gray-600">
                Teacher's name
              </dt>
              <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                Mickael Poulaz
              </dd>
            </div>
            <div class="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class=" text-base font-medium text-gray-600">ID</dt>
              <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                102354
              </dd>
            </div>
            <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class=" text-base font-medium text-gray-600">Courses</dt>
              <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                CS101, EN102, MA203
              </dd>
            </div>
            <div class="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class=" text-base font-medium text-gray-600">Department</dt>
              <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                CS
              </dd>
            </div>
            <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class=" text-base font-medium text-gray-600">Year</dt>
              <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
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
