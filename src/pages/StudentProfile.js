import * as React from "react";
import { Header } from "../components";
import Profile from "../components/Profile";
import FormsTable from "../components/FormsTable";
import { useEffect } from "react";
import { FirebaseCrud } from "../Firebase/Curds";
import { useState } from "react";
import FormsTable2 from "../components/FormsTable2";

const StudentProfile = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [userFormData, setUserFormData] = useState([])
  useEffect(() => {
    const getAllCourses = async () => {
      const result = await FirebaseCrud("Courses", "getDocById", null, userInfo.courses)
      const resultOfForm = await FirebaseCrud("CourseEvaForm", "getDocById", null, userInfo.courses)

      if (resultOfForm) {
        const newObject = { ...result, ...resultOfForm }
        setUserFormData(newObject)
      }
    }
    getAllCourses()
  }, [])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Home" title="Profile" />
      <div className="grid place-items-center">
        <div className="max-w-3xl w-full min-w-[300px]">
          <div className="flex flex-col gap-2 mb-6">
            <Profile />
            {userInfo.role === "student" && (userFormData || {}).courseName ?
              <FormsTable courseData={userFormData} />
              : null
            }
            {userInfo.role === "tutor" ? <FormsTable2 /> : null}

          </div>

          {/* <div className="flex flex-col gap-2 mb-6">
            <Button>Add Student</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
