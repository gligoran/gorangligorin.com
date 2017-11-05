---
layout: post
title: "Mercurial (Hg) and Git Global Ignore Files for Windows"
date: 2010-10-20
comments: true
categories: [git, mercurial]
---

So yet another post that is meant mainly for myself, but maybe someone else will find in it as well.

The ignore pattern I use for Visual Studio projects is the same for both Mercurial and Git:

```plain
build/
*.suo
*.user
_ReSharper*
*.csproj.user
*.resharper.user
*.suo
*.cache
*.trx
Thumbs.db
[Bb]in
[Dd]ebug
[Oo]bj
[Rr]elease
[Tt]est[Rr]esult*
_UpgradeReport_Files
*[Pp]ublish.xml
*.project
*.metadata
logs
*.generated.cs
T4MVC.cs
```

The only difference is how to set global ignore rules for each of them. I found these two great tutorials for this:

- Mercurial (Hg): [geekswithblogs.net](https://geekswithblogs.net/rob/archive/2010/07/16/mercurial-hg-global-ignore-file-on-windows.aspx)
- Git: [help.github.com](https://help.github.com/git-ignore/)

UPDATE (16/11/2010): After using Hg for a while with my ASP.NET MVC projects I've added a few things to the ignore list.
