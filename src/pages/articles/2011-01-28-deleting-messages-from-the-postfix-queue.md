---
title: "Deleting messages from the Postfix queue"
date: "2011-01-28"
path: "/articles/deleting-messages-from-the-postfix-queue/"
tags:
  - "Postfix"
  - "Linux"
  - "Bash"
---

Sometimes, you have dozens of messages clogging your Postfix queue, all with the same bogus recipient.

Here is how to delete them in a go, using the **postsuper** command and some scripting magic (of course, you need to replace `address@example.com` with the desired recipient):

```bash
mailq | tail -n +2 | grep -v '^ *(' | awk  'BEGIN { RS = "" }
              # $7=sender, $8=recipient1, $9=recipient2
              { if ($8 == "address@example.com" && $9 == "")
                    print $1 }
          ' | tr -d '*!' | sudo postsuper -d -
```

(Adapted from the <a href="http://www.postfix.org/postsuper.1.html">postsuper man page</a>.)
