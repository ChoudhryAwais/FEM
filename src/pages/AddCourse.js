/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
// import * as ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Button, Header } from "../components";
import { FirebaseCrud } from "../Firebase/Curds";

const AddCourse = () => {

  const [allTutor, setAllTutor] = useState([])

  const [modal, setModal] = useState({
    courseName: "",
    idNumber: "",
    coursesInstructor: "",
    department: "",
    Year: "",
  })

  useEffect(() => {
    const getCourses = async () => {
      const result = await FirebaseCrud("Users", "getDocAll")
      const teacherResult = result.filter(e => e.role === "tutor")
      if (result) {
        setAllTutor(teacherResult)
      }
    }
    getCourses()
  }, [])


  const handleChange = (e) => {
    const { value, name } = e.target
    setModal({
      ...modal,
      [name]: value
    })
  }

  const handleSubmit = () => {
    const { courseName, courses, department, idNumber, coursesInstructor } = modal
    if (courseName !== "" && courses !== "" && department !== "" & idNumber !== "" & coursesInstructor !== "") {
      FirebaseCrud("Courses", "addDoc", modal)
      alert("Course Save")
      setModal({
        courseName: "",
        idNumber: "",
        coursesInstructor: "",
        department: "",
        Year: "",
      })
    } else {
      alert("Field missing")
    }
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Courses" title="Add Course" />
      <div className="grid place-items-center">
        <div className="max-w-3xl w-full min-w-[300px]">
          <div className="flex flex-col gap-2 mb-6">
            <label className="">Course Name:</label>
            <TextBoxComponent
              placeholder="CS101"
              cssClass="e-filled"
              name="courseName"
              onChange={handleChange}
              value={modal.courseName}
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="">Course ID:</label>
            <TextBoxComponent
              placeholder="Course ID"
              cssClass="e-filled"
              name="idNumber"
              onChange={handleChange}
              value={modal.idNumber}
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="">Course Instructor:</label>
            <select
              className="form-select"
              name="coursesInstructor"
              onChange={handleChange}
              value={modal.coursesInstructor}
            >
              <option selected>Select Tutor</option>
              {allTutor && allTutor.map(e => {
                return <option value={e.tutorName} key={e.id}>{e.tutorName}</option>
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="">Department:</label>
            <TextBoxComponent
              placeholder="Department"
              cssClass="e-filled"
              name="department"
              onChange={handleChange}
              value={modal.department}
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="">Year:</label>
            <TextBoxComponent
              placeholder="Year"
              cssClass="e-filled"
              name="Year"
              onChange={handleChange}
              value={modal.Year}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <Button onClick={handleSubmit}>Add Course</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
