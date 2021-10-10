import './index.css';
import React from 'react';
import { Button } from 'reactstrap';
import { Radio } from 'antd';

//icons
import { PlusCircle , Share, Save, Dollar } from '../../icons';

//image
import ShirtSmall from '../../assets/img/ShirtSmall.png';

const Footer = () => {

  return (
    <div className='position-fixed bottom-0 start-0 w-100 footer d-flex flex-row align-items-center justify-content-between dl-text-semi-small' >
      <div className='d-flex flex-row align-items-center'>
        <Button className='dl-bg-primary-light dl-border-primary-light dl-btn border-1 dl-text-primary'>
          <PlusCircle /><span className='ms-2 dl-text-semi-small'>Add Products</span>
        </Button>
        <div className='small-shirt'>
          <img src={ShirtSmall} alt='shirt' height={64} width={56} />
        </div>
        <div className='vt-line dl-ml-16 dl-mr-16' />
        <div className='d-flex flex-column justify-content-bewtween'>
          <div className='d-flex flex-row align-items-end'>
            <p className='dl-text-medium dl-font-weight-400 dl-text-gray-900 dl-mr-8'>Gildan Unisex T-shirt</p>
            <p className='dl-text-semi-small dl-font-weight-500 dl-text-primary dl-pointer'>Change Product</p>
          </div>
          <div className='d-flex flex-row align-items-end mt-3'>
            <Radio>
              <p className='dl-text-semi-small dl-font-weight-400 dl-text-gray-900 dl-mr-8'>White</p>
            </Radio>
            <p className='dl-text-semi-small dl-font-weight-500 dl-text-primary dl-pointer'>Change Color</p>
          </div>
        </div>
      </div>
      <div className='d-flex flex-row align-items-center'>
        <Button className='dl-btn dl-btn-outline dl-border-primary dl-text-primary dl-bg-white dl-mr-12'>
          <Share />
        </Button>
        <Button className='dl-bg-primary-light dl-border-primary-light dl-btn border-1 dl-text-primary dl-mr-12 d-flex flex-row align-items-center'>
          <Save /><span className='ms-2 dl-text-semi-small'>Save</span>
        </Button>
        <Button className='dl-bg-primary dl-border-primary dl-btn border-1 dl-text-primary d-flex flex-row align-items-center'>
          <Dollar /><span className='ms-2 dl-text-white dl-text-semi-small'>Get Pricing</span>
        </Button>
      </div>
    </div>
  );
}

export default Footer;
