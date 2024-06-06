#!/bin/bash
for browser in chrome firefox
do
yarn run cypress --browser $browser
done