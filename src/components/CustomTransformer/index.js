import React, { Fragment } from 'react';
import { Transformer, Image } from 'react-konva';
import useImage from 'use-image';


import Close from '../../svg/Close.svg';


const CloseIcon = ({ x, y, onClick }) => {
  const [image] = useImage(Close);
  return <Image image={image} height={40} width={40} x={x} y={y} onClick={onClick} />
}

const CustomTransformer = ({ trRef, removeIconX, removeIconY, onRemove }) => {
  return (
    <Fragment>
      <Transformer
        ref={trRef}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
        enabledAnchors={[
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
        ]}
        anchorCornerRadius={5}
        anchorFill={'#102A43'}
        anchorSize={10}
        anchorStroke='white'
        borderStroke='#102A43'
        borderStrokeWidth={1}
      />
      <CloseIcon x={removeIconX-30} y={removeIconY-20} onClick={onRemove} />
    </Fragment>
  );
}

export default CustomTransformer