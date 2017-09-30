# kettle-corn

[![Build Status](https://travis-ci.org/kofno/kettle-corn.svg?branch=master)](https://travis-ci.org/kofno/kettle-corn)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=plastic)](https://github.com/semantic-release/semantic-release)

A MobX Store that reflects video state so it can be synchronized with other page
components.

## wut?
A lot of times when you embed a video in a web page, you want to have components
on that webpage respond to video progress. You can use events and manipulate the
DOM directly, but that becomes a mess pretty quickly.

This library tries to simplify that process by providing a React component for
embedding video (YouTube and Vimeo supported, so far) and making the video state
observable using MobX.

## the kettle
The Kettle -- named after an ongoing popcorn/movie joke -- stores the data from
the embedded videos. The embedding copmponents in kettle corn update the state
of the kettle, which is made observable by MobX.

Since the state of the Kettle can be observed, it is possible to react to changes
in the video state, synchronizing it with other parts of the application.

The Kettle also holds an observable message queue. This allows other components
to make requests of the embedded video components. A video component observes
the message queue and reacts to any changes. Based on the message, it can
change the state of the player (Play, Pause, Seek to a position, etc.).

## embedding videos
Kettle corn provides React components that work with the Kettle. For example,
the YouTube component embeds a YouTube player. It takes a Kettle as a property.
When the video updates, it updates the Kettle, which can be observed by other
components.

To switch to a Vimeo video, you only need to swap the YouTube component for the
VimeoPlayer component. The rest of your page can stay intact, since it is bound
to the Kettle, rather then a particular player.

## see more
Still not sure? Want to see it in action? Great! I have just the thing!

  * Demo: http://kettle-corn-demo.surge.sh/
  * Demo Source: https://github.com/kofno/kettle-corn-demo

## install

    $> yarn add kettle-corn

    $> npm install kettle-corn

