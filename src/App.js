import React, { Component } from 'react';
import './App.css';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity
} from 'office-ui-fabric-react/lib/DocumentCard';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

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
        
        <form action="" className="docs-TextFieldExample">
          <TextField
            id="inputfield"
            label="Enter the text you'd like to translate."
            name="example"
            autoComplete="on"
            default="booh!"
          />
          <PrimaryButton onClick={translateInput}>Submit</PrimaryButton>
        </form>

        <TextField id='translatedResult' label="Italian:" underlined />
      </React.Fragment>
    );
    function onClick() {
      alert('Clicked');
      document.body.style.backgroundColor = "red";
    }
    function translateInput() {
      //const input = "hello world"
      const textfield = document.getElementById('inputfield');
      const input2 = textfield.value;

      const request = require('request');
      const uuidv4 = require('uuid/v4');

      let options = {
          method: 'POST',
          baseUrl: 'https://api.cognitive.microsofttranslator.com/',
          url: 'translate',
          qs: {
            'api-version': '3.0',
            'to': 'it',
          },
          headers: {
            'Ocp-Apim-Subscription-Key': 'e2d5f38c05af4872ab8cef78aaf76c15',
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
          },
          body: [{
                'text': input2
          }],
          json: true,
      };

      const translatedResultLabel = document.getElementById('translatedResult');
      request(options, function(err, res, body){
          console.log(JSON.stringify(body, null, 4));
          var result = JSON.stringify(body, null, 4);
          var resultObj = JSON.parse(result);
          translatedResultLabel.value = resultObj[0].translations[0].text;
      });

    }
  }
}

export default App;
