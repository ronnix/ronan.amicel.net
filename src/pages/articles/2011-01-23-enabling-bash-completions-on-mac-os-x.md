---
title: "Enabling bash completions on Mac OS X"
date: "2011-01-23"
path: "/articles/enabling-bash-completions-on-mac-os-x/"
tags:
  - "MacOS"
  - "Bash"
  - "Homebrew"
---

Mac OS X comes with bash as the default shell, but it does not include the very convenient completion functionality commonly available in Linux distributions. So here are the steps to enable it.

First, you need to install the **bash-completion** package using the great <a href="http://mxcl.github.com/homebrew/">Homebrew</a> package manager:

```bash
brew install bash-completion
```

Then, enable the completions for the **brew** command itself:

```bash
ln -s `brew --prefix`/Library/Contributions/brew_bash_completion.sh `brew --prefix`/etc/bash_completion.d/
```

Now, edit your **~/.bash_profile** to add the following lines:

```bash
export USER_BASH_COMPLETION_DIR=~/.bash_completion.d
if [ -f `brew --prefix`/etc/bash_completion ]; then
    . `brew --prefix`/etc/bash_completion
fi
```

Finally, create a file named **~/.bash_completion** with the following lines (this will allow you to add your own completion scripts in the **~/.bash_completion.d/** directory):

```bash
if [ -d $USER_BASH_COMPLETION_DIR -a -r $USER_BASH_COMPLETION_DIR -a \
     -x $USER_BASH_COMPLETION_DIR ]; then
        for i in $USER_BASH_COMPLETION_DIR/*; do
                [[ ${i##*/} != @(*~|*.bak|*.swp|\#*\#|*.dpkg*|.rpm*) ]] &&
                        [ \( -f $i -o -h $i \) -a -r $i ] && . $i
        done
fi
unset i
```

That’s it! All new shells will now be completion enabled.
