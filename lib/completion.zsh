_wdn_complete() {
  local word completions
  word="$1"
  completions="$(wdn --autocomplete "${word}" )"
  reply=( "${(ps:\n:)completions}" )
}

compctl -K _wdn_complete wdn
