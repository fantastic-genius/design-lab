import React, { useRef, useEffect, Fragment } from 'react';
import { Text } from 'react-konva';

//components
import { CustomTransformer } from '../index';

const CustomText = ({
  text,
  x,
  y,
  draggable,
  fontSize,
  wrap,
  width,
  rotation,
  fontFamily,
  onClick,
  onTap,
  isSelected,
  shapeProps,
  onChange,
  designAreaConfig,
  onRemove
}) => {
  const shapeRef = useRef();
  const trRef = useRef();
  
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    
    if(width < designAreaConfig.width && shapeRef.current){
      //set width auto to allow wrapped text to fit properly
      shapeRef.current.width('auto');
    }
  },[width, designAreaConfig])

  return (
    <Fragment>
      <Text
        text={text}
        x={x}
        y={y}
        draggable={draggable}
        fontSize={fontSize}
        wrap={wrap}
        width={width}
        rotation={rotation}
        fontFamily={fontFamily}
        onClick={onClick}
        onTap={onTap}
        ref={shapeRef}
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
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: (node.width() * scaleX) > designAreaConfig.width ?  designAreaConfig.width : Math.max(5, node.width() * scaleX),
            fontSize: Math.max(5, node.fontSize() * scaleY),
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
  )
}

export default CustomText;
