---
date: '2013-02-14T10:30:00.001-08:00'
description: ''
published: true
slug: 2013-02-want-lambdas-with-jdk6-heres-idea
tags:
- http://schemas.google.com/blogger/2008/kind#post
- jdk8
- idea
- development
- java
- lambda
- legacy-blogger
time_to_read: 5
title: Want lambdas with jdk6? Here's an IDEA
---

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/02/want-lambdas-with-jdk6-heres-idea.html)*.

All Java people are looking forward to jdk8 to bring more functional-like syntax to the language, but it will take some time before we'll really be able to code like that day to day. It may take years, before jdk8 gets fully adopted as a standard (how many of you already use jdk7 in production these days?) Till then, we'll still have to write all the verbose code around -- if you want to stick with Java language, of course.<br />
<br />
Want to try how it will look like in your code today? Get <a href="http://www.jetbrains.com/idea/">IntelliJ IDEA 12</a>.&nbsp;This is how my source code looks in it (Java <i>1.6.0_38-b05</i>):<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpks437MZ-4RadMWTAxmyL_xdmCWXWhuzan7vVXglIJHhDpRsA3Ve_ndnKrduH4s8oZ98BWmZ08Ia9Nv6377-quCkiI7jOAo35G_qjvUyepxuQooJ1B2wYpN_EHTs4SbPIQG3thJn9zfbm/s1600/lambdas+in+JDK6.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="122" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpks437MZ-4RadMWTAxmyL_xdmCWXWhuzan7vVXglIJHhDpRsA3Ve_ndnKrduH4s8oZ98BWmZ08Ia9Nv6377-quCkiI7jOAo35G_qjvUyepxuQooJ1B2wYpN_EHTs4SbPIQG3thJn9zfbm/s640/lambdas+in+JDK6.png" width="640" /></a></div>
<br />
When I hover the grayed code, real syntax comes up:<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhC9OfRbrX86-32fgxqUp4AZw5_81P7lXYFVMOi15h43v55hFFfVUpxY-7glUSsCitFfgUChnATH5ol10auLSX2a4ytIuR78ipvHngr1Ja_9JmvfVZWd3taERR861SWCxQTsLFuQ9CrY9H-/s1600/lambdas+in+JDK6+-+hover.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="112" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhC9OfRbrX86-32fgxqUp4AZw5_81P7lXYFVMOi15h43v55hFFfVUpxY-7glUSsCitFfgUChnATH5ol10auLSX2a4ytIuR78ipvHngr1Ja_9JmvfVZWd3taERR861SWCxQTsLFuQ9CrY9H-/s640/lambdas+in+JDK6+-+hover.png" width="640" /></a></div>
<br />
Pretty cool, huh?<br />
<br />
Extremely improves readability, when your anonymous class method's body is just one line return statement. And that's pretty often, when you're e.g. mocking method calls in unit tests.