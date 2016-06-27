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
  if [[ $warp == "null" || $warp == "undefined" ]]; then
    exit 1
  elif [[ $warp == "inaccessible" ]]; then
    exit 2
  fi
  echo $warp
  exit 0
}

# ridiculous mess for detecting keywords in both bash and zsh
# keywords: help, h, version, v, list, ls, add, a, remove,
#           rm, clear, rm-all, remove-all, show, s, clean, x
if [[ $1 =~ ^\-?\-?help$ || $1 =~ ^\-?\-?h$ || $1 =~ ^\-?\-?version$ || $1 =~ ^\-?\-?v$ || $1 =~ ^\-?\-?list$ || $1 =~ ^\-?\-?ls$ || $1 =~ ^\-?\-?add$ || $1 =~ ^\-?\-?a$ || $1 =~ ^\-?\-?remove$ || $1 =~ ^\-?\-?rm$ || $1 =~ ^\-?\-?clear$ || $1 =~ ^\-?\-?rm\-all$ || $1 =~ ^\-?\-?remove\-all$ || $1 =~ ^\-?\-?show$ || $1 =~ ^\-?\-?s$ || $1 =~ ^\-?\-?clean$ || $1 =~ ^\-?\-?x$ ]]; then
  node ${WD}/cli.js $@
# execute commands by getting the dir and evaluating the remaining arguments
# as a command, passing it as stdin to the current shell
elif [[ $1 =~ ^\-?\-?exec$ || $1 =~ ^\-?\-?e$ ]]; then
  DIR=$(getdir $2)
  echo "${@:3} $DIR" | $SHELL -
# warp in all other cases unless the warp dir doesn't exist
else
  DIR=$(getdir $1)
  CODE=$(echo $?)

  if [[ $CODE -eq 1 ]]; then
    echo -e "\e[90m$1\e[39m is not a valid warp point"
  elif [[ $CODE -eq 2 ]]; then
    echo -e "The path for \e[90m$1\e[39m is inaccessible"
  else
    cd $DIR
  fi
fi
