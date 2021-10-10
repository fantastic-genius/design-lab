import './index.css';
import React from 'react';

//icons
import { Abc, Shirts, UploadOutline, Template } from '../../icons';

const QuickAction = ({ setSelectedMenu }) => {

  return (
    <div className='quickaction-component'>
      <h4 className='dl-font-weight-500 dl-text-gray-900 text-center mb-5'>What’s next for you?</h4>
      <div>
        <div className='row action-con'>
          <div className='col text-center'>
            <div className='icon-con dl-pointer' onClick={() => setSelectedMenu('text')}>
              <Abc />
            </div>
            <p className='dl-pointer dl-text-gray-900 dl-mt-12' onClick={() => setSelectedMenu('text')} >Add Text</p>
          </div>
          <div className='col text-center'>
            <div className='icon-con dl-pointer '>
              <Template />
            </div>
            <p className='dl-pointer dl-text-gray-900 dl-mt-12'>Use Template</p>
          </div>
        </div>
        <div className='row action-con'>
          <div className='col text-center'>
            <div className='icon-con dl-pointer ' onClick={() => setSelectedMenu('upload')}>
              <UploadOutline />
            </div>
            <p className='dl-pointer dl-text-gray-900 dl-mt-12' onClick={() => setSelectedMenu('upload')}>Upload design</p>
          </div>
          <div className='col text-center'>
            <div className='icon-con dl-pointer'>
              <Shirts />
            </div>
            <p className='dl-pointer dl-text-gray-900 dl-mt-12'>Change Products</p>
          </div>
        </div>
      </div>
      <p className='dl-text-medium dl-text-gray-900 dl-font-weight-500 text-center'>or <span className='dl-pointer dl-text-primary text-decoration-underline'>start over</span></p>
    </div>
  )
}

export default QuickAction;
