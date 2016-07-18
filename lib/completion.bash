_wdn_complete() {
  COMPREPLY=()
  local word="${COMP_WORDS[COMP_CWORD]}"
  local completions="$(wdn --autocomplete "$word")"
  COMPREPLY=( $(compgen -W "$completions" -- "$word") )
}

complete -F _wdn_complete wdn
