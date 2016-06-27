# wdn

(if you update from v2.x to v3.x, you *will* lose your saved warp points due to a backwards-incompatible change in how the warp points are stored)

`wdn` is a Node.js reimplementation of the [wd](https://github.com/mfaerevaag/wd) for `zsh`. It allows you to create warp points out of directories and then quickly warp (`cd`) to them using a very simple API. This should work in `bash` as well as in `zsh`and *might* work in other shells too, but I haven't tested it yet.

I found out after I started this that there is already a [Ruby package](https://github.com/kigster/warp-dir) out there written by kigster which accomplishes the same goal of a `wd` that works in all shells. Check it out as well before you decide to use this!

Oh, and if you believe strongly that it's crazy or stupid to use Node to navigate the file system, then that's fine, I respect your opinion and implore you not to use this. However, if you want a fun and convenient way to jump around the file system using the command-line, and you don't use `zsh` or `ruby`, then `wdn` is your friend :-)

## requirements

- Node v0.12 or above.
- npm v2.15 or above.

Install it using your package manager or [nvm](https://github.com/creationix/nvm).

This won't work on Windows, unless *maybe* if you run native bash.

## installation

```
npm install -g wdn
```

(read [this](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) or install [nvm](https://github.com/creationix/nvm) if you find you need `sudo` to install global packages and dislike it)

Then put this in your `.bashrc`/`.zshrc`:

```
wdn() {
  source $(npm root -g)/wdn/bin/wdn.sh
}
```

Now open a new shell, reboot or `source` your file and you should be ready to go.

## differences between this package and others like it

The main differences right now are `wdn` being somewhat slower, the `exec` command and the fact that `wdn` has a slightly different API compared to the original `wd` and `warp-dir`. For example, `wd ls` is used for listing the contents of a warp point, whereas `wdn ls` lists all warp points.

You can accomplish `wd ls` with `wdn` using `exec`/`e`: `wdn e WARP_POINT ls`.

In future versions of `wdn`, additional features will be added.

## usage

### warp

```
wdn WARP_POINT
```

Warps to a given warp point.

Example:

```
[~]$ wdn add tmp /tmp
New warp point set:
    tmp   =>    /tmp
[~]$ wdn tmp
[/tmp]$
```

Assuming you have a warp point `tmp` set to `/tmp`, `wdn tmp` is equivalent to `cd /tmp`.

### `help` (alias `h`)

```
wdn help
```

Prints out a help message to the console.

### `add` (alias `a`)

```
wdn add WARP_POINT PATH
```

Adds a new warp point and sets it to the supplied `path` or to the current working directory.

Examples:

```
[~]$ wdn add tmp /tmp
[~]$ wdn add proj ~/dev/myproject
[~]$ wdn add home
[~]$ wdn list
tmp   =>  /tmp
proj  =>  ~/dev/myproject
home  =>  ~
```

### `list` (alias `ls`)

```
wdn list
```

Prints a list of the currently saved warp points.

### `show` (alias `s`)

```
wdn show WARP_POINT/DIR
```

Shows the saved dir for a given warp point or all warp points that point to a given directory. If run without any arguments, it is equivalent to `wdn show $(pwd)`

### `exec` (alias `e`)

```
wdn exec WARP_POINT COMMAND
```

Executes arbitrary commands in the warp point dir. Caution as this hasn't been exhaustively tested yet.

Examples:

```
wdn exec mypoint ls -al
wdn exec anotherpoint du -sh
```

### `remove` (alias `rm`)

```
wdn remove WARP_POINT
```

Removes a given warp point.

### clear

```
wdn clear
```

Removes **all** warp points.

### `clean` (alias `x`)

```
wdn clean
```

Removes all warp points that have broken paths, ie the ones for which the stored path is inaccessible. Warp points with working paths are unaffected.

### `version` (alias `v`)

```
wdn version
```

Prints the current version of `wdn` to the console.

### `-f`/`--force` option

You can run mostof the commands with the `-f`/`--force` option. In the case of `add`, `clean`, `clear` and `remove`, it causes the output to be suppressed and prompts to be ignored (ie, existing points will be automatically overwritten).

In the case of `list` and `show`, output will consist of unformatted paths so you could conceivably use it for composing complex commands on the command line using the warp points. For example: `cp $(wdn show mypoint -f)/* $(wdn show anotherpoint -f)`

## Where are the warp points stored?

Your local warp points are in `~/.config/wdn/wdn`. Remote warp points will be implemented later.

## Notes

Aside from the aliases, you can also use `wdn` with POSIX-style single or double dash option arguments. In other words, `wdn add` is equivalent to `wdn a`, `wdn -a`, `wdn --add`, and even `wdn --a` and `wdn -add`.
