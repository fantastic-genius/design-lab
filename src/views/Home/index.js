import './index.css';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Layout } from 'antd';
import { Stage, Layer, Image, Rect } from 'react-konva';
import useImage from 'use-image';
import { customAlphabet } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary'

//components
import {
  SideBar,
  AppLayout,
  AddText,
  QuickAction,
  UploadDesign,
  FontSection,
  CustomImage,
  CustomText
} from '../../components';

//icons
import {
  Undo,
  Redo,
  ShirtFront,
  ShirtBack,
  RightSleeve,
  LeftSleeve,
  ZoomIn,
  ZoomOut
} from '../../icons';

//images
import Shirt from '../../assets/img/Shirt.png';

const Home = () => {
  const { Content } = Layout;
  const [selectedMenu, setSelectedMenu] = useState(null);
  const stageContainerRef = useRef();
  const [stageDimension, setStageDimention] = useState({ width: 0, height: 0 });
  const [addedItems, setAddedItems] = useState([]);
  const [currentFont, setCurrentFont] = useState('Roboto');
  const [selectedTextItem, setSelectedTextItem] = useState(null);
  const [selectedImageItem, setSelectedImageItem] = useState(null);
  const [isTextEditEnabled, setIsTextEditEnabled] = useState(false);
  const designAreaConfig = {
    width: 200,
    height: 280
  };
  

  const onCloseMenu = useCallback(() => {
    if(isTextEditEnabled && selectedMenu === 'text'){
      setIsTextEditEnabled(false);
      setSelectedTextItem(null);
    }
    setSelectedMenu(null);
  },[isTextEditEnabled, selectedMenu]);

  //function to add text
  const handleAddText = useCallback((text) => {
    const nanoid = customAlphabet(alphanumeric, 12);
    const id = nanoid();
    const textNode = {
      id,
      text,
      x: 0,
      y: addedItems.length ?  Math.random() * designAreaConfig.height : 0,
      type: 'text',
      font: currentFont,
      fontSize: 36
    }

    setAddedItems(prev => ([...prev, textNode]));
  }, [addedItems, designAreaConfig.height, currentFont]);


  //function to edit text and text font
  const handleEditText = useCallback((textItem, newTextValue=null) => {
    const newTextItems = addedItems.map(item => {
      if(item.id === textItem.id){
        return {
          ...item,
          font: currentFont,
          ...(newTextValue && { text: newTextValue })
        }
      }
      return item;
    });
    setAddedItems(newTextItems);
  }, [addedItems, currentFont]);

  //function to add image
  const handleAddImage = useCallback((image, height, width) => {
    let newWidth = width;
    let newHeight = height;

    if(width > designAreaConfig.width){
      newWidth = designAreaConfig.width;
      newHeight = (designAreaConfig.width * height)/width;
    }
    const nanoid = customAlphabet(alphanumeric, 12);
    const id = nanoid();
    const imageNode = {
      id,
      image,
      x: 0,
      y: addedItems.length ?  Math.random() * designAreaConfig.height : 0,
      type: 'image',
      height: newHeight,
      width: newWidth
    }

    setAddedItems(prev => ([...prev, imageNode]));
  }, [addedItems, designAreaConfig]);

  //funtion to change font
  const handleAddFont = useCallback((font) => {
    setCurrentFont(font);
  }, []);

  //function to deselect any selected item
  const clearSelection = useCallback((type) => {
    if(selectedImageItem) setSelectedImageItem(null);
    if(selectedTextItem) {
      setSelectedTextItem(null);
      setIsTextEditEnabled(false);
      setSelectedMenu(null);
    }
  }, [selectedTextItem, selectedImageItem]);

  //function to remove any added items (text or image)
  const handleRemove = useCallback((id) => {
    const newItem = addedItems.filter(item => item.id !== id);
    setAddedItems(newItem);
    clearSelection();
  },[addedItems, clearSelection])

  const onGoBackToText = useCallback(() => setSelectedMenu('text'), []);

  const onGoToFont = useCallback(() => setSelectedMenu('font'), []);

  //function to contron lenereing of slected menu content
  const renderMenuContent = useCallback(() => {
    switch (selectedMenu) {
      case 'text':
        return <AddText
          closeMenu={onCloseMenu}
          handleAddText={handleAddText}
          handleChangeFont={onGoToFont}
          selectedFont={currentFont}
          selectedText={selectedTextItem}
          editMode={isTextEditEnabled}
          handleEditText={handleEditText}
        />;
      case 'upload':
          return <UploadDesign closeMenu={onCloseMenu} handleAddImage={handleAddImage} />;
      case 'font':
        return (
          <FontSection
            closeMenu={onCloseMenu}
            handleAddFont={handleAddFont}
            onGoBack={onGoBackToText}
            selectedText={selectedTextItem?.text || ''}
          />
        );
      default:
        return <QuickAction setSelectedMenu={setSelectedMenu} />;
    }
  }, [
    selectedMenu,
    handleAddText,
    onCloseMenu,
    handleAddImage,
    handleAddFont,
    onGoBackToText,
    onGoToFont,
    currentFont,
    selectedTextItem,
    isTextEditEnabled,
    handleEditText
  ]); 

  const ShirtImage = ({ src }) => {
    const [image] = useImage(src);

    return <Image image={image} height={stageDimension.height} width={stageDimension.height * 0.76} />
  }

  //function to be called when an added item is tapped or clicked
  const onSelectItem = useCallback((item) => {
    if(item.type === 'text'){
      if(selectedImageItem) setSelectedImageItem(null);
      setSelectedTextItem(item);
      setIsTextEditEnabled(true);
      if(selectedMenu !== 'text'){
        setSelectedMenu('text');
      }
    }else if(item.type === 'image'){
      if(selectedTextItem) {
        setSelectedTextItem(null);
        setIsTextEditEnabled(false);
        setSelectedMenu(null);
      }
      setSelectedImageItem(item);
    }
  }, [selectedMenu, selectedImageItem, selectedTextItem])

  //function to change the attribute of an item during scaling
  const handleAttributeChange = useCallback((newAttrs, i) => {
    const newItems = addedItems.slice();
    newItems[i] = newAttrs;
    setAddedItems(newItems);
  }, [addedItems])

  const renderItem = useCallback((item, i) => {
    const { id, type, text, x, y, width, height, image, font, fontSize , rotation } = item;
    switch (type) {
      case 'text':
        return (
          <CustomText
            key={id}
            text={text}
            x={x}
            y={y}
            draggable
            fontSize={fontSize}
            wrap='char'
            width={width}
            height={height}
            rotation={rotation}
            fontFamily={font}
            onClick={() => onSelectItem(item)}
            onTap={() => onSelectItem(item)}
            shapeProps={item}
            onChange={(newAttrs) => handleAttributeChange(newAttrs, i)}
            isSelected={selectedTextItem && selectedTextItem.id === id}
            designAreaConfig={designAreaConfig}
            onRemove={() => handleRemove(id)}
          />
        );
      case 'image':
        return (
          <CustomImage
            key={id}
            src={image}
            width={width}
            height={height}
            x={x}
            y={y}
            rotation={rotation}
            shapeProps={item}
            onClick={() => onSelectItem(item)}
            onTap={() => onSelectItem(item)}
            onChange={(newAttrs) => handleAttributeChange(newAttrs, i)}
            isSelected={selectedImageItem && selectedImageItem.id === id}
            designAreaConfig={designAreaConfig}
            onRemove={() => handleRemove(id)}
          />
        );
      default:
        break;
    }
  }, [
    selectedTextItem,
    selectedImageItem,
    handleAttributeChange,
    onSelectItem,
    handleRemove
  ]);

  //render the text and images added
  const renderNodes = useCallback(() => {
    const nodes = addedItems.map(renderItem);
    return nodes;
  }, [addedItems, renderItem]);

  useEffect(() => {
    if(stageContainerRef.current){
      setStageDimention({
        width: stageContainerRef.current.offsetWidth,
        height: stageContainerRef.current.offsetHeight
      })
    }
  }, [stageContainerRef]);

  useEffect(() => {
    if((selectedMenu === 'upload')  && isTextEditEnabled ){
      setIsTextEditEnabled(false);
      setSelectedTextItem(null);
    }
  }, [selectedMenu, isTextEditEnabled]);


  return (
    <AppLayout>
      <div className='d-flex flex-row home-page'>
        <SideBar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
        {renderMenuContent()}
        <Layout className='home-content dl-pt-12 dl-pb-12 dl-pl-12 dl-pr-12'>
          <Content className='d-flex'>
            <div className='history-action dl-pt-12 dl-pb-12 dl-pl-12 dl-pr-12 d-flex flex-column justify-content-between'>
              <div className='text-center dl-pointer'>
                <Undo />
                <p className='dl-text-gray-600 dl-font-weight-500 mt-2'>Undo</p>
              </div>
              <div className='text-center opacity-25'>
                <Redo />
                <p className='dl-text-gray-600 dl-font-weight-500 mt-2'>Redo</p>
              </div>
            </div>
            <div className='flex-grow-1 text-center'>
              <div className='shirt-con d-flex justify-content-center' ref={stageContainerRef}>
                <Stage id='design-stage' height={stageDimension.height} width={stageDimension.height * 0.76}>
                  <Layer>
                    <ShirtImage src={Shirt} />
                  </Layer>
                  <Layer
                    x={stageDimension.height * 0.190}
                    y={stageDimension.height * 0.162}
                    clipX={0}
                    clipY={0}
                    clipHeight={designAreaConfig.height}
                    clipWidth={designAreaConfig.width}
                    height={50}
                    width={80}
                    id='design-con'
                    onDblClick={clearSelection}
                  >
                    <Rect
                      x={0}
                      y={0}
                      strokeWidth={1}
                      width={designAreaConfig.width}
                      height={designAreaConfig.height}
                      stroke='#334E68'
                      dash={[2, 2]}
                    />
                    {renderNodes()}
                  </Layer>
                </Stage>
              </div>
            </div>
            <div>
              <div className='part-container'>
                <div className='part-item d-flex flex-column justify-content-center align-items-center part-item-active dl-pointer'>
                  <ShirtFront />
                  <p className='dl-text-gray-600 dl-font-weight-600 dl-text-small text-uppercase dl-mt-8'>Front</p>
                </div>
                <div className='part-item d-flex flex-column justify-content-center align-items-center dl-pointer'>
                  <ShirtBack />
                  <p className='dl-text-gray-600 dl-font-weight-600 dl-text-small text-uppercase dl-mt-8'>Back</p>
                </div>
                <div className='part-item d-flex flex-column justify-content-center align-items-center dl-pointer'>
                  <RightSleeve />
                  <p className='dl-text-gray-600 dl-font-weight-600 dl-text-small text-uppercase dl-mt-8'>Right Sleeve</p>
                </div>
                <div className='part-item d-flex flex-column justify-content-center align-items-center dl-pointer'>
                  <LeftSleeve />
                  <p className='dl-text-gray-600 dl-font-weight-600 dl-text-small text-uppercase dl-mt-8'>Left Sleeve</p>
                </div>
              </div>
              <div className="d-flex justify-content-between dl-mt-8">
                <div className="zoom-con d-flex justify-content-center align-items-center dl-pointer">
                  <ZoomOut />
                </div>
                <div className="zoom-con d-flex justify-content-center align-items-center dl-pointer">
                  <ZoomIn />
                </div>
              </div>
            </div>
          </Content>
      </Layout>
      </div>
    </AppLayout>
  );
}

export default Home;
