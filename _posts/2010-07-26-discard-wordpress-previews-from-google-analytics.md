---
layout: post
title: "Discard WordPress Previews From Google Analytics"
date: 2010-07-26
comments: true
categories: [wordpress, google analytics]
---

Recently I've noticed that my traffic is way higher on the day that I write posts. This would be normal if I posts where published on the same day I wrote them. But that's not always the case. Sometimes I get inspired and write a bunch of posts and publish the most relevant one immediately and delay others for a few days. Or I could also just write a draft on one day and then finish it later on.

So I went investigating why the traffic was significantly higher on those days. I poked around my [Google Analytics][ga] reports and in Content &raquo; Top Content I saw entries like these:

![Wordpress previews in Google Analytics][img-ga-wp]

The `p=<number>&preview=true` part of the highlighted URLs was the key. Apparently the [WordPress plugin][wp-aio] I've got installed for Google Analytics and stuff like [Bing Webmaster Tools][bwt], [Yahoo Site Explorer][yahoo-se], [Google Webmaster Tools][gwt] added the JavaScript code that counts visits even in previews. This wasn't OK, because it blurs the real traffic results.

So I had two choices. Either change some PHP code of WordPress or the plugin or make Google Analytics discard the preview visits. Neither of these choices isn't perfect. The problem with the first one is that when WordPress or the plugin get updated my code will be gone and I'd have to do it all over again. The second one on the other hand only works for Goolge Analytics. If you're using any other traffic analysis services or tools, you'd have to do this for every one of them. I chose the second option as Google Analytics is my most used tool for traffic statistics.

The way to get rid of unwanted URLs in Google Analytics is via filters. The sad news here is that they only work from the moment you add them. You cannot change any data from the past. So I suggest doing this as soon as possible.

So to add this filter I went to my Google Analytics account and clicked on the *Edit* link in the actions column of the profile I use for this blog. There I clicked on the *Add filter* link in the upper right hand corner of the *Filters Applied to Profile* box. I've highlighted it here:

![Add filter in Google Analytics][img-ga-wp-addfilter]

I didn't have a filter like this in my Google Analytics account yet, so I had to create one. The was to be a custom filter that would exclude all of the URLs that have `preview=true` in them. I called it *Discard Previews* and when I filled out the *Add filter* form it looked like this:

![Discard Wordpress previews filter for Google Analytics][img-ga-wp-filter]

And that was it. The filter was set up and the traffic stats will be much more representative now.

[ga]: https://www.google.com/analytics "Google Analytics"
[img-ga-wp]: /images/ga-wp-previews.png "Wordpress previews in Google Analytics"
[wp-aio]: https://wordpress.org/extend/plugins/all-in-one-webmaster/ "All in One Webmaster"
[bwt]: https://www.bing.com/toolbox/webmaster/ "Bing Webmaster Center"
[yahoo-se]: https://developer.yahoo.com/search/siteexplorer/ "Yahoo Site Explorer"
[gwt]: https://www.google.com/webmasters/tools/ "Google Webmaster Tools"
[img-ga-wp-addfilter]: /images/ga-wp-addfilter.png "Add filter in Google Analytics"
[img-ga-wp-filter]: /images/ga-wp-filter.png "Discard Wordpress previews filter for Google Analytics"
