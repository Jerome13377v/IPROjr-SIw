import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export class Bugs extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://docs.google.com/forms/d/e/1FAIpQLSezxm9-I5SjUxBjbaTOC7adXKmOKMlNXGyn6I2aijfW1D78sQ/viewform?usp=sf_link'
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
            uri: 'https://docs.google.com/forms/d/e/1FAIpQLScHXRZYNtLkMtyzYsNX-kqxthC5EJOg3uHhcFy2muIYHrmesg/viewform?usp=sf_link'
          }}
          style={{ marginTop: 20 }}
        />
      );
    }
  }