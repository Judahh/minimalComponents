import React, { CSSProperties, useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import clsx from 'clsx'; // a utility for constructing className conditionally
import { Image as ImageStyle, BackgroundImage, Indicator } from './styles';

import { Carousel } from 'react-responsive-carousel';
import { ChangePicButton } from '../Input/Button';
import { withTheme } from 'styled-components';

const getMaxHeight = (props, titleHeightOffset) =>
    'calc(100%' +
    (props.hasTitle ? ' ' + titleHeightOffset + ' - 20px - 0.5rem' : '') +
    (props.hasDescription ? ' ' + titleHeightOffset + ' - 20px - 0.5rem' : '') +
    ')';

function Image(props: {
  images?: string[];
  index?: number;
  setIndex?: (index: number) => void;
  alt?: string;
  lqip?: string;
  hasTitle?: boolean;
  hasDescription?: boolean;
  disabled?: boolean;
  titleElement?;
}) {
  const imgRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [titleHeightOffset, setTitleHeightOffset] =
    useState('- 1.3rem - 0.6vw');
  const [maxHeight, setMaxHeight] = useState(getMaxHeight(props, titleHeightOffset));

  useEffect(() => {
    if (imgRef.current && (imgRef.current as any).complete) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {}, [props.disabled, props.images, props.images?.length]);

  useEffect(() => {
    if (props.titleElement) {
      setTitleHeightOffset(`- ${props.titleElement.clientHeight}px`);
    }
  }, [props.titleElement]);

  useEffect(() => {
    const maxHeight = getMaxHeight(props, titleHeightOffset);
    setMaxHeight(maxHeight);
  }, [props.hasDescription, props.hasTitle, titleHeightOffset]);

  const onChange = (index, _item) => {
    props?.setIndex?.(index);
  };

  const arrowStyles: CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    top: 'calc(100% - 45px)',
  };

  const baseIndicator: CSSProperties = {
    display: 'inline-block',
    margin: '5px 10px',
  };

  const selection = (isSelected): CSSProperties => {
    return isSelected ? { opacity: 1 } : {};
  };

  const preventDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
    return true;
  };

  return (
    <>
      <Carousel
        selectedItem={props.index || 0}
        autoPlay={false}
        showThumbs={false}
        showStatus={false}
        showIndicators={
          props?.images?.length !== undefined &&
          props?.images?.length !== null &&
          props?.images?.length > 1
        }
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={true}
        useKeyboardArrows={true}
        onChange={onChange}
        onSwipeStart={preventDefault}
        onSwipeEnd={preventDefault}
        onSwipeMove={preventDefault}
        renderArrowPrev={(onClick, hasPrev) =>
          hasPrev && (
            <ChangePicButton
              onClick={(e) => {
                preventDefault(e);
                onClick();
              }}
              style={{ ...arrowStyles, left: 15 }}
            >
              ⯇
            </ChangePicButton>
          )
        }
        renderArrowNext={(onClick, hasNext) =>
          hasNext && (
            <ChangePicButton
              onClick={(e) => {
                preventDefault(e);
                onClick();
              }}
              style={{ ...arrowStyles, right: 15 }}
            >
              ⯈
            </ChangePicButton>
          )
        }
        renderIndicator={(onClick, isSelected, index) => {
          return (
            <Indicator
              onClick={(
                e:
                  | React.MouseEvent<Element, MouseEvent>
                  | React.KeyboardEvent<Element>
              ) => {
                preventDefault(e);
                onClick(e);
              }}
              onKeyDown={
                isSelected
                  ? (
                      e:
                        | React.MouseEvent<Element, MouseEvent>
                        | React.KeyboardEvent<Element>
                    ) => {
                      preventDefault(e);
                      onClick(e);
                    }
                  : undefined
              }
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${index + 1}`}
              aria-label={`${index + 1}`}
              style={{
                ...baseIndicator,
                ...selection(isSelected),
              }}
            />
          );
        }}
      >
        {props?.images?.map((image, index) => {
          return (
            <div
              key={index}
              style={{
                filter: 'grayscale(' + (props.disabled ? '1' : '0') + ')',
              }}
            >
              <BackgroundImage alt={props.alt} src={props.lqip} />
              <ImageStyle
                loading="lazy"
                src={image}
                alt={props.alt}
                ref={imgRef}
                onLoad={() => setLoaded(true)}
                className={clsx('source', loaded && 'loaded') + 'img-fluid'}
                style={{
                  maxHeight: maxHeight,
                  height: maxHeight,
                  color: 'red',
                }}
              />
            </div>
          );
        })}
      </Carousel>
    </>
  );
}
export default withTheme(Image);
