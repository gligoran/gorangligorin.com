---
layout: post
title: 'TortoiseSVN Global Ignore Pattern'
date: 2010-10-19
comments: true
categories: [svn]
---

I'm mainly posting this for myself, so I don't lose my SVN's ignore pattern again. So here it is:

```plain
*.o *.lo *.la *.al .libs *.so *.so.[0-9]* *.a *.pyc *.pyo *.rej *~ #*# .#* .*.swp .DS_Store *bin *obj RECYCLER Bin *.user *.suo VSMacros80
```

I use it for Visual Studio for now. I will update this if I add something along the way.
