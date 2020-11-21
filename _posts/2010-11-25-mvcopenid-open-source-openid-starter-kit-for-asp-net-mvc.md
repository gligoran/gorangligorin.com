---
layout: post
title: 'MvcOpenID - Open Source OpenID Starter Kit for ASP.NET MVC'
date: 2010-11-25
comments: true
categories: [aspnet-mvc, openid]
---

Last week was quite a productive one for me. Pulling in about 4 to 5 productive hours a day as you can see from the graph below. I'm happy about that.

[![Productivity Week 3 November 2010][img]][img]{:.fancybox}

So what was I up to, you might ask. Well I'll tell you. I decided to publish my first open source project. It's an OpenID Starter Kit for ASP.NET MVC. Essentially it is an ASP.NET MVC empty project with the added functionality that handles users logging-in with their OpenIDs. I'm still at a very early stage, but the core is there. I plan to break the project into 3 parts - Basic, PopUp and AJAX. The difference is essentially in user's experience when logging-in. Basic and PopUp have a separate page for login. After entering you OpenID the Basic method will redirect you to your OpenID provider's page while PopUp will open a smaller PopUp window. AJAX approach will have a box popup wherever on the page you are. I'm still unsure how the user gets to OpenID provider's page with this approach, but I'll get to that when I get there. Each of these 3 parts will be implemented using Razor and ASPX view engines.

As I'm not a reinventing-the-wheel kind of a developer my project is using a library called [DotNetOpenAuth][] by [Andrew Arnott][aa]. It is a very extensive library for OpenID, OAuth and InfoCard for .NET and I'd be a fool not to use it. The project also uses Entity Framework 4. I've also added a guide how to convert the project to get the new features of Entity Framework CTP4 like code-first. But I couldn't ship that as the CTP license does not permit it. As far as I came to understand from that lawyer talk.

And speaking of licenses, was that a pain to choose. I spent 3 or 4 days just reading articles, forums and of course licenses themselves. I really liked what Jeff Atwood wrote on the subject in his article [Pick a License, Any License][pick]. Choosing a license is a very crucial step when publishing an open source project. Without it people can't do much more then look at your code or they'll violate your copyrights. This is where your chosen license steps in and let's them know how they can use your code, where are the limitations when publishing their code that uses yours and if/how they need attribute you or the project. When choosing a license I found that the answers to these three questions will leave you standing with just a few choices. That's a good thing.

After reading around I was left with Microsoft Public License (Ms-PL), Apache License, version 2.0 and a MIT-style license. I looked what similar projects use. By similar I mean written for the Microsoft's .Net framework and preferably an ASP.NET MVC related project. It seemed that most of them used Ms-PL so I chose that one, but switched to Apache License v2.0 soon afterward just because it seems to be more widely used so more people will know what's it about and how to use the source that's licensed that way.

That was pretty much it for last week. If you'd like to check out the project itself there's a few ways to do that:

- [MvcOpenID on CodePlex][cp] - this is the primary hub for the project. Any discussions and issue tracking will take place here. You can download the code or use Mercurial (Hg).
- [MvcOpenID on GitHub][gh] - this is another repository I push the code to. It's mostly there for git users and also because the GitHub site has a lot of awesome features.
- [MvcOpenID on Ohloh][ohloh] - I've also submited MvcOpenID to Ohloh. It's a free public directory of open source software and people.

Check the project out and I hope you like it. Any feedback I can get is of course very welcome.

[img]: /images/mvcopenid-productivity.png 'Productivity Week 3 November 2010'
[dotnetopenauth]: https://www.dotnetopenauth.net 'DotNetOpenAuth'
[aa]: https://blog.nerdbank.net/ 'Andrew Arnott'
[pick]: https://www.codinghorror.com/blog/2007/04/pick-a-license-any-license.html 'Jeff Atwood, Pick a License, Any License'
[cp]: https://mvcopenid.codeplex.com/ 'MvcOpenID on CodePlex'
[gh]: https://github.com/gligoran/mvcopenid 'MvcOpenID on GitHub'
[ohloh]: https://www.ohloh.net/p/mvcopenid 'MvcOpenID on Ohloh'
