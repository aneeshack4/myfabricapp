import React, { Component } from 'react';
import './App.css';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { VerticalStack } from '@uifabric/experiments';
 
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <form action="" className="docs-TextFieldExample">
          <VerticalStack gap={10} maxWidth='25%'>
            <TextField
              id="inputfield"
              label="Enter the text you'd like to translate."
              name="example"
              autoComplete="on"
              default="booh!"
            />
            <PrimaryButton onClick={translateInput}>Submit</PrimaryButton>
            <TextField id='translatedResult' label="Telugu:" underlined />
          </VerticalStack>
        </form>
      </React.Fragment>
    );
    function translateInput() {
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
            'to': 'te',
            // 'to': 'ru',
            // 'to': 'es'
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
