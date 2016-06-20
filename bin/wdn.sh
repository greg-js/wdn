#!/bin/bash

# get script dir
WD=`dirname $0`

# get warp dir function
function getdir () {
  local warp="$(node ${WD}/../lib/warp.js $1)"
  if [[ $warp == "undefined" ]]; then
    echo $arg is not a valid warp point
    exit 1
  fi
  echo $warp
}

# detect keywords : help, version, list, add, remove, clear
if [[ $1 =~ ^\-?\-?help$\|^\-?\-?h$\|^\-?\-?version$\|^\-?\-?v$\|^\-?\-?list$\|^\-?\-?ls$\|^\-?\-?add$\|^\-?\-?a$\|^\-?\-?remove$\|^\-?\-?rm$\|^\-?\-?clear$ ]]; then
  node ${WD}/cli.js $@
# execute commands
elif [[ $1 =~ ^\-?\-?exec$\|^\-?\-?e$ ]]; then
  DIR=$(getdir $2)
  echo "${@:3} $DIR" | $SHELL -
# warp in all other cases
else
  DIR=$(getdir $1)
  cd $DIR
fi
