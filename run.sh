#!/bin/bash

Xvfb :1 -screen 5 1024x768x8 &
export DISPLAY=:1.5
npm start
