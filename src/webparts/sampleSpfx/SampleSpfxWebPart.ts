import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SampleSpfxWebPartStrings';
import SampleSpfx from './components/SampleSpfx';
import { ISampleSpfxProps } from './components/ISampleSpfxProps';

export interface ISampleSpfxWebPartProps {
  description: string;
}

export default class SampleSpfxWebPart extends BaseClientSideWebPart<ISampleSpfxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISampleSpfxProps > = React.createElement(
      SampleSpfx,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
