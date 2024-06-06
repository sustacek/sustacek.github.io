---
date: '2013-01-10T12:13:00.001-08:00'
description: ''
published: true
slug: 2013-01-opends-testing-ldap-server
tags:
- http://schemas.google.com/blogger/2008/kind#post
- ldap
- development
- java
- legacy-blogger
time_to_read: 5
title: OpenDS -- testing LDAP server
---

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/01/opends-testing-ldap-server.html)*.

Since LDAP integration is part of most modern servers and Liferay also supports this directory service protocol, development on local machine gives us the challenge of testing the integration, without installing (or using remote) full-blown LDAP server. Since I've been implementing some LDAP classes changes recently and had to test them manually, I was looking around what could I use easily use for this purpose.<br />
<br />
I was on Windows that time, but using Ubuntu simultaneously when possible, so the tool would ideally be available on both operating systems. Among other requirements, I wanted the obvious:<br />
<ol>
<li>easy and quick installation,</li>
<li>quick startup with small footprint on computer's performance,</li>
<li>sample data (users) generation,</li>
<li>free of at low cost.</li>
</ol>
<div>
After some googling, I came across <a href="http://opends.java.net/">OpenDS</a>, which seemed to fullfil all my requirements. It's written in &nbsp;Java, does not require OS installation (just unzipping) and initial server setup is quick and easy.</div>
<div>
<br /></div>
<div>
Zipped package contains <span style="font-family: Courier New, Courier, monospace;">setup</span> and <span style="font-family: Courier New, Courier, monospace;">setup.bat</span>, launching GUI setup tool. You can create default LDAP structure (with sample data, if you wish) and within 2 minutes, you have LDAP server up and running, ready to be accessed by your LDAP clients.&nbsp;OpenDS contains also simple&nbsp;GUI&nbsp;browser, allowing inline modifications to entries.</div>
<div>
<br /></div>
<div>
I can only recommend.</div>