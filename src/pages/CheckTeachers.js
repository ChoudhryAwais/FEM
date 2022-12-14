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
  studentProfileTemplate,
  /* studentProfileTemplate, */
  teachersGrid,
  teachersProfileTemplate,
} from "../data/dummy";
import { Header } from "../components";
import { FirebaseCrud } from "../Firebase/Curds";

const CheckStudents = () => {
  const toolbarOptions = ["Search", "Delete"];
  const filterSettings = { type: "Menu" };
  const selectionsettings = { type: "Single", mode: "Row" };
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    showDeleteConfirmDialog: true,
    mode: "Dialog",
  };

  const [tutorData, setTutorData] = useState([])

  useEffect(() => {
    const getAllStudent = async () => {
      const result = await FirebaseCrud("Users", "getDocAll")
      const tutorResult = result.filter(e => e.role === "tutor")
      setTutorData(tutorResult)
    }
    getAllStudent()
  }, [])

  const actionComplete = (args) => {
    if ((args.requestType === 'beginEdit')) {
      const dialog = args.dialog;
      // change the header of the dialog
      dialog.header = 'Edit Record of ' + args.rowData['tutorName'];
    } else if (args.requestType === 'save') {
      const editData = args.data
      FirebaseCrud("Users", "updateDoc", editData, editData.id)
      alert("Tutor update")
    } else if (args.requestType === 'delete') {
      const editData = args.data
      FirebaseCrud("Users", "deleteDoc", null, (editData || "")[0].id)
      alert("Tutor delete")
    }
  }


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Teacher" title="Check Teachers" />
      <GridComponent
        dataSource={tutorData}
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
        detailTemplate={teachersProfileTemplate}
      >
        <ColumnsDirective>
          {teachersGrid.map((item, index) => (
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

export default CheckStudents;
