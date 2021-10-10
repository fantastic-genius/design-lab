import './index.css';
import React from 'react';
import { Form, Button, Input, Select } from 'antd';

//icons
import { CloseOutline } from '../../icons';

const AddText = ({ closeMenu=() => {} }) => {
  const { Option } = Select;

  return (
    <div className='addtext-component'>
      <div className='dl-pr-18 dl-pl-18'>
        <div className='d-flex'>
          <h4 className='dl-font-weight-700 dl-text-gray-600 text-center flex-grow-1'>ADD TEXT</h4>
          <div className='dl-pointer' onClick={closeMenu}>
            <CloseOutline />
          </div>
        </div>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{span: 24}}
          name='add-text'
          onFinish={() => {}}
          className='py-4 pt-5 d-flex flex-column align-items-end w-100'
          layout='vertical'
        >
          <Form.Item
            name='text'
            placeholder='Enter text here'
            rules={[
              { 
                required: true, 
                message: 'Please input your text!'
              },
            ]}
            className='w-100'
          >
            <Input className='dl-pt-16 dl-pb-16 dl-pl-8 dl-pr-8 dl-text-gray-500' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='dl-bg-primary text-white dl-btn h-auto border-0' >Add to design</Button> 
          </Form.Item>
        </Form>
      </div>
      <div className='d-flex align-items-end justify-content-between dl-pr-18 dl-pl-18 dl-pb-14 font-container'>
        <h5 className='mb-0 dl-font-weight-500 dl-text-gray-900'>FONT</h5>
        <Select
          showSearch
          style={{ width: '60%' }}
          placeholder="Select a person"
          optionFilterProp="label"
          // onChange={onChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className=''
          defaultValue="jack"
        >
          <Option value="jack" title='Lucy'>Jack</Option>
          <Option value="lucy" title='Lucy'>Lucy</Option>
          <Option value="tom" title='Tom' >Tom</Option>
        </Select>
      </div>
    </div>
  )
}

export default AddText;
