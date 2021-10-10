import './index.css';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Layout } from 'antd';
import { Stage, Layer, Image, Text, Rect } from 'react-konva';
import useImage from 'use-image';

//components
import { SideBar, AppLayout, AddText, QuickAction, UploadDesign } from '../../components';

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

  const onCloseMenu = useCallback(() => {
    setSelectedMenu(null);
  },[]);

  const renderMenuContent = useCallback(() => {
    switch (selectedMenu) {
      case 'text':
        return <AddText closeMenu={onCloseMenu} />;
      case 'upload':
          return <UploadDesign closeMenu={onCloseMenu} />;
      default:
        return <QuickAction setSelectedMenu={setSelectedMenu} />;
    }
  }, [selectedMenu]);

  useEffect(() => {
    if(stageContainerRef.current){
      setStageDimention({
        width: stageContainerRef.current.offsetWidth,
        height: stageContainerRef.current.offsetHeight
      })
      console.log('height', stageContainerRef.current.offsetHeight)
      console.log('width', stageContainerRef.current.offsetWidth)
    }
  }, [stageContainerRef]);

  const ShirtImage = ({ src }) => {
    const [image] = useImage(src);

    return <Image image={image} height={stageDimension.height} width={stageDimension.height * 0.76} />
  }

  const CustomImage = ({ src }) => {
    const [image] = useImage(src);

    return <Image image={image} height={stageDimension.height} width={stageDimension.height * 0.76} />
  }


  return (
    <AppLayout>
      <div className='d-flex flex-row home-page'>
        <SideBar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
        {renderMenuContent()}
        <Layout className='home-content dl-pt-12 dl-pb-12 dl-pl-12 dl-pr-12'>
          <Content className='d-flex'>
            <div className='history-action dl-pt-12 dl-pb-12 dl-pl-12 dl-pr-12 d-flex flex-column justify-content-between'>
              <div className='text-center'>
                <Undo />
                <p className='dl-text-gray-600 dl-font-weight-500 mt-2'>Undo</p>
              </div>
              <div className='text-center'>
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
                    clipHeight={280}
                    clipWidth={200}
                    height={50}
                    width={80}
                    id='design-con'
                  >
                    <Rect
                      x={0}
                      y={0}
                      strokeWidth={1}
                      width={200}
                      height={280}
                      stroke='#334E68'
                      dash={[2, 2]}
                    />
                    <Text
                      text="Second Draggable Text"
                      x={10}
                      y={20}
                      draggable
                      fontSize={36}
                      wrap='word'
                      width={200}
                    />
                  </Layer>
                </Stage>
              </div>
            </div>
            <div>
              <div className='part-container'>
                <div className='part-item d-flex flex-column justify-content-center align-items-center part-item-active'>
                  <ShirtFront />
                  <p className='dl-text-gray-600 dl-font-weight-600 dl-text-small text-uppercase dl-mt-8'>Front</p>
                </div>
                <div className='part-item d-flex flex-column justify-content-center align-items-center'>
                  <ShirtBack />
                  <p className='dl-text-gray-600 dl-font-weight-600 dl-text-small text-uppercase dl-mt-8'>Back</p>
                </div>
                <div className='part-item d-flex flex-column justify-content-center align-items-center'>
                  <RightSleeve />
                  <p className='dl-text-gray-600 dl-font-weight-600 dl-text-small text-uppercase dl-mt-8'>Right Sleeve</p>
                </div>
                <div className='part-item d-flex flex-column justify-content-center align-items-center'>
                  <LeftSleeve />
                  <p className='dl-text-gray-600 dl-font-weight-600 dl-text-small text-uppercase dl-mt-8'>Left Sleeve</p>
                </div>
              </div>
              <div className="d-flex justify-content-between dl-mt-8">
                <div className="zoom-con d-flex justify-content-center align-items-center">
                  <ZoomOut />
                </div>
                <div className="zoom-con d-flex justify-content-center align-items-center">
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
