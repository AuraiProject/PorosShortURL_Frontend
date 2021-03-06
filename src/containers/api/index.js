import React, {Component} from 'react';
import {Card} from 'antd';


const docContent = {
  title: "/api/url",
  content: [
    {
      key: "GET",
      tab: "GET",
      content: (
        <div>
          <strong>Intro</strong>
          <p>Get the full info from the existing short url.</p>
          <br/>
          <strong>Params</strong>
          <ul>
            <li>short_url: The short url that you want to get the info.</li>
          </ul>
          <br/>
          <strong>Headers</strong>
          <ul>
            <li>Authentication: Basic %The short url's base64 encoded password.(optional)%</li>
          </ul>
        </div>
      )
    },
    {
      key: "POST",
      tab: "POST",
      content: (
        <div>
          <strong>Intro</strong>
          <p>Create a short url by given info.</p>
          <br/>
          <strong>Params</strong>
          <ul>
            <li>url: The url that will be encoded to a short url.</li>
            <li>short_url: The short url that you want get.</li>
            <li>digit: The short url's length that you want to get.</li>
            <li>expired_timestamp: The python format timestamp to specify a expired time.</li>
            <li>password: The password of the short_url.</li>
          </ul>
        </div>
      )
    }
  ]
};


export class ApiDoc extends Component {
  state = {
    key: docContent.content[0].key
  };

  onTabChange = (key, type) => {
    this.setState({
      [type]: key
    })
  };

  render() {
    return (
      <div className="apiDocBox">
        <Card
          title={docContent.title}
          tabList={docContent.content}
          activeTabKey={this.state.key}
          onTabChange={key => this.onTabChange(key, 'key')}
          style={{textAlign: "left"}}
        >
          {
            docContent.content.filter(o => o.key === this.state.key)[0].content
          }
        </Card>
      </div>
    )
  }
}