import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx'; // a utility for constructing className conditionally
import { Image as ImageStyle, BackgroundImage } from './styles';

function Image(props: {
  src?: string;
  alt?: string;
  lqip?: string;
  hasTitle?: boolean;
  hasDescription?: boolean;
  disabled?: boolean;
  titleElement?;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();
  useEffect(() => {
    if (imgRef.current && (imgRef.current as any).complete) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {}, [props.disabled]);

  useEffect(() => {
    if (props.titleElement) {
      setTitleHeightOffset(`- ${props.titleElement.clientHeight}px`);
    }
  }, [props.titleElement]);

  const getMaxHeight = () =>
    'calc(100%' +
    (props.hasTitle ? ' ' + titleHeightOffset + ' - 10px - 0.5rem' : '') +
    (props.hasDescription ? ' - 1rem - 10px - 1rem' : '') +
    ')';

  const [maxHeight, setMaxHeight] = useState(getMaxHeight());
  const [titleHeightOffset, setTitleHeightOffset] =
    useState('- 1.3rem - 0.6vw');

  useEffect(() => {
    const maxHeight = getMaxHeight();
    setMaxHeight(maxHeight);
  }, [props.hasDescription, props.hasTitle, titleHeightOffset]);

  return (
    <>
      <BackgroundImage alt={props.alt} src={props.lqip} />
      <ImageStyle
        loading="lazy"
        src={props.src}
        alt={props.alt}
        ref={imgRef}
        onLoad={() => setLoaded(true)}
        className={clsx('source', loaded && 'loaded') + 'img-fluid'}
        style={{
          maxHeight: maxHeight,
          height: maxHeight,
          color: 'red',
          filter: 'grayscale(' + (props.disabled ? '1' : '0') + ')',
        }}
      />
    </>
  );
}
export default Image;
