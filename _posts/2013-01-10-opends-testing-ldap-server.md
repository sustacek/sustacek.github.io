---
layout: post
date: '2013-01-10T12:13:00.001-08:00'
description: ''
published: true
slug: 2013-01-opends-testing-ldap-server
tags:
- ldap
- development
- java
- legacy-blogger
time_to_read: 5
title: OpenDS -- testing LDAP server
---
Since LDAP integration is part of most modern servers and Liferay also supports this directory service protocol, development on local machine gives us the challenge of testing the integration, without installing (or using remote) full-blown LDAP server. Since I've been implementing some LDAP classes changes recently and had to test them manually, I was looking around what could I use easily use for this purpose.

I was on Windows that time, but using Ubuntu simultaneously when possible, so the tool would ideally be available on both operating systems. Among other requirements, I wanted the obvious:

 1.   easy and quick installation,
 2.   quick startup with small footprint on computer's performance,
 3.   sample data (users) generation,
 4.   free of at low cost.

After some googling, I came across [OpenDS][opends], which seemed to fullfil all my requirements. It's written in  Java, does not require OS installation (just unzipping) and initial server setup is quick and easy.

Zipped package contains setup and setup.bat, launching GUI setup tool. You can create default LDAP structure (with sample data, if you wish) and within 2 minutes, you have LDAP server up and running, ready to be accessed by your LDAP clients. OpenDS contains also simple GUI browser, allowing inline modifications to entries.

I can only recommend.

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/01/opends-testing-ldap-server.html)*.

[opends]: https://www.oracle.com/technical-resources/articles/opends.html "OpenDS"