import { useState } from 'react';
import Slider from '../Slider';
import { ChevronDown, ChevronRight } from 'react-feather';
import style from './styles.module.sass';
import ColorPicker from '../ColorPicker';
import useApplyStyle from '../../hooks/useApplyStyle';
import useStyleValue from '../../hooks/useStyleValue';
import { Text } from '../Styled';

const BoxShadow = () => {
  const applyStyle = useApplyStyle();
  const [showMore, setShowMore] = useState(true);
  const shadow =
    useStyleValue('boxShadow') || '2px 2px 2px 4px #696969';
  const shadowPieces: string[] = shadow.split('px');

  const horzontalOffest = Number(shadowPieces[0]);
  const verticalOffste = Number(shadowPieces[1]);
  const blurRadius = Number(shadowPieces[2]);
  const spreadRadius = Number(shadowPieces[3]);
  const color = shadowPieces[4].trim();

  const handleToggle = () => setShowMore(!showMore);

  function updateShadow(index: number, value) {
    const shadowPieces: string[] = shadow.split('px');
    switch (index) {
      case 0:
        shadowPieces[0] = value;
        break;
      case 1:
        shadowPieces[1] = value;
        break;
      case 2:
        shadowPieces[2] = value;
        break;
      case 3:
        shadowPieces[3] = value;
        break;
      case 4:
        shadowPieces[4] = value;
        break;
    }

    const shadowString: string = shadowPieces.join('px ');
    applyStyle('boxShadow', shadowString);
  }

  return (
    <>
      <div className={[style.container].join(' ')}>
        <div
          onClick={handleToggle}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Text>Box shadow</Text>
          {showMore ? <ChevronDown /> : <ChevronRight />}
        </div>
        {showMore && (
          <>
            <div className={style.content}>
              <Slider
                labelInline
                min={-100}
                label='X'
                value={horzontalOffest}
                onChange={(value) => {
                  updateShadow(0, value);
                }}
              />
              <Slider
                min={-100}
                labelInline
                label='Y'
                value={verticalOffste}
                onChange={(value) => {
                  updateShadow(1, value);
                }}
              />
              <Slider
                labelInline
                label='radius'
                value={blurRadius}
                onChange={(value) => {
                  updateShadow(2, value);
                }}
              />
              <Slider
                labelInline
                label='spread'
                value={spreadRadius}
                onChange={(value) => {
                  updateShadow(3, value);
                }}
              />
              <UpdateColor
                color={color}
                updateShadow={updateShadow}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const UpdateColor = (props) => {
  const { color, updateShadow } = props;

  return (
    <ColorPicker
      label='Shadow color'
      value={color}
      noPadding
      onChange={(value) => {
        updateShadow(4, value);
      }}
    />
  );
};

export default BoxShadow;
