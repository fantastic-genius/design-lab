import './index.css';
import React, { useEffect } from 'react';
import { Form, Button, Input } from 'antd';

//icons
import { CloseOutline, CaretDown } from '../../icons';

const AddText = ({
  closeMenu,
  handleAddText,
  handleChangeFont,
  selectedFont,
  editMode,
  selectedText,
  handleEditText
}) => {
  const [form] = Form.useForm();

  const onAddText = (values) => {
    handleAddText(values.text);
    form.resetFields();
  }

  useEffect(() => {
    if(selectedText && editMode){
      form.setFieldsValue({text: selectedText?.text || ''});
    }
  },[selectedText, editMode]);

  useEffect(() => {
    if(selectedText &&  selectedFont !== selectedText.font){
      handleEditText(selectedText);
    }
  },[selectedFont]);

  return (
    <div className='addtext-component'>
      <div className='dl-pr-18 dl-pl-18'>
        <div className='d-flex'>
          <h4 className='dl-font-weight-700 dl-text-gray-600 text-center flex-grow-1'>{editMode ? 'EDIT TEXT' : 'ADD TEXT'}</h4>
          <div className='dl-pointer' onClick={closeMenu}>
            <CloseOutline />
          </div>
        </div>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{span: 24}}
          onFinish={onAddText}
          className='py-4 pt-5 d-flex flex-column align-items-end w-100'
          layout='vertical'
          form={form}
          initialValues={{ text: selectedText?.text || ''}}
          
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
            <Input
              data-testid='addtext-input'
              className='dl-pt-16 dl-pb-16 dl-pl-8 dl-pr-8 dl-text-gray-500'
              onChange={(e) => {
                if(editMode && selectedText) handleEditText(selectedText, e.target.value)
              }}
            />
          </Form.Item>
          {!editMode ? (
            <Form.Item>
              <Button htmlType='submit' className='dl-bg-primary text-white dl-btn h-auto border-0' >Add to design</Button> 
            </Form.Item>
          ) : null}
        </Form>
      </div>
      {editMode ? (
        <div
          className='d-flex align-items-center justify-content-between dl-pr-18 dl-pl-18 dl-pb-8 font-container dl-pointer'
          onClick={handleChangeFont}
        >
          <h5 className='mb-0 dl-font-weight-500 dl-text-gray-900'>FONT</h5>
          <div className='d-flex align-items-center'>
            <p className='dl-font-weight-600 dl-text-xlarge dl-text-gray-900 dl-mr-10'>{selectedFont}</p>
            <div>
              <CaretDown />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AddText;
