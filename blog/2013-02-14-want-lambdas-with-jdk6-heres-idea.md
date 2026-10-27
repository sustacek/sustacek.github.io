---
title: Want lambdas with jdk6? Here's an IDEA
authors: [js]
tags: [idea, development, java, lambda]
---

All Java people are looking forward to jdk8 to bring more functional-like syntax to the language, but it will take some time before we'll really be able to code like that day to day. It may take years, before jdk8 gets fully adopted as a standard (how many of you already use jdk7 in production these days?) Till then, we'll still have to write all the verbose code around -- if you want to stick with Java language, of course.

<!-- truncate -->

Want to try how it will look like in your code today? Get [IntelliJ IDEA 12](http://www.jetbrains.com/idea/). This is how my source code looks in it (Java *1.6.0_38-b05*):

[![Lambdas in JDK6](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpks437MZ-4RadMWTAxmyL_xdmCWXWhuzan7vVXglIJHhDpRsA3Ve_ndnKrduH4s8oZ98BWmZ08Ia9Nv6377-quCkiI7jOAo35G_qjvUyepxuQooJ1B2wYpN_EHTs4SbPIQG3thJn9zfbm/s640/lambdas+in+JDK6.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpks437MZ-4RadMWTAxmyL_xdmCWXWhuzan7vVXglIJHhDpRsA3Ve_ndnKrduH4s8oZ98BWmZ08Ia9Nv6377-quCkiI7jOAo35G_qjvUyepxuQooJ1B2wYpN_EHTs4SbPIQG3thJn9zfbm/s1600/lambdas+in+JDK6.png)

When I hover the grayed code, real syntax comes up:

[![Lambdas in JDK6 - hover](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhC9OfRbrX86-32fgxqUp4AZw5_81P7lXYFVMOi15h43v55hFFfVUpxY-7glUSsCitFfgUChnATH5ol10auLSX2a4ytIuR78ipvHngr1Ja_9JmvfVZWd3taERR861SWCxQTsLFuQ9CrY9H-/s640/lambdas+in+JDK6+-+hover.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhC9OfRbrX86-32fgxqUp4AZw5_81P7lXYFVMOi15h43v55hFFfVUpxY-7glUSsCitFfgUChnATH5ol10auLSX2a4ytIuR78ipvHngr1Ja_9JmvfVZWd3taERR861SWCxQTsLFuQ9CrY9H-/s1600/lambdas+in+JDK6+-+hover.png)

Pretty cool, huh?

Extremely improves readability, when your anonymous class method's body is just one line return statement. And that's pretty often, when you're e.g. mocking method calls in unit tests.

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/02/want-lambdas-with-jdk6-heres-idea.html)*.
