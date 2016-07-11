#!/bin/bash

# get script dir
if [[ $SHELL =~ zsh$ ]]; then
    WD=$( cd "$(dirname "$0")" ; pwd -P )
elif [[ $SHELL =~ bash$ ]]; then
    WD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
fi

# get warp dir function
function getdir () {
    local warp="$(node ${WD}/../lib/warp.js $1 $2)"
    if [[ $warp == "null" || $warp == "undefined" ]]; then
        exit 1
    elif [[ $warp == "inaccessible" ]]; then
        exit 2
    fi
    echo $warp
    exit 0
}

# warp to ssh and execute cd to point
# TODO: figure out a way to support alternative shells on remote hosts
if [[ $1 =~ ^\-?\-?ssh$ ]]; then
  if [[ $# -lt 3 ]]; then
    echo Insufficient arguments
    echo
    node ${WD}/cli.js help
  elif [[ $3 =~ ^\-?\-?li?st?$ || $3 =~ ^\-?\-?ad?d?$ || $3 =~ ^\-?\-?clear$ ||
    $3 =~ ^\-?^\-?re?mo?v?e?$ || $3 =~ ^\-?\-?sh?o?w?$ ]]; then
    node ${WD}/cli.js $@
  else
    DIR=$(getdir $2 $3)
    ssh -t $2 "cd "$DIR"; bash"
  fi
# ridiculous mess for detecting keywords in both bash and zsh
# keywords: help, h, version, v, list, ls, add, a, remove, rm
#           clear, rm-all, remove-all, show, s, clean, x
elif [[ $1 =~ ^\-?\-?he?l?p?$ || $1 =~ ^\-?\-?ve?r?s?i?o?n?$ || $1 =~ ^\-?\-?li?st?$ ||
        $1 =~ ^\-?\-?ad?d?$ || $1 =~ ^\-?\-?re?mo?v?e?$ || $1 =~ ^\-?\-?clear$ ||
        $1 =~ ^\-?\-?rm\-all$ || $1 =~ ^\-?\-?re?mo?v?e?\-all$ ||
        $1 =~ ^\-?\-?s?h?o?w?$ || $1 =~ ^\-?\-?clean$ || $1 =~ ^\-?\-?x$ ]]; then
    node ${WD}/cli.js $@

# execute commands by getting the dir and evaluating the remaining arguments
# as a command, passing it as stdin to the current shell
elif [[ $1 =~ ^\-?\-?exec$ || $1 =~ ^\-?\-?e$ ]]; then
    DIR=$(getdir local $2)
    echo "${@:3} $DIR" | $SHELL -

# warp in all other cases unless the warp dir doesn't exist
else
    DIR=$(getdir local $1)
    CODE=$(echo $?)

    if [[ $CODE -eq 1 ]]; then
        echo -e "\e[90m$1\e[39m is not a valid warp point"
    elif [[ $CODE -eq 2 ]]; then
        echo -e "The path for \e[90m$1\e[39m is inaccessible"
    else
        cd $DIR
    fi
fi
