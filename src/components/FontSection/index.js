import './index.css';
import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import { googleFonts } from '../../utils/fonts';

//icons
import { CloseOutline, BackArrow, Search, Clock } from '../../icons';

const AddText = ({
  closeMenu,
  handleAddFont,
  onGoBack,
  selectedText
}) => {
  const [fonts, setFonts] = useState(googleFonts);

  const onSelectFont = useCallback((value) => {
    handleAddFont(value);
    onGoBack();
  }, [handleAddFont, onGoBack]);

  const onSearch = useCallback((text) => {
    if(text){
      const filteredFonts = googleFonts.filter(item => item.toLowerCase().indexOf(text.toLowerCase()) !== -1);
      setFonts(filteredFonts);
    }else{
      setFonts(googleFonts);
    }
  }, [])

  const loadFonts = useCallback(() => {
    const items = fonts.map(font => (
      <div className='text-center font-container dl-pointer' onClick={() => onSelectFont(font)}>
        <p className='dl-text-gray-900 dl-text-xlarge dl-font-weight-600' style={{ fontFamily: font }}>{selectedText || 'Design Text'}</p>
        <p className='dl-text-gray-500 dl-text-semi-small dl-font-weight-400'>{font}</p>
      </div>
    ))
    return items;
  }, [fonts, onSelectFont, selectedText]);

  return (
    <div className='fontsection-component'>
      <div className='dl-pr-18 dl-pl-18'>
        <div className='d-flex top-con'>
          <div>
            <BackArrow className='dl-pointer' onClick={onGoBack} />
          </div>
          <h4 className='dl-font-weight-700 dl-text-gray-600 text-center flex-grow-1'>CHANGE FONT</h4>
          <div className='dl-pointer' onClick={closeMenu}>
            <CloseOutline />
          </div>
        </div>
        <Input
          prefix={<Search />}
          className='dl-pt-10 dl-pb-10 dl-pl-8 dl-pr-8 dl-text-gray-500'
          onChange={e => onSearch(e.target.value)}
          allowClear
        />
        <div className='d-flex justify-content-between align-items-center dl-pt-4 dl-pb-4'>
          <p className='dl-text-small dl-font-weight-500 dl-text-primary dl-pointer'>View all categories</p>
          <p className='dl-text-small dl-font-weight-500 dl-text-primary dl-pointer'>
            <Clock /><span className='ml-2'>Recently used fonts</span>
          </p>
        </div>
      </div>
      <div className='font-list dl-pb-16'>
        {loadFonts()}
      </div>
    </div>
  )
}

export default AddText;
