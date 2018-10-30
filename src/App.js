import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity
} from 'office-ui-fabric-react/lib/DocumentCard';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <DocumentCard onClickHref='http://bing.com'>
          <DocumentCardPreview
            previewImages={ [
              {
                previewImageSrc: require('./documentpreview.png'),
                iconSrc: require('./iconppt.png'),
                width: 318,
                height: 196,
                accentColor: '#ce4b1f'
              }
            ] }
          />
          <DocumentCardTitle title='Revenue stream proposal fiscal year 2016 version02.pptx'/>
          <DocumentCardActivity
            activity='Created Feb 23, 2016'
            people={
              [
                { name: 'Kat Larrson', profileImageSrc: require('./avatarkat.png') }
              ]
            }
            />
        </DocumentCard>
        <Label>StandardButton</Label>
        <DefaultButton
          text="turn background red"
          onClick={onClick}
        />
      </React.Fragment>
    );
    function onClick() {
      alert('Clicked');
      document.body.style.backgroundColor = "red";
    }
  }
}

export default App;
