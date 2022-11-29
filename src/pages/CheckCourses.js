import React, { useEffect, useState } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
  Sort,
  CommandColumn,
  DetailRow,
  Edit,
  Filter,
} from "@syncfusion/ej2-react-grids";

import {
  employeesData,
  courseGrid,
  courseProfileTemplate,
} from "../data/dummy";
import { Header } from "../components";
import { FirebaseCrud } from "../Firebase/Curds";

const CheckCourses = () => {
  const toolbarOptions = ["Search", "Delete"];
  const filterSettings = {
    type: "Menu",
  };
  const selectionsettings = { type: "Single", mode: "Row" };
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    showDeleteConfirmDialog: true,
    mode: "Dialog",
  };

  const [coursesData, setCoursesData] = useState([])
  useEffect(() => {
    const getAllCourses = async () => {
      const result = await FirebaseCrud("Courses", "getDocAll")
      if (result) {
        const resultOfForm = await FirebaseCrud("CourseEvaForm", "getDocAll")
        result.forEach((element, i) => {
          const courseExist = resultOfForm.filter(e => e.id === element.id)
          if (courseExist.length > 0) {
            element.evaForm = true
          } else {
            element.evaForm = false
          }
        });
        setCoursesData(result)
      }

    }
    getAllCourses()
  }, [])


  const actionComplete = (args) => {
    if ((args.requestType === 'beginEdit')) {
      const dialog = args.dialog;
      // change the header of the dialog
      dialog.header = 'Edit Record of ' + args.rowData['courseName'];
    } else if (args.requestType === 'save') {
      const editData = args.data
      FirebaseCrud("Courses", "updateDoc", editData, editData.id)
      alert("Course update")
    } else if (args.requestType === 'delete') {
      const editData = args.data
      FirebaseCrud("Courses", "deleteDoc", null, (editData || "")[0].id)
      alert("Course delete")
    }
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Courses" title="Check Courses" />
      <GridComponent
        dataSource={coursesData}
        width="auto"
        // ref={(grid) => (grid = grid)}
        allowPaging
        allowSorting
        allowFiltering
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        actionComplete={actionComplete}
        toolbar={toolbarOptions}
        selectionSettings={selectionsettings}
        filterSettings={filterSettings}
        detailTemplate={courseProfileTemplate}
      >
        <ColumnsDirective>
          {courseGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Search,
            Toolbar,
            CommandColumn,
            DetailRow,
            Edit,
            Filter,
            Sort,
            Page,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default CheckCourses;
