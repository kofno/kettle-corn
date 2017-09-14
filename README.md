# kettle-corn
A MobX Store that reflects video state so it can be synchronized with other page
components.

## wut?
A lot of times when you embed a video in a web page, you want to have components
on that webpage respond to video progress. You can use events and manipulate the
DOM directly, but that becomes a mess pretty quickly.

This library tries to simplify that process by providing a React component for
embedding video (only YouTube supported, so far) and making the video state
observable using MobX.

Demo: http://kettle-corn-demo.surge.sh/
Demo source: https://github.com/kofno/kettle-corn-demo

## install

    $> yarn add kettle-corn

    $> npm install kettle-corn

