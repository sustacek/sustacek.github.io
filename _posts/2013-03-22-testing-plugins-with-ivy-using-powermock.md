---
layout: post
date: '2013-03-22T07:47:00.001-07:00'
description: ''
published: true
slug: 2013-03-testing-plugins-with-ivy-using-powermock
tags:
- test
- plugins
- mock
- liferay
- junit
- legacy-blogger
time_to_read: 5
title: Testing plugins with Ivy using Powermock
---
Recently,&nbsp;<a href="https://github.com/liferay/liferay-plugins">liferay-plugins</a>&nbsp;SDK (and also its EE version) switched to using Ivy to manage some of the dependencies. Even when there are still static dependencies taken from defined portal -- Ivy dependencies are added to the <span style="font-family: Courier New, Courier, monospace;">lib/ext</span> and <span style="font-family: Courier New, Courier, monospace;">ROOT/WEB-INF/lib</span> ones, see <a href="https://github.com/liferay/liferay-plugins/blob/master/build-common.xml#L25">build-common.xml</a>&nbsp;--&nbsp;this makes adding dependencies into plugins so much easier and cleaner.

Since I'm working on some plugins, I wanted to cover the functionality properly using JUnit tests, using &nbsp;<a href="https://code.google.com/p/powermock/">Powermock</a> and <a href="https://code.google.com/p/mockito/">Mockito</a>. Here are necessary steps to get those libraries on test classpath in plugins SDK:<br />
<br />
(1) open <span style="font-family: Courier New, Courier, monospace;">./ivy.xml</span><br />
(2) add following dependencies:<br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">...</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: 'Courier New', Courier, monospace;">&lt;dependency conf="runtime" name="xml-apis" org="xml-apis" rev="1.4.01" /&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;dependency conf="test" name="junit" org="junit" rev="4.11" /&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;!-- CUSTOM BEGIN --&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: 'Courier New', Courier, monospace;">&lt;dependency conf="test" name="mockito-all" org="org.mockito" rev="1.9.5" /&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;dependency conf="test" name="powermock-api-mockito" org="org.powermock" rev="1.5" /&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;dependency conf="test" name="powermock-api-support" org="org.powermock" rev="1.5" /&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;dependency conf="test" name="powermock-core" org="org.powermock" rev="1.5" /&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;dependency conf="test" name="powermock-reflect" org="org.powermock" rev="1.5" /&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;dependency conf="test" name="powermock-module-junit4" org="org.powermock" rev="1.5" /&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;dependency conf="test" name="powermock-module-junit4-common" org="org.powermock" rev="1.5" /&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;dependency conf="test" name="javassist" org="javassist" rev="3.12.1.GA"/&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">&lt;!-- CUSTOM END --&gt;</span><br />
<span class="Apple-tab-span" style="white-space: pre;"> </span><span style="font-family: Courier New, Courier, monospace;">...</span><span class="Apple-tab-span" style="white-space: pre;"> </span><br />
<br />
I'm sure there may be more combinations of dependencies, this is the first that fully worked for my basic tests using classes and calls like&nbsp;<span style="font-family: Courier New, Courier, monospace;">@PrepareForTest</span>,&nbsp;<span style="font-family: Courier New, Courier, monospace;">@RunWith(PowerMockRunner.class)</span>,&nbsp;<span style="font-family: Courier New, Courier, monospace;">PowerMockito.mock(...)</span> and&nbsp;<span style="font-family: Courier New, Courier, monospace;">Mockito.*</span>.

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/03/testing-plugins-with-ivy-using-powermock.html)*.
