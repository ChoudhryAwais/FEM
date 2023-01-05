/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
// import * as ReactDOM from 'react-dom';

import React, { useState, useEffect } from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Button, Header } from "../components";
import { FirebaseCrud } from "../Firebase/Curds";
import { auth } from "../Firebase/FirebaseApp";
import Select from 'react-select'

const AddTeacher = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [allCourses, setAllCourses] = useState([])
  const [modal, setModal] = useState({
    tutorName: "",
    idNumber: "",
    courses: "",
    department: "",
    Year: "",
    fileToBase64: null,
  })

  useEffect(() => {
    const getCourses = async () => {
      const result = await FirebaseCrud("Courses", "getDocAll")
      if (result) {
        let arr = []
        result.forEach(element => {
          arr.push({
            value: element.id,
            label: element.courseName
          })
        });
        setAllCourses(arr)
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
    const { tutorName, courses, department, idNumber, fileToBase64 } = modal
    if (tutorName !== "" && courses !== "" && department !== "" & idNumber !== "" & fileToBase64 !== "") {
      let tutorName = modal.tutorName.replaceAll(/\s/g, '').toLowerCase() + Math.floor(Math.random() * 100);
      auth.createUserWithEmailAndPassword(tutorName + "@fem.com", "fem123").then(async (register) => {
        let id = register.user._delegate.uid
        const email = userInfo.email
        const password = userInfo.password
        const reLogin = await auth.signInWithEmailAndPassword(email, password)
        if (reLogin.user) {
          let courseName = ""
          let coursesName = []
          const myArray = courses.split(",");
          myArray.forEach(ele => {
            courseName = ((allCourses.filter(e => e.value === ele) || "")[0] || {}).label
            coursesName.push(courseName)
          })
          try {
            FirebaseCrud("Users", "setDoc", { ...modal, role: "tutor", email: tutorName + "@fem.com", password: "fem123", coursesName: coursesName.toString() }, id)
            alert("Tutor save")
          } catch {
            alert("Something went wrong")
          }


        }
      }).catch((error) => {
        alert(error)
      })
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

  const handleMultiSelect = (e) => {
    let arr = []
    e.forEach(element => {
      arr.push(element.value)
    });
    setModal({
      ...modal,
      courses: arr.toString()
    })
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Teachers" title="Add Teacher" />
      <div className="grid place-items-center">
        <div className="max-w-3xl w-full min-w-[300px]">
          <div className="flex flex-col gap-2 mb-6">
            <label className="">Tutor Name:</label>
            <TextBoxComponent
              placeholder="Ali Ahmed Khan"
              cssClass="e-filled"
              name="tutorName"
              onChange={handleChange}
              value={modal.tutorName}
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="">Tutor Picture:</label>
            <input
              id="picture"
              type="file"
              className="form-control"
              onChange={handleFileInputChange}
              accept="image/png, image/gif, image/jpeg ,image/jpg "
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="">ID Number:</label>
            <TextBoxComponent
              type="number"
              placeholder="ID Number"
              cssClass="e-filled"
              name="idNumber"
              onChange={handleChange}
              value={modal.idNumber}
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="">Courses:</label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              name="colors"
              options={allCourses}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleMultiSelect}
            />
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
              type="number"
              placeholder="Year"
              cssClass="e-filled"
              name="Year"
              onChange={handleChange}
              value={modal.Year}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <Button onClick={handleSubmit}>Add Teacher</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
