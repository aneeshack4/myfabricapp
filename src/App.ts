import React, { Component } from 'react';
import './App.css';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { VerticalStack } from '@uifabric/experiments';
import { BaseComponent, createRef } from 'office-ui-fabric-react/lib/Utilities';
import './Dropdown.Basic.Example.scss';

export class DropdownBasicExample extends BaseComponent<
  {},
  {
    selectedItem?: { key: string | number | undefined };
    selectedItems: string[];
  }
> {
  private _basicDropdown = createRef<IDropdown>();

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selectedItems: []
    };
  }
 
class App extends Component {
  
  public render() {
    const { selectedItem, selectedItems } = this.state;

    return (
      <React.Fragment>
        <form action="" className="docs-TextFieldExample">
          <VerticalStack gap={10} maxWidth='50%'>
            <TextField
              id="inputfield"
              label="Enter the text you'd like to translate."
              name="example"
              autoComplete="on"
              default="booh!"
            />
            <PrimaryButton onClick={translateInput}>Submit</PrimaryButton>
            <TextField id='translatedResult' label="Spanish:" underlined />
            <div className="docs-DropdownExample">
              <Dropdown
                placeHolder="Choose a language to translate to:"
                label="Choose a language to translate to: "
                id="languagesDropdown"
                ariaLabel="Basic dropdown example"
                options={[
                  { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
                  { key: 'es', text: 'Spanish' },
                  { key: 'it', text: 'Italian' },
                  { key: 'te', text: 'Telugu'},
                  { key: 'ru', text: 'Russian' },
                ]}
                onFocus={this._log('onFocus called')}
                componentRef={this._basicDropdown}
              />
            </div>
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
          'to': 'ru',
          'to': 'es'
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
