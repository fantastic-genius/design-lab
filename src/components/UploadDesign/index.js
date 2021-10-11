import './index.css';
import React, { useCallback } from 'react';
import { Upload } from 'antd';

//icons
import { CloseOutline, UploadCloud } from '../../icons';

const UploadDesign = ({ closeMenu=() => {}, handleAddImage=()=> {} }) => {
  const { Dragger } = Upload;
  const acceptedFileTypes = ['.png', '.jpg', '.jpeg'];

  const loadAcceptedFileTypes = useCallback(() => {
    const types = acceptedFileTypes.map((type, i) => (
      <div key={i} className='text-uppercase text-center d-flex align-items-center dl-text-small dl-text-gray-800 mimetype dl-ml-8 dl-mb-8'>
        {type}
      </div>
    ))
    return types;
  }, [acceptedFileTypes])

  return (
    <div className='uploaddesign-component dl-pt-10 dl-pr-18 dl-pl-18'>
      <div className='d-flex mb-5'>
        <h4 className='dl-font-weight-700 dl-text-gray-600 text-center flex-grow-1'>UPLOAD DESIGN</h4>
        <div className='dl-pointer' onClick={closeMenu}>
          <CloseOutline />
        </div>
      </div>
      <div>
        <h4 className='dl-text-semi-small dl-font-weight-500 dl-text-gray-900'>Choose file to upload</h4>
        <Dragger 
          name='file'
          customRequest={async ({ file, onSuccess }) => {
            const src = await new Promise(resolve => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
            });
            const image = new Image();
            image.src = src;
            image.onload = () => {
              const height = image.height;
              const width = image.width;
              handleAddImage(src, height, width)
            }
            onSuccess('ok');
          }}
          className='dragger-con'
          maxCount={1}
          accept='.png,.jpg,.jpeg,'
        >
          <div className="mx-auto ant-upload-drag-icon d-flex justify-content-center align-items-center dl-mb-16">
            <UploadCloud />
          </div>
          <p className="dl-text-gray-700 dl-text-semi-small">
            Drag file here or <span className='dl-pointer dl-text-primary text-decoration-underline'>browse</span> your computer
          </p>
        </Dragger>
        <div className='dl-mt-16 dl-mb-16'>
          <h4 className='dl-text-semi-small dl-font-weight-500 dl-text-gray-900 dl-mb-12'>Accepted file types</h4>
          <div className='d-flex flex-wrap align-items-center'>
            {loadAcceptedFileTypes()}
          </div>
        </div>
        <p className='dl-text-semi-small dl-text-gray-600 mb-4'>
          <span>Have a different type of file? </span>
          <span className='dl-pointer dl-text-primary text-decoration-underline d'>Email it to us</span> 
          <span> and weʼll have it ready for you to use within a few hours!</span>
        </p>
        <div>
          <h4 className='dl-text-semi-small dl-font-weight-500 dl-text-gray-900 dl-mb-4'>Copyright & Trademark</h4>
          <p className='dl-text-semi-small dl-text-gray-600'>
            By uploading your artwork you agree that you take full responsibility and have full rights to utilize the logo or mark on customized products.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UploadDesign;
