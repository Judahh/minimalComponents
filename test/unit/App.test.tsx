import React from 'react';
import { mount } from '@cypress/react';
import { Input } from '../../src/components/Input';
import { default as lightTheme } from '../../src/styles/themes/light.json';
import { ThemeProvider, withTheme } from 'styled-components';
import { Checkbox } from '../../src/components/Input/CheckBox';
import { TagList, Tag } from '../../src/components/Input/Tag';
import { CloseButton, EditButton, LinkButton, LocationButton, RedButton, SubmitButton } from '../../src/components/Input/Button';
import { CloseType } from '../../src/components/Input/Button/closeType';
import FileButton from '../../src/components/Input/Button/FileButton';
import Image from '../../src/components/Image';

it('can mount a light theme', () => {
  const ThemedInput = withTheme(Input);
  const ThemedCheckbox = withTheme(Checkbox);
  const ThemedTagList = withTheme(TagList);
  const ThemedTag = withTheme(Tag);
  const ThemedCloseButton = withTheme(CloseButton);
  const ThemedLinkButton = withTheme(LinkButton);
  const ThemedSubmitButton = withTheme(SubmitButton);
  const ThemedRedButton = withTheme(RedButton);
  const ThemedEditButton = withTheme(EditButton);
  const ThemedLocationButton = withTheme(LocationButton);
  const ThemedFileButton = withTheme(FileButton);
  const ThemedImage = withTheme(Image);

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
      <ThemedEditButton>Edit</ThemedEditButton>
      <ThemedLocationButton>Location</ThemedLocationButton>
      <ThemedFileButton Button={(p: {onClick}) => (<ThemedLinkButton onClick={p.onClick}>FILE</ThemedLinkButton>)} onChange={(a)=>{console.log('Checkbox', a);}}/>
      <ThemedImage images={['https://cdn.shopify.com/s/files/1/0076/0994/2086/articles/pexels-rachel-claire-5490975_1500x1001_crop_bottom.jpg?v=1627672147']} alt={'single'} />
      <ThemedImage images={['https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8', 'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf']} alt={'2'} />
      <ThemedImage images={['https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8', 'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf', 'https://ph-cdn3.ecosweb.com.br/imagens01/foto/moda-feminina/conjunto/conjunto-folhagem-de-blusa-com-amarracao-e-short_341333_301_1.jpg']} alt={'3'} />
    </ThemeProvider>
  );
});
