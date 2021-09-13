import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import * as SiIcons from "react-icons/si";
export const Export = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <button
        type="button"
        style={btn__excel}
        onClick={(e) => exportToCSV(csvData, fileName)}
      >
        <SiIcons.SiMicrosoftexcel />
      </button>
      <button
        type="button"
        style={btn__word}
        onClick={(e) => exportToCSV(csvData, fileName)}
      >
        <SiIcons.SiMicrosoftword />
      </button>
      <button
        type="button"
        style={btn__powerpoint}
        onClick={(e) => exportToCSV(csvData, fileName)}
      >
        <SiIcons.SiMicrosoftpowerpoint />
      </button>
    </>
  );
};

// Style
const btn__excel = {
  background: "inherit",
  border: "unset",
  display: "inline-block",
  color: "green",
  fontSize: "25px",
  marginLeft: "10px",
};
const btn__word = {
  background: "inherit",
  border: "unset",
  display: "inline-block",
  color: "blue",
  fontSize: "25px",
  marginLeft: "10px",
};
const btn__powerpoint = {
  background: "inherit",
  border: "unset",
  display: "inline-block",
  color: "orange",
  fontSize: "25px",
  marginLeft: "10px",
};
