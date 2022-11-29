/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
// import * as ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import { Button, Header } from "../components";
import { FirebaseCrud } from "../Firebase/Curds";

const AddEvaluationForm = () => {
    const [allCourses, setAllCourses] = useState([])

    const [modal, setModal] = useState({
        courseName: "",
        idNumber: "",
        filledForm: 0,
        good: 0,
        poor: 0,
        satisfactory: 0,
        unsatisfactory: 0,
        fair: 0
    })

    useEffect(() => {
        const getCourses = async () => {
            const result = await FirebaseCrud("Courses", "getDocAll")
            if (result) {
                setAllCourses(result)
            }
        }
        getCourses()
    }, [])


    const handleChange = (e) => {
        const { value } = e.target
        let courseName = ((allCourses.filter(e => e.id === value) || "")[0] || {}).courseName
        setModal({
            ...modal,
            courseName,
            idNumber: value,
        })
    }

    const handleSubmit = () => {
        const { courseName, idNumber } = modal
        if (courseName && courseName !== "") {
            FirebaseCrud("CourseEvaForm", "setDoc", modal, idNumber)
            alert("Form Added")
            setModal({
                courseName: "",
                idNumber: "",
            })
        } else {
            alert("Field missing")
        }
    }
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Course evaluation Form" title="Add Form" />
            <div className="grid place-items-center">
                <div className="max-w-3xl w-full min-w-[300px]">
                    <div className="flex flex-col gap-2 mb-6">
                        <label className="">Course Name:</label>
                        <select
                            className="form-select"
                            name="coursesInstructor"
                            onChange={handleChange}
                            value={modal.id}
                        >
                            <option selected value="">Select Course</option>
                            {allCourses && allCourses.map(e => {
                                return <option value={e.id} key={e.id}>{e.courseName}</option>
                            })}
                        </select>
                    </div>


                    <div className="flex flex-col gap-2 m-5">
                        <Button onClick={handleSubmit}>Add Form</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvaluationForm;
