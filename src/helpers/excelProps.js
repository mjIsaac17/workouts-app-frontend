const fullBorder = {
  top: { style: "thin" },
  bottom: { style: "thin" },
  left: { style: "thin" },
  right: { style: "thin" },
};

const headerStyle = { sz: "18", bold: true };
const dataStyle = {
  font: { sz: "14" },
  border: fullBorder,
};

export const exerciseProps = {
  columns: [
    {
      title: "Exercise",
      width: { wpx: 200 },
      style: { font: headerStyle, border: fullBorder },
    },
    {
      title: "Muscle",
      width: { wpx: 200 },
      style: { font: headerStyle, border: fullBorder },
    },
    {
      title: "Description",
      width: { wpx: 300 },
      style: { font: headerStyle, border: fullBorder },
    },
  ],
  data: [
    {
      value: "name",
      style: dataStyle,
    },
    {
      value: "muscleName",
      style: dataStyle,
    },
    {
      value: "description",
      style: {
        ...dataStyle,
        alignment: {
          wrapText: true,
        },
      },
    },
  ],
};
