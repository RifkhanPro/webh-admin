import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'reactstrap'
import "./ImageUploader.css"

function ImageUploader(props) {

    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    const filePickerRef = useRef()

    useEffect(() => {
        if (!file) {
            return
        }


        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }, [file])
  const pickHandler = (e) => {
    let pickedFile 
    let fileIsValid = isValid

    if (e.target.files && e.target.files.length === 1) {
        pickedFile = e.target.files[0]
        setFile(pickedFile)
        setIsValid(true)
        fileIsValid = true
    } else {
        setIsValid(false)
        fileIsValid = false
    }

    props.onInput(pickedFile, fileIsValid)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }
  return (
    <div className='form-control1'>
        <input type="file" name="" value="" style={{display:'none'}} accept='.jpg,.png,.jpeg' onChange={pickHandler} ref={filePickerRef} />

            <div className='image-upload'>
                <div className='image-upload__preview'>
                {previewUrl ? <><img src={previewUrl} alt='preview' /></> : <>{props.image && <img src={props.image} alt='preview' />}</> }
                    {!previewUrl && <p >Please pick an image</p>}
                </div>
            <div>
            <Button type='button' onClick={pickImageHandler}>Pick Image</Button>
            </div>
        </div>
    </div>


  )
}


export default ImageUploader

