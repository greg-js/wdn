#!/bin/bash

# get script dir
WD=`dirname $0`

# detect keywords : help, version, list, add, remove
if [[ $1 =~ ^\-?\-?help$\|^\-?\-?h$\|^\-?\-?version$\|^\-?\-?v$\|^\-?\-?list$\|^\-?\-?ls$\|^\-?\-?add$\|^\-?\-?a$\|^\-?\-?remove$\|^\-?\-?rm$\|^\-?\-?clear$ ]]; then
  node ${WD}/cli.js $@
else
  DIR="$(node ${WD}/../lib/warp.js $@)"
  if [[ $DIR == "undefined" ]]; then
    echo $1 is not a valid warp point
  else
    cd $DIR
  fi
fi
