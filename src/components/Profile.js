import React from "react";

const Profile = () => {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userType = userInfo.role.toUpperCase()

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
      <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
        <div className="px-3 py-4 sm:px-6">
          <h3 className="text-lg leading-6 mb-4 font-bold text-gray-900">
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
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className=" text-base font-medium text-gray-600">{userType} Name</dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                {(userInfo || {}).name || (userInfo || {}).studentName || (userInfo || {}).tutorName}
              </dd>
            </div>
            <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className=" text-base font-medium text-gray-600">{userType} Email</dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                {(userInfo || {}).email}
              </dd>
            </div>
            {(userInfo || {}).role === "student" || (userInfo || {}).role === "tutor"
              ?
              <React.Fragment>
                {/* <div className="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" text-base font-medium text-gray-600">ID</dt>
                  <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                    {(userInfo || {}).idNumber}
                  </dd>
                </div> */}
                <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" text-base font-medium text-gray-600">Courses</dt>
                  <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                    {(userInfo || {}).coursesName}
                  </dd>
                </div>
                <div className="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" text-base font-medium text-gray-600">Department</dt>
                  <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                    {(userInfo || {}).department}
                  </dd>
                </div>
                <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" text-base font-medium text-gray-600">Year</dt>
                  <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                    {(userInfo || {}).Year}
                  </dd>
                </div>
                {(userInfo || {}).role === "student" ?
                  <React.Fragment>
                    <div className="bg-bg-white  px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className=" text-base font-medium text-gray-600">GPA</dt>
                      <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                        {(userInfo || {}).GPA}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className=" text-base font-medium text-gray-600">CGPA</dt>
                      <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
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
