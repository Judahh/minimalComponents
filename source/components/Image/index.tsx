import React, { CSSProperties, useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import clsx from 'clsx';
import {
  Image as ImageStyle,
  BackgroundImage,
  Indicator,
  CarouselHolder,
  LeftElementHolder,
  RightElementHolder,
} from './styles';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { withTheme } from 'styled-components';
import Input from '../Input';

const getMaxHeight = (props, titleHeightOffset) =>
  'calc(100%' +
  (props.hasTitle ? ' ' + titleHeightOffset + ' - 20px - 0.5rem' : '') +
  (props.hasDescription ? ' ' + titleHeightOffset + ' - 20px - 0.5rem' : '') +
  ')';

function Image(props: {
  images?: string[];
  index?: number;
  onClick?: () => void;
  setIndex?: (index: number) => void;
  alt?: string;
  lqip?: string;
  hasTitle?: boolean;
  hasDescription?: boolean;
  disabled?: boolean;
  titleElement?;
  left?: string;
  right?: string;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  autoPlay?: boolean;
  showThumbs?: boolean;
  showStatus?: boolean;
  onClickItem?: (index: number) => void;
}) {
  const imgRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [titleHeightOffset, setTitleHeightOffset] =
    useState('- 1.3rem - 0.6vw');
  const [maxHeight, setMaxHeight] = useState(
    getMaxHeight(props, titleHeightOffset)
  );

  useEffect(() => {
    if (imgRef.current && (imgRef.current as any).complete) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {}, [
    props.disabled,
    props.images,
    props.images?.length,
    props.leftElement,
    props.rightElement,
  ]);

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
      <CarouselHolder
        onClick={props?.onClick}
        style={{ cursor: props?.onClick ? 'pointer' : 'auto' }}
      >
        <Carousel
          selectedItem={props.index || 0}
          autoPlay={props?.autoPlay || false}
          showThumbs={props?.showThumbs || false}
          showStatus={props?.showStatus || false}
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
          onClickItem={props?.onClickItem}
          renderArrowPrev={(onClick, hasPrev) =>
            hasPrev && (
              <Input
                type={'button'}
                onClick={(e) => {
                  preventDefault(e);
                  onClick();
                }}
                style={{ ...arrowStyles, left: 15 }}
                value={props.left || '❮' || '◃' || '◀' || '◁' || '◂' || '⦉'}
              />
            )
          }
          renderArrowNext={(onClick, hasNext) =>
            hasNext && (
              <Input
                type={'button'}
                onClick={(e) => {
                  preventDefault(e);
                  onClick();
                }}
                style={{ ...arrowStyles, right: 15 }}
                value={props.right || '❯' || '▹' || '▶' || '▷' || '▸' || '⦊'}
              />
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
        <LeftElementHolder>{props.leftElement}</LeftElementHolder>
        <RightElementHolder>{props.rightElement}</RightElementHolder>
      </CarouselHolder>
    </>
  );
}
export default withTheme(Image);
