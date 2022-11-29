import React, { useEffect } from "react";

const Profile = () => {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userType = userInfo.role.toUpperCase()

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
      <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
        <div class="px-3 py-4 sm:px-6">
          <h3 class="text-lg leading-6 mb-4 font-bold text-gray-900">
            {userType} PROFILE
          </h3>
          {(userInfo || {}).role === "student" || (userInfo || {}).role === "tutor" ?
            <img
              className="object-contain h-44 w-44 rounded bg-slate-400"
              alt="profile"
              src={userInfo.fileToBase64}
            /> : null
          }

        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class=" text-base font-medium text-gray-600">{userType} Name</dt>
              <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                {(userInfo || {}).name || (userInfo || {}).studentName || (userInfo || {}).tutorName}
              </dd>
            </div>
            <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class=" text-base font-medium text-gray-600">{userType} Email</dt>
              <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                {(userInfo || {}).email}
              </dd>
            </div>
            {(userInfo || {}).role === "student" || (userInfo || {}).role === "tutor"
              ?
              <React.Fragment>
                <div class="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class=" text-base font-medium text-gray-600">ID</dt>
                  <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                    {(userInfo || {}).idNumber}
                  </dd>
                </div>
                <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class=" text-base font-medium text-gray-600">Courses</dt>
                  <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                    {(userInfo || {}).courseName}
                  </dd>
                </div>
                <div class="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class=" text-base font-medium text-gray-600">Department</dt>
                  <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                    {(userInfo || {}).department}
                  </dd>
                </div>
                <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class=" text-base font-medium text-gray-600">Year</dt>
                  <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                    {(userInfo || {}).Year}
                  </dd>
                </div>
                {(userInfo || {}).role === "student" ?
                  <React.Fragment>
                    <div class="bg-bg-white  px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class=" text-base font-medium text-gray-600">GPA</dt>
                      <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                        {(userInfo || {}).GPA}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class=" text-base font-medium text-gray-600">CGPA</dt>
                      <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                        3.2
                      </dd>
                    </div>
                  </React.Fragment> : null
                }

              </React.Fragment>
              : null
            }

          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile;
