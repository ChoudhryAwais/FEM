/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
// import * as ReactDOM from 'react-dom';
import React, { useState } from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Button, Header } from "../components";
import { useEffect } from "react";
import { FirebaseCrud } from "../Firebase/Curds";
import { auth } from "../Firebase/FirebaseApp";


const AddStudent = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [allCourses, setAllCourses] = useState([])
  const [studentData, setStudentData] = useState([])

  const [addExisting, setAddExisting] = useState(false)

  const allSemester = ["1", "2", "3", "4", "5", "6", "7", "8"]
  const [modal, setModal] = useState({
    studentName: "",
    courses: "",
    department: "",
    semester: "",
    Year: "",
    GPA: "",
    CGPA: "",
    fileToBase64: null,
  })

  useEffect(() => {
    const getCourses = async () => {
      const result = await FirebaseCrud("Courses", "getDocAll")
      if (result) {
        setAllCourses(result)
      }
    }
    const getAllStudent = async () => {
      const result = await FirebaseCrud("Users", "getDocAll")
      const studentResult = result.filter(e => e.role === "student")
      setStudentData(studentResult)
    }
    getAllStudent()
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
    const { studentName, courses, department, fileToBase64 } = modal
    if (studentName !== "" && courses !== "" && department !== "" && fileToBase64 !== "") {
      if (addExisting) {
        const formModal = { ...modal }
        const AllStdGPA = (studentData.filter(item => item.idNumber === formModal.idNumber) || "").map(e => e.GPA)
        const CGPA = ((AllStdGPA.reduce((a, b) => parseInt(a) + parseInt(b), 0)) + (parseInt(formModal.GPA) || 0)) / (AllStdGPA.length + 1)

        FirebaseCrud("Users", "addDoc", { ...formModal, CGPA: CGPA })
        alert("Student save")

      } else {
        const courseName = ((allCourses.filter(e => e.id === courses) || "")[0] || {}).courseName
        let stdName = modal.studentName.replaceAll(/\s/g, '').toLowerCase() + Math.floor(Math.random() * 100);
        auth.createUserWithEmailAndPassword(stdName + "@fem.com", "fem123").then(async (register) => {
          let id = register.user._delegate.uid
          const email = userInfo.email
          const password = userInfo.password
          const reLogin = await auth.signInWithEmailAndPassword(email, password)
          if (reLogin.user) {
            FirebaseCrud("Users", "setDoc", { ...modal, role: "student", email: stdName + "@fem.com", password: "fem123", coursesName: courseName, idNumber: id, CGPA: modal.GPA, }, id)
            alert("Student save")
            setModal({
              studentName: "",
              courses: "",
              department: "",
              semester: "",
              Year: "",
              GPA: "",
              CGPA: "",
              fileToBase64: null,
            })
          }
        }).catch((error) => {
          alert(error)
        })
      }

    } else {
      alert("Field missing")
    }
  }


  const getBase64 = file => {
    return new Promise(resolve => {
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        let baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };


  const handleFileInputChange = e => {
    if (e.target.files[0].size < 999999) {
      getBase64(e.target.files[0])
        .then(result => {
          setModal({
            ...modal,
            fileToBase64: result
          })
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("Picture size must be smaller then 1MB")
      let a = document.getElementById('picture');
      a.value = ""
    }

  };

  const handleSelectExistingStd = (e) => {
    const seleStd = (studentData.filter(item => item.idNumber === e.target.value) || "")
    if (seleStd.length > 0) {
      setModal({
        ...modal,
        studentName: seleStd[0].studentName,
        department: seleStd[0].department,
        Year: seleStd[0].Year,
        fileToBase64: seleStd[0].fileToBase64,
        coursesName: seleStd[0].coursesName,
        email: seleStd[0].email,
        password: "fem123",
        role: "student",
        idNumber: seleStd[0].idNumber,
      })
    }

  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Students" title="Add Student" />
      <div className="row grid place-items-center">
        <div className="form-check form-switch max-w-3xl w-full min-w-[300px]">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
            onClick={() => {
              setAddExisting(!addExisting)
              setModal({
                studentName: "",
                courses: "",
                department: "",
                semester: "",
                Year: "",
                GPA: "",
                CGPA: "",
                fileToBase64: null,
              })
            }}
            checked={addExisting}
          />
          <label className="form-check-label" for="flexSwitchCheckChecked">Add Existing Student</label>
        </div>
      </div>

      <div className="grid place-items-center mt-5">
        <div className="max-w-3xl w-full min-w-[300px]">
          {!addExisting ?
            <div className="flex flex-col gap-2 mb-6">
              <label className="">Student Name:</label>
              <TextBoxComponent
                placeholder="Ali Ahmed Khan"
                cssClass="e-filled"
                name="studentName"
                onChange={handleChange}
                value={modal.studentName}
                disabled={addExisting}
              />

            </div>
            :
            <div className="flex flex-col gap-2 mb-6">
              <label className="">Student Name:</label>
              <select
                className="form-select"
                name="courses"
                onChange={handleSelectExistingStd}
                value={modal.idNumber}
              >
                <option selected>Select Students</option>
                {studentData && studentData.map((e, i) => {
                  return <option value={e.idNumber} key={i}>{e.studentName}</option>
                })}
              </select>
            </div>
          }

          <div className="flex flex-col gap-2 mb-6">
            <label className="">Student Picture:</label>
            <input
              id="picture"
              type="file"
              className="form-control"
              onChange={handleFileInputChange}
              accept="image/png, image/gif, image/jpeg ,image/jpg "
              disabled={addExisting}
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="">Courses:</label>
            <select
              className="form-select"
              name="courses"
              onChange={handleChange}
              value={modal.courses}
            >
              <option selected>Select Course</option>
              {allCourses && allCourses.map(e => {
                return <option value={e.id} key={e.id}>{e.courseName}</option>
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
              disabled={addExisting}
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="">Semester:</label>
            <select
              className="form-select"
              name="semester"
              onChange={handleChange}
              value={modal.semester}
            >
              <option selected>Select Semester</option>
              {allSemester.map(e => {
                return <option value={e} key={e}>{e}</option>
              })}
            </select>

          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="">Year:</label>
            <TextBoxComponent
              placeholder="Year"
              cssClass="e-filled"
              name="Year"
              onChange={handleChange}
              value={modal.Year}
              disabled={addExisting}
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="">GPA:</label>
            <TextBoxComponent
              type="number"
              placeholder="GPA"
              cssClass="e-filled"
              name="GPA"
              onChange={handleChange}
              value={modal.GPA}

            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <Button onClick={handleSubmit}>Add Student</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
