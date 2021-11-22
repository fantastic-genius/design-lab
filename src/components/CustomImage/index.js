import React, { useRef, useEffect, Fragment } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

//components
import { CustomTransformer } from '../index';

const CustomImage = ({ 
  src,
  height,
  width,
  x,
  y,
  rotation,
  onClick,
  onTap,
  isSelected,
  shapeProps,
  onChange,
  designAreaConfig,
  onRemove
}) => {
  const [image] = useImage(src);
  const shapeRef = useRef();
  const trRef = useRef();
  
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <Fragment>
      <Image
        draggable
        image={image}
        height={height}
        width={width}
        x={x}
        y={y}
        onClick={onClick}
        onTap={onTap}
        ref={shapeRef}
        rotation={rotation}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          //set width auto to allow wrapped text to fit properly
          // if(node.width() * scaleX < designAreaConfig.width){
          //   node.width('auto')
          // }
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: node.width() * scaleX > designAreaConfig.width ?  designAreaConfig.width : Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation()
          });
        }}

      />
      {isSelected && (
        <CustomTransformer
          trRef={trRef}
          removeIconX={shapeRef.current.x()}
          removeIconY={shapeRef.current.y()}
          onRemove={onRemove}
        />
      )}
    </Fragment>
  );
}

export default CustomImage;
