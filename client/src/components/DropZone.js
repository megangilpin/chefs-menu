import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { AppBar, Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function DropZone(props) {

    const uploadImage = async (formData) => {
        const response = await fetch("/user/imageUpload", {
            method: "post",
            body: formData,
            // credentials: "include",
        });

        const data = await response.json();
    };

    const onDrop = useCallback(files => {
        let formData = new FormData();
        formData.append("image", files[0])
        uploadImage(formData).catch((error) => console.log(error.message))
      }, [])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      )
}

export default DropZone;
