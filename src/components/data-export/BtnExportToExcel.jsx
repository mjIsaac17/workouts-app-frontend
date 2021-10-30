import { FileDownload } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import ReactExport from "react-data-export";
import { exerciseProps } from "../../helpers/excelProps";
import PropTypes from "prop-types";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export const BtnExportToExcel = ({ dataSource, data, fileName, sheetName }) => {
  let excelFormat = {};
  switch (dataSource) {
    case "exercises":
      excelFormat = exerciseProps;
      break;

    default:
      break;
  }

  const dataSet = [
    {
      columns: excelFormat.columns.map(({ title, width, style }) => ({
        title,
        width,
        style,
      })),
      data: data.map((item) =>
        excelFormat.data.map(({ value, style }) => ({
          value: item[value],
          style,
        }))
      ),
    },
  ];

  return (
    <>
      <ExcelFile
        element={
          <Tooltip title="Export to Excel">
            <IconButton aria-label="export to excel" color="success">
              <FileDownload />
            </IconButton>
          </Tooltip>
        }
        filename={fileName}
      >
        <ExcelSheet dataSet={dataSet} name={sheetName} />
      </ExcelFile>
    </>
  );
};

BtnExportToExcel.propTypes = {
  dataSource: PropTypes.string,
  data: PropTypes.array,
  fileName: PropTypes.string,
  sheetName: PropTypes.string,
};
