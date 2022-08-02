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
      <ThemedFileButton Button={ThemedLinkButton} onChange={(a)=>{console.log('Checkbox', a);}}/>
    </ThemeProvider>
  );
});
