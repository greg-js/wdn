# wdn

`wdn` is a reimplementation of [wd](https://github.com/mfaerevaag/wd) in Node. It allows you to create warp points out of directories and then quickly warp (`cd`) to it using a very simple API. `wd` is written for `zsh` though, so if you're on `bash` or a different shell, you're out of luck. Hence this package.

All (or almost all?) of the original software's features have now been reimplemented, but I *just* found out (a bit late but still..) that there is already a [Ruby package](https://github.com/kigster/warp-dir) out there written by kigster which accomplishes the same goal. That means there is as of yet little reason (outside of already having Node installed but not Ruby) to use this package over it.

Eventually though, I will attempt to implement some extra features I had in mind, since I've already gone this far anyway, and my `zsh`/`ruby` scripting skills are close to non-existent.

Oh, and if you believe strongly that it's crazy or stupid to use Node to navigate the file system, then that's fine, I respect your opinion and implore you not to use this. However, if you want a fun and convenient way to jump around the file system using the command-line, and you don't use `zsh` or `ruby`, then `wdn` is your friend :-)

## installation

Install the package:

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
