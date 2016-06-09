# wdn

`wdn` is a reimplementation of [wd](https://github.com/mfaerevaag/wd) in Node.

All (or almost all?) of the original software's features have now been reimplemented, but there is as of yet no reason for anyone to use this package over it. The reason is that requiring Node as a dependency for simple command line navigation is quite the stretch, even for a Node-junkie such as myself.

Eventually though, I will attempt to implement extra features, which would be a nightmare to deal with in `bash`/`zsh`, the language the original package was written in.

So please don't send me your Node-hatemail and do use the excellent [wd](https://github.com/mfaerevaag/wd) if you use `zsh` and want a fun and light way to jump around the command line.

Hopefully, the reason for reimplenting this in Node will become clear once I start adding the more interesting features I have in mind for this package.


## installation

First install the package:

```
npm install -g greg-js/wdn
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
wdn WARP_POINT
```

So, assuming that you have a warp point `tmp` set to `/tmp`, `wdn tmp` will be equivalent to `cd /tmp`. `wdn proj` would warp you to whatever directory you have set as `proj`.

### add

```
wdn add WARP_POINT PATH
```

For example, `wdn add tmp /tmp` or `wdn add proj ~/dev/myproject`

If you don't pass a path argument, `wdn` will assume you want to save the current working directory.

So let's say you're currently in `~/downloads` on the command line and you run this command:

```
wdn add down
```

This will add the `down` warp point and set it to `~/downloads`

### list

```
wdn list
```

Logs a list of currently saved warp points.

### remove

```
wdn remove WARP_POINT
```

Removes a given warp point.

### clear

```
wdn clear
```

Removes **all** warp points.
