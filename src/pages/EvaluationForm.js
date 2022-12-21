import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Header } from "../components";
import FormTemplate from "../components/FormTemplate";
import { FirebaseCrud } from "../Firebase/Curds";

const questions = [
  { id: 1, question: "How well do you know the subject?" },
  { id: 2, question: "The course content was?" },
  { id: 3, question: "The instructor's contribution to the course was?" },
  {
    id: 4,
    question: "Instructor was able to address and answer all my questions?",
  },
  { id: 5, question: "Communication during the session was clear?" },
  { id: 6, question: "Understood the mission clearly?" },
  {
    id: 7,
    question:
      "Instructor was able to grab all my attention for the entire session?",
  },
  { id: 8, question: "I felt that the topic was interesting and engaging?" },
  { id: 9, question: "The instructor was able to answer all my questions?" },
  { id: 10, question: "The instructor was able to answer all my questions?" },
];

const EvaluationForm = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { courseId, studentId } = useParams()
  const [courseData, setCourseData] = useState({})
  const [formModal, setFormModal] = useState({
    q0: 2,
    q1: 2,
    q2: 2,
    q3: 2,
    q4: 2,
    q5: 2,
    q6: 2,
    q7: 2,
    q8: 2,
    q9: 2,
    q10: 2,
  })

  const hanldeChange = (e) => {
    const { value, name } = e.targetd
    setFormModal({
      ...formModal,
      [name]: parseInt(value)
    })
  }

  const avgRateCal = () => {
    let modal = {
      poor: 0,
      unsatisfactory: 0,
      satisfactory: 0,
      fair: 0,
      good: 0
    }
    Object.values(formModal).forEach(e => {
      if (e === 1) {
        modal.poor++
      } else if (e === 2) {
        modal.unsatisfactory++
      } else if (e === 3) {
        modal.satisfactory++
      } else if (e === 4) {
        modal.fair++
      } else if (e === 5) {
        modal.good++
      }
    }
    )
    const avgRates = parseInt((modal.poor + modal.unsatisfactory + modal.satisfactory + modal.fair + modal.good) / 5)
    modal = {
      poor: 0,
      unsatisfactory: 0,
      satisfactory: 0,
      fair: 0,
      good: 0
    }
    if (avgRates === 0) {
      modal.poor++
    } else if (avgRates === 1) {
      modal.unsatisfactory++
    } else if (avgRates === 2) {
      modal.satisfactory++
    } else if (avgRates === 3) {
      modal.fair++
    } else if (avgRates === 4) {
      modal.good++
    }


    return modal
  }

  const handleSubmit = async () => {
    const avgRate = avgRateCal()
    const resultOfCourseForm = await FirebaseCrud("CourseEvaForm", "getDocById", null, courseId)
    if (resultOfCourseForm) {
      let updateResultOfCourseForm = { ...resultOfCourseForm }
      updateResultOfCourseForm.filledForm += 1
      updateResultOfCourseForm.poor = avgRate.poor
      updateResultOfCourseForm.unsatisfactory = avgRate.unsatisfactory
      updateResultOfCourseForm.satisfactory = avgRate.satisfactory
      updateResultOfCourseForm.fair = avgRate.fair
      updateResultOfCourseForm.good = avgRate.good
      const stdUpdate = { ...userInfo, courseFormFilled: courseId }
      localStorage.setItem("userInfo", JSON.stringify(stdUpdate));
      FirebaseCrud("Users", "updateDoc", { ...userInfo, courseFormFilled: courseId }, studentId)
      FirebaseCrud("CourseEvaForm", "updateDoc", updateResultOfCourseForm, courseId)
      navigate("/profile")
    }
  }

  useEffect(() => {
    const getStudendAndCourse = async () => {
      const resultOfCourse = await FirebaseCrud("Courses", "getDocById", null, courseId)
      setCourseData(resultOfCourse)
    }
    getStudendAndCourse()
  }, [])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Evaluation Form" title={courseData.courseName} />
      <div className="container mx-auto px-4 sm:px-32">
        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
          <div className="px-3 py-4 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Form Details
            </h3>
            {/* <img
                className="object-contain h-44 w-44 rounded bg-slate-400"
                alt="profile"
                src={profilePic}
              /> */}
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className=" text-base font-medium text-gray-600">
                  Teacher name
                </dt>
                <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                  {courseData.coursesInstructor}
                </dd>
              </div>
              <div className="bg-white px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className=" text-base font-medium text-gray-600">Courses</dt>
                <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                  {courseData.courseName}
                </dd>
              </div>
              <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className=" text-base font-medium text-gray-600">Department</dt>
                <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                  {courseData.department}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="grid place-items-center">
        <FormTemplate questions={questions} hanldeChange={hanldeChange} formModal={formModal} />
        <Button
          onClick={handleSubmit}
        >
          Submit Evaluation Form
        </Button>
      </div>
      <div className="w-1/2 text-center">
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
};

export default EvaluationForm;
