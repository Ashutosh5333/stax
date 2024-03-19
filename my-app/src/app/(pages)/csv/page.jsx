"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { FiUpload } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';


 const Page = () => {
  const fileInputRef = useRef("");
  const fileInputRef1 = useRef("");
  const [parsedData, setParsedData] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [clickUpload, setClickUpload] = useState(false);
  const [values, setValues] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);

 

  const changeHandler = (event) => {
    const selectedFile = event.target.files[0];

    setSelectedFileName(selectedFile.name);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };
  //  console.log("data",parsedData)

  const handlermoveseleted = () => {
    setSelectedFileName("");
    setSelectedArray([]);
    setValues([]);
    setTableRows([]);
    setClickUpload(false);

    if (fileInputRef1.current) {
      fileInputRef1.current.value = "";
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
     toast.success("Uploaded File.......")
     setTimeout(()=>{
       setClickUpload(true);
     },1000)
  };

  return (
    <>
      <div className="Browser-continer relative top-[15%] sm:top-16 w-[90%] sm:w-[60%] m-auto text-center">
        <div className="container-box px-2 py-2 flex flex-col sm:flex-row sm:justify-between border-pink-800">
          <div className="w-[100%]  bg-[#FFFFFF] rounded-md shadow-md px-4 py-4 border-green-700">
            <div
              className={`border-2 ${" cursor-pointer border-dashed border-[#EBEBEB]"} py-16 sm:py-20 mt-5 bg-[#FFFFFF] rounded-lg w-[100%]`}
            >
              <label className="border-green-700">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  name="file"
                  onChange={changeHandler}
                  className="border border-grey text-sm hidden rounded py-4 px-2 w-[100%] "
                  multiple
                />
                <div className="w-[60%] border-red-700 m-auto flex items-center justify-center">
                  <Image
                    src={"/assets/Excel.svg"}
                    alt="imagelogo"
                    width={50}
                    height={50}
                    className="m-auto"
                  />
                </div>
              </label>

              {selectedFileName && (
                <p className="mt-2 text-[#707070] text-sm text-center">
                  {selectedFileName}
                </p>
              )}

              {selectedFileName && (
                <p
                  onClick={handlermoveseleted}
                  className="mt-2 cursor-pointer text-red-500 text-sm text-center"
                >
                  remove
                </p>
              )}

              <label className="cursor-pointer">
                <input
                  ref={fileInputRef1}
                  type="file"
                  accept=".csv"
                  name="file"
                  onChange={changeHandler}
                  className="border border-grey text-sm hidden rounded py-4 px-2 w-[100%] "
                  multiple
                />
                {selectedFileName ? (
                  ""
                ) : (
                  <p className="mt-5 text-[#707070] text-sm text-center">
                    {" "}
                    Drop Your excel sheet here or{" "}
                    <span className="text-[#605BFF]"> browse </span>
                  </p>
                )}
              </label>
            </div>

            <button
              onClick={handleUpload}
              className={` ${
                selectedFileName
                  ? "bg-[#605BFF]"
                  : "bg-[#605BFF] opacity-60 cursor-not-allowed"
              }  py-2 w-[100%] rounded mt-5 flex items-center 
                  justify-center gap-5 text-sm text-[#FFFFFF]
                m-auto `}
            >
              <span>
                <FiUpload />{" "}
              </span>{" "}
              Upload
            </button>
          </div>
        </div>
      </div>

    
      <Toaster/>
    </>
  );
};
export default Page