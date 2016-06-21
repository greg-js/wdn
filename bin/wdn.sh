#!/bin/bash

# get script dir
if [[ $SHELL =~ zsh$ ]]; then
  WD=$( cd "$(dirname "$0")" ; pwd -P )
elif [[ $SHELL =~ bash$ ]]; then
  WD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
fi

# get warp dir function
function getdir () {
  local warp="$(node ${WD}/../lib/warp.js $1)"
  if [[ $warp == "undefined" ]]; then
    echo $arg is not a valid warp point
    exit 1
  fi
  echo $warp
}

# ridiculous mess for detecting keywords in both bash and zsh
# tested keywords: help, h, version, v, list, ls, add, a, remove, rm, clear
if [[ $1 =~ ^\-?\-?help$ || $1 =~ ^\-?\-?h$ || $1 =~ ^\-?\-?version$ || $1 =~ ^\-?\-?v$ || $1 =~ ^\-?\-?list$ || $1 =~ ^\-?\-?ls$ || $1 =~ ^\-?\-?add$ || $1 =~ ^\-?\-?a$ || $1 =~ ^\-?\-?remove$ || $1 =~ ^\-?\-?rm$ || $1 =~ ^\-?\-?clear$ ]]; then
  node ${WD}/cli.js $@
# execute commands
elif [[ $1 =~ ^\-?\-?exec$ || $1 =~ ^\-?\-?e$ ]]; then
  DIR=$(getdir $2)
  echo "${@:3} $DIR" | $SHELL -
# warp in all other cases
else
  DIR=$(getdir $1)
  cd $DIR
fi
