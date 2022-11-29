import * as React from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Button, Header } from "../components";
import Profile from "../components/Profile";
import FormsTable from "../components/FormsTable";
import Profile2 from "../components/Profile2";
import FormsTable2 from "../components/FormsTable2";

const TeacherProfile = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Home" title="Teacher Profile" />
      <div className="grid place-items-center">
        <div className="max-w-3xl w-full min-w-[300px]">
          <div className="flex flex-col gap-2 mb-6">
            <Profile2 />
            <FormsTable2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
