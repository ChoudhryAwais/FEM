import React from "react";

const FormTemplate = ({ questions, hanldeChange, formModal }) => {
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
      <div className="py-8">
        <div className=" -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Teacher Evaluation
              </h3>
              <p className="mt-1 max-w-2xl text-base text-gray-500">
                Please honestly rate your teacher's performance
              </p>
            </div>
            <table className="border-t border-gray-200 min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    /* scope="col" */
                    className="w-7/12 font-medium px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  ></th>
                  <th
                    /* scope="col" */
                    className="w-1/12 font-medium px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  >
                    Poor
                  </th>

                  <th
                    /* scope="col" */
                    className="w-1/12 font-medium px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  >
                    Unsatisfactory
                  </th>
                  <th
                    /* scope="col" */
                    className="w-1/12 font-medium px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  >
                    Satisfactory
                  </th>
                  <th
                    /* scope="col" */
                    className="w-1/12 font-medium px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  >
                    Fair
                  </th>
                  <th
                    /* scope="col" */
                    className="w-1/12 font-medium px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                  >
                    Good
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => {
                  return (
                    <tr key={q.id}>
                      <td className="px-5 py-5 bg-gray-100 border-b border-gray-200 text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-700 text-base whitespace-nowrap">
                              {q.question}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="grid place-items-center">
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            className="h-5 w-5"
                            onChange={hanldeChange}
                            value={1}
                            checked={formModal[`q${q.id}`] === 1 ? true : false}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="grid place-items-center">
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            className="h-5 w-5"
                            value={2}
                            onChange={hanldeChange}
                            checked={formModal[`q${q.id}`] === 2 ? true : false}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="grid place-items-center">
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            className="h-5 w-5"
                            value={3}
                            onChange={hanldeChange}
                            checked={formModal[`q${q.id}`] === 3 ? true : false}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="grid place-items-center">
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            className="h-5 w-5"
                            value={4}
                            onChange={hanldeChange}
                            checked={formModal[`q${q.id}`] === 4 ? true : false}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="grid place-items-center">
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            className="h-5 w-5"
                            value={5}
                            onChange={hanldeChange}
                            checked={formModal[`q${q.id}`] === 5 ? true : false}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTemplate;
