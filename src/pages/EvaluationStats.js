import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components";
import { FirebaseCrud } from "../Firebase/Curds";
import Bar from "./Charts/Bar";
import Pie from "./Charts/Pie";


const EvaluationStats = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({})
  useEffect(() => {
    const getAllCourses = async () => {
      const result = await FirebaseCrud("Courses", "getDocById", null, courseId)
      const resultOfForm = await FirebaseCrud("CourseEvaForm", "getDocById", null, courseId)
      const resultOfUsers = await FirebaseCrud("Users", "getDocAll")
      const stdLength = resultOfUsers.filter(e => e.role === "student").length
      const newObject = { ...result, ...resultOfForm, studentLenght: stdLength }
      setCourseData(newObject)
    }
    getAllCourses()
  }, [])

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Evaluation Stats" title="CS101" />
      <div className="container mx-auto px-4 sm:px-32">
        <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
          <div class="px-3 py-4 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Form Details
            </h3>
            {/* <img
            className="object-contain h-44 w-44 rounded bg-slate-400"
            alt="profile"
            src={profilePic}
          /> */}
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class=" text-base font-medium text-gray-600">Course</dt>
                <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                  {courseData.courseName}
                </dd>
              </div>
              <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class=" text-base font-medium text-gray-600">Department</dt>
                <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                  {courseData.department}
                </dd>
              </div>
              <div class="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class=" text-base font-medium text-gray-600">
                  Forms Filled d
                </dt>
                <dd class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                  {courseData.filledForm} /  {courseData.studentLenght}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <Pie data={courseData} />
        </div>
        {/* <div className="w-1/2">
          <Bar />
        </div> */}
      </div>
    </div>
  );
};

export default EvaluationStats;
