---
layout: post
title: 'Fixing Crawl Errors From Google Webmaster Tools on IIS7'
date: 2010-08-05
comments: true
categories: [iis]
---

Crawl Errors in [Google Webmaster Tools][gwt] are a way for Google to notify you (a webmaster) that while googlebot tried to crawl a URL on your site it could not access it. It also gives you a description of the error, the date the error was detected and a list of links that point to that URL.

There's quite a few reasons an error could occur. What to do with specific error is left entirely up to you. In this article I'll explain how to fix "Not Found" crawl errors using rewrite rules in web.config file.

The first thing you should do is check the "Linked from" list for outside links. If someone out there is linking to your site with a wrong URL it won't do you much good. There are two things that you could do:

- Contact the site that's linking to you and ask them to correct the link.
- You can make a 301 redirect to the correct URL. This will be explained later on.

All of 'Not Found' URLs should return a 404 HTTP status code. You can check this with the [Fetch as Googlebot][gb-fetch] tool. There are 2 options you have when dealing with these:

- If the URL is pointing to a page that was on your site but no longer exists you should return a 410 [HTTP status code][http-codes]. This will tell your users, Google and other search engines that your site is 'Gone'.
- If the URL is pointing to a page that was moved to another URL you should do a 301 redirect that points to the correct URL.

## Rewrite Rules and web.config

Rewrite rules are a set of rules that tell your web server what to do with some URLs. These rules can be quite complex. But, as you'll only be dealing with the URLs from the Crawl Error report, these ones will be pretty simple.

First thing you need to do is see if you have a `rewrite` section in your web.config file. It should be in `system.webserver` which is inside the `configuration` section. If you're missing any part of this just add it. And also add a `rules` section inside the `rewrite` one. This is where all your rules will go. Your web.config should look something like this:

```xml
<configuration>
    <!-- ... -->
    <system.webServer>
        <!-- ... -->
        <rewrite>
            <rules>
                 <!-- Here we'll insert the rewrite rules -->
            </rules>
        </rewrite>
        <!-- ... -->
    </system.webServer>
    <!-- ... -->
</configuration>
```

## 410 - Gone

URLs to pages that were on your site but no longer exist should return a 410 HTTP status code. There are 2 types of rules you'll need here depending if the [query string][query] is an important part of the URL or not.

To determine which type of URL it is let's look at 2 examples:

1. `www.fakestore.com/jeans/?item=24`
2. `www.fakestore.com/long-jeans/`

Both of these URLs should return a 404 HTTP status code. Our fake store doesn't sell jeans with the id 24 any more. Neither do they any longer hold long jeans. The first example shows that query string is very important. You wouldn't want to remove the title page of jeans department, just those particular jeans. On the contrary that's exactly what you'd like to achieve in example 2. Today's websites with the pretty URL movement spreading all through the web, you're probably be dealing with example 2 like URLs a lot more.

### Query string independent URLs

Let's start with query string independent URLs. For this you'll need to use this snippet of XML code:

```xml
<rule name="GoneX" stopProcessing="true">
    <match url="^URL/?$" ignoreCase="true" />
    <action type="CustomResponse" statusCode="410" statusReason="Gone" statusDescription="The requested resource is no longer available at the server and no forwarding address is known." />
</rule>
```

As IIS7 does not allow multiple rules with the same name change the _`X`_ in `GoneX` with some unique string. I usually use consecutive numbers (`Gone1`, `Gone2`, ...).

You'll also need to replace _`URL`_ with the URL you got from Crawl Errors report without the domain part. So if you look back at the second example you'll only need the `long-jeans/` part.

As rewrite rules use [regular expressions][regex] for matching URLs you'll need to be mindful of a couple of thing:

- Make sure that the `^` and the `/?$` remain as they are. The `^` and `$` mark the start and the end of the string respectively. And the `/?` says that there is an optional slash at the end.
- Leave out the slash at the end of the URL if there is one. `www.fakestroe.com/long-jeans` and `www.fakestore.com/long-jeans/` are technically 2 different URLs, but people might type in one or another. That's why these rules contain a `/?` at the end.
- You'll also need to escape all the meta characters. The most common ones in URLs are `.` `-` `+` `(` and `)`. To escape a character you need a backslash in front of it.

With all that said here's how the above snippet would look like with example 2:

```xml
<rule name="GoneX" stopProcessing="true">
    <match url="^long\\-jeans/?$" ignoreCase="true" />
    <action type="CustomResponse" statusCode="410" statusReason="Gone" statusDescription="The requested resource is no longer available at the server and no forwarding address is known." />
</rule>
```

As you can see our rule is also case insensitive. If your web server now receives a request for a URL and matches it with one of your rules it will return a 410 HTTP status code. You can also change the status description by altering the `statusDescription` attribute of the `action` tag. This message will give your visitors an explanation for the error.

You'll need to create a separate rule for each query string independent URL that points to a no longer existing page.

### Query string based URLs

Now let's look at URLs which hold important information in the query string like our example 1. Here you won't need separate rules for each URL. This is because the `URL` attribute in the match tag is only matching the URL without the domain and the query string. So there will only be one rule which will match all URLs:

```xml
<rule name="GoneQueryStrings" stopProcessing="true">
    <match url=".*" ignoreCase="true" />
    <conditions logicalGrouping="MatchAny">
        <!-- conditions go here -->
    </conditions>
    <action type="CustomResponse" statusCode="410" statusReason="Gone" statusDescription="The requested resource is no longer available at the server and no forwarding address is known." />
</rule>
```

Place this rule anywhere amongst your previous rules. You'll notice the `.*` in the URL attribute. Regular expression `.` mathces any character and the `*` says that there my be 0 of more such characters. This matching any URL. As you don't want all the URLs on our site to start returning 410s you need some conditions. These conditions look like this:

```xml
<add input="{QUERY_STRING}" pattern="QUERYSTRING" />
```

Now all you have to do is to replace the _`QUERYSTRING`_ in the `pattern` attribute with the query string from your URL and insert the condition in the above rule. Don't forget about escaping the query string. You can have as many conditions as you want inside this rule. If any of these conditions match the query string of the URL request received by your web server it will fire up the action the return a 410 HTTP status code.

## 301 - Moved permanently

If you find a URL in your Crawl Errors report that has change (moved) you should use a 301 redirect to automatically redirect your users and Google to the new URL.

The difference between a 410 and a 301 rule in your web.config is in the `action` tag. For 301 you'll need to use:

```xml
<action type="Redirect" url="NEWURL" />
```

You'll need to change _`NEWURL`_ with the URL that you want the old URL to be pointing at. The new URL must be a full URL. So let's look at the example where `www.example.com/old/` is redirected to `www.example.com/new/`:

```xml
<rule name="Moved1" stopProcessing="true">
    <match url="^old/?$" ignoreCase="true" />
    <action type="Redirect" url="https://www.example.com/new/" />
</rule>
```

The same principle applies to query string based URLs. The only difference is that you need to make a separate rule for every URL you're redirecting to.

## All in due time

When you setup all of your rules your part is done. You can check if everything works as it should with [Fatch as Googlebot][gb-fetch] tool or manually entering URLs into your browser.

Googlebot will see these changes the next time it crawls your URLs and according to [RL removal explained, Part IV: Tracking your requests & what not to remove][url-removal]:

> ...they will drop out naturally over time as we stop crawling URLs that repeatedly 404.

As 410 is stronger then 404 your 410s should start disappearing from the Crawl Errors report over time. The URLs you redirected with a 301 should disappear faster.

_For more information on creating rewrite rules go to [Creating Rewrite Rules for the URL Rewrite Module][rw-rules]._

_For testing your Regular Expression you can use [Regular Expression Test Tool][regex-test]._

[gwt]: https://www.google.com/webmasters/tools/ 'Google Webmaster Tools'
[gb-fetch]: https://www.google.com/support/webmasters/bin/answer.py?answer=158587
[http-codes]: https://www.google.com/support/webmasters/bin/answer.py?answer=40132 'HTTP status codes'
[query]: https://en.wikipedia.org/wiki/Query_string 'Query string'
[regex]: https://en.wikipedia.org/wiki/Regular_expression
[url-removal]: https://googlewebmastercentral.blogspot.com/2010/05/url-removal-explained-part-iv-tracking.html
[rw-rules]: https://learn.iis.net/page.aspx/461/creating-rewrite-rules-for-the-url-rewrite-module/
[regex-test]: https://regex101.com/
