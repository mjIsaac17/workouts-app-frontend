import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { PictureAsPdf } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../actions/snackbar.action";

export const BtnExportExercisesToPDF = ({
  exercises,
  totalExercises,
  fileName,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loadImage = (exercise) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = exercise.imageUrl;
    });

  const handleExportToPDF = () => {
    if (totalExercises > 0) {
      //Max size for images
      setLoading(true);
      const maxHeight = 190,
        maxWidth = 170;
      const doc = new jsPDF("p", "mm", "a4");

      // Prepare images
      Promise.all(exercises.map(loadImage))
        .then((images) => {
          images.forEach((image, i) => {
            const exercise = exercises[i];
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text(exercise.name, 20, 20);
            doc.setFontSize(16);
            doc.setFont("helvetica", "normal");
            doc.text(exercise.description, 20, 40);
            let height = image.height,
              width = image.width;

            const ratio = height / width;
            if (height > maxHeight || width > maxWidth) {
              if (height > width) {
                height = maxHeight;
                width = height * (1 / ratio);
              } else if (width > height) {
                width = maxWidth;
                height = width * ratio;
              }
            }

            doc.addImage(
              image,
              exercise.imageName.split(".").at(-1),
              20,
              55,
              width,
              height
            );
            if (i < totalExercises - 1) doc.addPage("a4", "p");
          });
          doc.save(`${fileName}.pdf`);
          setLoading(false);
        })
        .catch((error) => {
          dispatch(
            setSnackbar(
              "error",
              "It was not possible to export the data to PDF",
              true
            )
          );
          setLoading(false);
        });
    } else dispatch(setSnackbar("info", "There is no data to export", true));
  };
  return (
    <Tooltip title="Export to PDF">
      <IconButton
        aria-label="export to pdf"
        color="error"
        onClick={handleExportToPDF}
        disabled={loading}
      >
        <PictureAsPdf />
        {loading && (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </IconButton>
    </Tooltip>
  );
};

BtnExportExercisesToPDF.propTypes = {
  exercises: PropTypes.array,
  totalExercises: PropTypes.number,
  fileName: PropTypes.string,
};
