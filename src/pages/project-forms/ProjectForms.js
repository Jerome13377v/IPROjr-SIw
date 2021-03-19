import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export class Bugs extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://docs.google.com/forms/d/e/1FAIpQLSfMF3wW_J-hAKTyQFdKDSyJPAPx3Oqr_-DlzFMWgT0ku75kDA/viewform?usp=sf_link'
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export class FeedBack extends Component {
    render() {
      return (
        <WebView
          source={{
            uri: 'https://docs.google.com/forms/d/e/1FAIpQLSfMF3wW_J-hAKTyQFdKDSyJPAPx3Oqr_-DlzFMWgT0ku75kDA/viewform?usp=sf_link'
          }}
          style={{ marginTop: 20 }}
        />
      );
    }
  }