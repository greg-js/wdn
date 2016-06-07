# wdn

`wdn` is a reimplementation of [wd](https://github.com/mfaerevaag/wd) in Node.

It is currently very much a work in progress and not meant to be used yet, but feel free to test it out if you want.

Right now, the feature set is very basic, but the idea is to match all the features in the original package and then go beyond them. It is true that requiring Node as a dependency for simple command line navigation is a bit of a crazy idea, but when you've already got Node installed anyway, this isn't so much of a concern. Moreover, the fact of the matter is that I wanted to add certain features to `wd` which would have been well beyond my capabilities as a `bash`/`zsh` scripter.

So please don't send me your Node-hatemail and do use the excellent [wd](https://github.com/mfaerevaag/wd) if you use `zsh` and want a fun and light way to jump around the command line. Hopefully, the reason for reimplenting this in Node will become clear once I start adding the more interesting features I have in mind for this package.

## installation

First install the package:

```
npm install -g @greg-js/wdn
```

Then put this in your `.bashrc`/`.zshrc`:

```
wdn() {
  source $(npm root -g)/wdn/bin/wdn.sh
}
```

Now open a new shell, restart or `source` your file and you should be ready to go.

## usage

### warp

```
wdn WARP-POINT
```

So, assuming that you have a warp point `tmp` set to `/tmp`, `wdn tmp` will be equivalent to `cd /tmp`. `wdn proj` would warp you to whatever directory you have set as `proj`.

### add

```
wdn add NAME DESTINATION
```

For example, `wdn add tmp /tmp` or `wdn add proj ~/dev/myproject`

### list

```
wdn list
```

Logs a list of currently saved warp points.





Other commands and features are as of yet unimplemented.
