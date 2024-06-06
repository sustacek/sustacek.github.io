---
date: '2013-02-05T14:49:00.001-08:00'
description: ''
published: true
slug: 2013-02-creating-unit-tests-in-core-liferay
tags:
- http://schemas.google.com/blogger/2008/kind#post
- test
- development
- mock
- liferay
- java
- junit
- legacy-blogger
time_to_read: 5
title: Creating unit tests in core Liferay sources
---

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/02/creating-unit-tests-in-core-liferay.html)*.

Liferay has been catching up lately on the tests coverage. Many improvements have been made in the trunk located in <a href="https://github.com/liferay/liferay-portal">liferay-portal / master branch on GitHub</a> and since I've been fixing some things recently, I've included unit test for the changed class as well.<br />
<br />
Quick start how-to:<br />
<ol>
<li>read&nbsp;<a href="http://www.liferay.com/community/wiki/-/wiki/Main/Liferay+Testing+Infrastructure">Liferay testing documentation</a>&nbsp;to get the basic picture,</li>
<li>create your unit test in <span style="font-family: Courier New, Courier, monospace;">portal-impl/test/unit/.../&lt;your_class&gt;Test.java</span><span style="font-family: Arial, Helvetica, sans-serif;">,</span></li>
<li>create test methods as usual with JUnit 4.x,</li>
<li>run the test and see results:</li>
</ol>
<ul><ul>
<li><span style="font-family: Courier New, Courier, monospace;">cd portal-impl</span><span style="font-family: Arial, Helvetica, sans-serif;">,</span></li>
<li><span style="font-family: Courier New, Courier, monospace;">ant test-class -Dclass=CustomJspRegistryImplTest</span><span style="font-family: Arial, Helvetica, sans-serif;">,</span></li>
<li>note that only the name of the class is used, not the full name including package.</li>
</ul>
</ul>
Testing just a single class at a time seems to be necessary, executing&nbsp;<span style="font-family: Courier New, Courier, monospace;">ant test-unit</span>&nbsp;to run all existing unit tests seems to be time consuming (from minutes to tens of minutes).<br />
<div>
<br />
<ul>
</ul>
<div>
<a name="more"></a></div>
<div>
For simple tests and classes, you'll be just fine with just instantiating your tested class, calling the method and verifying the returned result:</div>
<div>
<br /></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">public class CustomJspRegistryImplTest {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">  </span>@Test</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">  </span>public void testGetCustomJspFileName_noExtension() {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">    </span>Assert.assertEquals(</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">   &nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">"/some/absolute/non_extension_page.test-context",</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">    </span>_customJspRegistry.getCustomJspFileName(</span></div>
<div>
<span style="font-family: 'Courier New', Courier, monospace; white-space: pre;"> &nbsp;</span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;"> &nbsp;</span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">"test-context", "/some/absolute/non_extension_page"));</span><br />
<span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">}</span></div>
</div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">&nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;"> </span><span style="font-family: 'Courier New', Courier, monospace;">private CustomJspRegistryImpl _customJspRegistry =</span></div>
<div>
<span style="font-family: 'Courier New', Courier, monospace; white-space: pre;"> &nbsp;</span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">new CustomJspRegistryImpl();</span></div>
</div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">}</span></div>
<div>
<br /></div>
<div>
But what if code inside&nbsp;<span style="font-family: Courier New, Courier, monospace;">getCustomJspFileName()</span> calls some other methods, how to ensure we're not testing their implementation instead of ours? The answer is a technique extensively used in software development:&nbsp;<i>mocking</i>.&nbsp;</div>
<div>
<br /></div>
<div>
<a href="http://www.liferay.com/community/wiki/-/wiki/Main/Liferay+Testing+Infrastructure#section-Liferay+Testing+Infrastructure-Unit+test+with+external+dependencies">Wiki link above</a> contains some basic examples of static methods' mocking. When you need to mock some instance method's call, you can use either:</div>
<div>
<ol>
<li>already, fully mocked classes from libraries like&nbsp;<span style="font-family: Courier New, Courier, monospace;">spring-test</span>, available in Liferay out of the box. Examples could be <span style="font-family: Courier New, Courier, monospace;">MockServletContext</span> or&nbsp;<span style="font-family: Courier New, Courier, monospace;">MockHttpServletRequest</span>, allowing you to tailor the objects as you need.</li>
<li>use PowerMock and Mockito libraries to mock individual calls on any class objects:</li>
</ol>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span style="white-space: pre;">&nbsp; </span>private HttpServletRequest _getRequestWithApplicatoinAdapter(</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">&nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">&nbsp;</span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">String adapterServletContextName) {</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">&nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">   </span><span style="font-family: 'Courier New', Courier, monospace;">MockHttpServletRequest request = new MockHttpServletRequest();</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">&nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">   </span><span style="font-family: 'Courier New', Courier, monospace;">ThemeDisplay spyThemeDisplay = spy(new ThemeDisplay());</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;">    </span>request.setAttribute(WebKeys.THEME_DISPLAY, spyThemeDisplay);</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;"> &nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">Group spyScopeGroup = spy(new GroupImpl());</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;"> &nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">UnicodeProperties spyProps = spy(new UnicodeProperties());</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;"> &nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">doReturn(spyScopeGroup).when(spyThemeDisplay).getScopeGroup();</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;"> &nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">doReturn(spyProps).when(spyScopeGroup).getTypeSettingsProperties();</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;"> &nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">doReturn(adapterServletContextName).when(spyProps).getProperty(</span><br />
<span style="font-family: 'Courier New', Courier, monospace; white-space: pre;"> &nbsp;</span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;"> &nbsp;</span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">"customJspServletContextName");</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span class="Apple-tab-span" style="white-space: pre;"> &nbsp;</span></span><span style="font-family: 'Courier New', Courier, monospace; white-space: pre;">  </span><span style="font-family: 'Courier New', Courier, monospace;">return request;</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><span style="white-space: pre;">&nbsp; </span>}</span></div>
</div>
</div>
<div>
<br /></div>
<div>
As you can see, we need to provide particular <span style="font-family: Courier New, Courier, monospace;">typeSetting</span> in scope group of given HTTP request. Every time we want to mock an object's method call, we need to do two things:</div>
<div>
<ol>
<li>get instrumented version of the object:</li>
<ul>
<li><span style="font-family: 'Courier New', Courier, monospace;">ThemeDisplay spyThemeDisplay = spy(new ThemeDisplay());</span></li>
</ul>
<li>say which methods we want to mock and how:</li>
<ul>
<li><span style="font-family: 'Courier New', Courier, monospace;">doReturn(spyScopeGroup).when(spyThemeDisplay).getScopeGroup();</span></li>
<li><span style="font-family: Arial, Helvetica, sans-serif;">this line could be read as:&nbsp;</span></li>
<ul>
<li><span style="font-family: Arial, Helvetica, sans-serif;">whenever method&nbsp;</span><span style="font-family: 'Courier New', Courier, monospace;">getScopeGroup()</span><span style="font-family: Arial, Helvetica, sans-serif;">&nbsp;is being called on our instrumented object (</span><span style="font-family: 'Courier New', Courier, monospace;">spyThemeDisplay)</span><span style="font-family: Arial, Helvetica, sans-serif;">,&nbsp;&nbsp;we'll get object&nbsp;</span><span style="font-family: 'Courier New', Courier, monospace;">spyScopeGroup</span></li>
<li><span style="font-family: Arial, Helvetica, sans-serif;">returned object&nbsp;<span style="font-family: 'Courier New', Courier, monospace;">spyScopeGroup</span>&nbsp;could be (and in our example is) further mocked as well.</span></li>
</ul>
</ul>
</ol>
<span style="font-family: Arial, Helvetica, sans-serif;"><a href="http://code.google.com/p/powermock/wiki/MockitoUsage13">Powermock documentation</a> contains a ton of useful examples and provides a very god entry point.&nbsp;</span><span style="font-family: Arial, Helvetica, sans-serif;">Complete source of the test class I've used in this post could be found on&nbsp;</span><a href="https://github.com/sustacek/liferay-portal/blob/LPS-30219/portal-impl/test/unit/com/liferay/portal/util/CustomJspRegistryImplTest.java" style="font-family: Arial, Helvetica, sans-serif;">Github</a><span style="font-family: Arial, Helvetica, sans-serif;">.&nbsp;</span></div>
</div>