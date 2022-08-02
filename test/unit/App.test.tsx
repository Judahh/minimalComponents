import React from 'react';
import { mount } from '@cypress/react';
import { Input } from '../../src/components/Input';
import { default as lightTheme } from '../../src/styles/themes/light.json';
import { ThemeProvider, withTheme } from 'styled-components';
import { Checkbox } from '../../src/components/Input/CheckBox';
import { TagList, Tag } from '../../src/components/Input/Tag';
import { ChangePicButton, CloseButton, ColorButton, DeleteButton, CleanButton, LinkButton, LocationButton, RedButton, SubmitButton } from '../../src/components/Input/Button';
import { CloseType } from '../../src/components/Input/Button/closeType';
import FileButton from '../../src/components/Input/Button/FileButton';
import Image from '../../src/components/Image';
import {
  CopyrightText,
  Text,
  SubText,
  MediumText,
  P,
  Quantity,
  H1, H2, H3, H4, H5, H6,
  Error,
  Notification,
  Link,
  FixedLink,
} from '../../src/components/Text';
import { Flags } from '../../src/components/Input/Switch/styles';

it('can mount a light theme', () => {
  const ThemedInput = withTheme(Input);
  const ThemedCheckbox = withTheme(Checkbox);
  const ThemedTagList = withTheme(TagList);
  const ThemedTag = withTheme(Tag);
  const ThemedCloseButton = withTheme(CloseButton);
  const ThemedLinkButton = withTheme(LinkButton);
  const ThemedSubmitButton = withTheme(SubmitButton);
  const ThemedRedButton = withTheme(RedButton);
  const ThemedCleanButton = withTheme(CleanButton);
  const ThemedChangePicButton = withTheme(ChangePicButton);
  const ThemedDeleteButton = withTheme(DeleteButton);
  const ThemedColorButton = withTheme(ColorButton);
  const ThemedLocationButton = withTheme(LocationButton);
  const ThemedFileButton = withTheme(FileButton);
  const ThemedFlags = withTheme(Flags);
  const ThemedImage = withTheme(Image);
  const ThemedCopyrightText = withTheme(CopyrightText);
  const ThemedTitle = withTheme(H1);
  const ThemedSubtitle = withTheme(H2);
  const ThemedSubtitle2 = withTheme(H3);
  const ThemedSubtitle3 = withTheme(H4);
  const ThemedSubtitle4 = withTheme(H5);
  const ThemedSubtitle5 = withTheme(H6);
  const ThemedText = withTheme(Text);
  const ThemedSubText = withTheme(SubText);
  const ThemedMediumText = withTheme(MediumText);
  const ThemedP = withTheme(P);
  const ThemedQuantity = withTheme(Quantity);
  const ThemedError = withTheme(Error);
  const ThemedNotification = withTheme(Notification);
  const ThemedLink = withTheme(Link);
  const ThemedFixedLink = withTheme(FixedLink);


  mount(
    <ThemeProvider theme={lightTheme}>
      <ThemedInput
        style={{
            fontSize: '16px',
            width: 'calc( 60% - 20px )',
            float: 'left',
            display: 'flex',
            padding: '10px',
            margin: '0px 5px',
          }}
        defaultValue={0}
        name="quantity"
        type="search"
        closeType={CloseType.red}
      />
      <ThemedInput
        style={{
            fontSize: '16px',
            width: 'calc( 60% - 20px )',
            float: 'left',
            display: 'flex',
            padding: '10px',
            margin: '0px 5px',
          }}
        defaultValue={0}
        name="quantity"
        type="search"
        closeType={CloseType.x}
      />
      <ThemedCheckbox
        style={{
          height: '20px',
          width: '20px',
        }}
        checked={true}
        onChange={(a)=>{console.log('Checkbox', a);}}
      />
      <ThemedTagList>
        <ThemedTag>asdfasdf</ThemedTag>
        <ThemedTag>jfgj</ThemedTag>
      </ThemedTagList>
      <ThemedCloseButton closeType={CloseType.red} />
      <ThemedCloseButton closeType={CloseType.x} />
      <ThemedLinkButton>Link</ThemedLinkButton>
      <ThemedSubmitButton>Submit</ThemedSubmitButton>
      <ThemedRedButton>Red</ThemedRedButton>
      <ThemedCleanButton>Edit</ThemedCleanButton>
      <ThemedChangePicButton>-</ThemedChangePicButton>
      <ThemedDeleteButton>-</ThemedDeleteButton>
      <ThemedColorButton color={'red'}>-</ThemedColorButton>
      <ThemedColorButton color={'green'}>-</ThemedColorButton>
      <ThemedLocationButton>Location</ThemedLocationButton>
      <ThemedFileButton Button={(p: {onClick}) => (<ThemedLinkButton onClick={p.onClick}>FILE</ThemedLinkButton>)} onChange={(a)=>{console.log('Checkbox', a);}}/>
      <ThemedFlags>
        <ThemedCleanButton
          type="submit"
        >
          <img src={"/icons/br.png"} alt="br" />
        </ThemedCleanButton>
        <ThemedCleanButton
          type="submit"
        >
          <img src={"/icons/en.png"} alt="en" />
        </ThemedCleanButton>
      </ThemedFlags>
      <ThemedImage images={['https://cdn.shopify.com/s/files/1/0076/0994/2086/articles/pexels-rachel-claire-5490975_1500x1001_crop_bottom.jpg?v=1627672147']} alt={'single'} />
      <ThemedImage images={['https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8', 'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf']} alt={'2'} />
      <ThemedImage images={['https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8', 'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf', 'https://ph-cdn3.ecosweb.com.br/imagens01/foto/moda-feminina/conjunto/conjunto-folhagem-de-blusa-com-amarracao-e-short_341333_301_1.jpg']} alt={'3'} />
      <ThemedCopyrightText >CopyrightText</ThemedCopyrightText>
      <ThemedTitle>Title</ThemedTitle>
      <ThemedSubtitle>Subtitle</ThemedSubtitle>
      <ThemedSubtitle2>Subtitle 2</ThemedSubtitle2>
      <ThemedSubtitle3>Subtitle 3</ThemedSubtitle3>
      <ThemedSubtitle4>Subtitle 4</ThemedSubtitle4>
      <ThemedSubtitle5>Subtitle 5</ThemedSubtitle5>
      <ThemedText>Text</ThemedText>
      <ThemedSubText>SubText</ThemedSubText>
      <ThemedMediumText>MediumText</ThemedMediumText>
      <ThemedP>Paragraph</ThemedP><br /><br />
      <ThemedQuantity>Quantity</ThemedQuantity><br /><br />
      <ThemedError>Error</ThemedError>
      <ThemedNotification>Notification</ThemedNotification>
      <ThemedLink>Link</ThemedLink>
      <ThemedFixedLink>FixedLink</ThemedFixedLink>
    </ThemeProvider>
  );
});
