import React from "react";
import { useNavigate } from "react-router-dom";

const FormsTable = (props) => {
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { courseData } = props
  const evaFormButton = ((userInfo || {}).courseFormFilled || "").includes(courseData.idNumber)
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
      <div className="py-8">
        <div className=" -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Form Evaluation
              </h3>
              <p class="mt-1 max-w-2xl text-base text-gray-500">
                Details and informations evaluation forms.
              </p>
            </div>
            <table className="border-t border-gray-200 min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="font-medium px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  >
                    Teachers
                  </th>
                  <th
                    scope="col"
                    className="font-medium px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  >
                    Courses
                  </th>

                  <th
                    scope="col"
                    className="font-medium px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  >
                    Evaluation status
                  </th>
                  <th
                    scope="col"
                    className="font-medium px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {courseData.coursesInstructor}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{courseData.courseName}</p>
                  </td>
                  {!evaFormButton ?
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-red-300 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Not Evaluated</span>
                      </span>
                    </td>
                    :
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Evaluated</span>
                      </span>
                    </td>
                  }


                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => {
                        navigate(`/evaluationform/${courseData.idNumber}/${userInfo.id}`);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 "
                      disabled={evaFormButton}
                    >
                      {!evaFormButton ?
                        <p className="hover:underline hover:underline-offset-2">
                          Evaluate
                        </p>
                        :
                        <p className="text-secondary">
                          Evaluated
                        </p>
                      }

                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormsTable;
