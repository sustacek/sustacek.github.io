---
title: Creating unit tests in core Liferay sources
authors: [js]
tags: [test, development, mock, liferay, java, junit]
---

Liferay has been catching up lately on the tests coverage. Many improvements have been made in the trunk located in [liferay-portal / master branch on GitHub](https://github.com/liferay/liferay-portal) and since I've been fixing some things recently, I've included unit test for the changed class as well.

Quick start how-to:

1. read [Liferay testing documentation](http://www.liferay.com/community/wiki/-/wiki/Main/Liferay+Testing+Infrastructure) to get the basic picture,
2. create your unit test in `portal-impl/test/unit/.../<your_class>Test.java`,
3. create test methods as usual with JUnit 4.x,
4. run the test and see results:
    * `cd portal-impl`,
    * `ant test-class -Dclass=CustomJspRegistryImplTest`,
    * note that only the name of the class is used, not the full name including package.

Testing just a single class at a time seems to be necessary, executing `ant test-unit` to run all existing unit tests seems to be time consuming (from minutes to tens of minutes).

<!-- truncate -->

For simple tests and classes, you'll be just fine with just instantiating your tested class, calling the method and verifying the returned result:

```java
public class CustomJspRegistryImplTest {

    @Test
    public void testGetCustomJspFileName_noExtension() {

        Assert.assertEquals(
            "/some/absolute/non_extension_page.test-context",
            _customJspRegistry.getCustomJspFileName(
                "test-context", "/some/absolute/non_extension_page"));
    }

    private CustomJspRegistryImpl _customJspRegistry =
        new CustomJspRegistryImpl();

}
```

But what if code inside `getCustomJspFileName()` calls some other methods, how to ensure we're not testing their implementation instead of ours? The answer is a technique extensively used in software development: *mocking*.

[Wiki link above](http://www.liferay.com/community/wiki/-/wiki/Main/Liferay+Testing+Infrastructure#section-Liferay+Testing+Infrastructure-Unit+test+with+external+dependencies) contains some basic examples of static methods' mocking. When you need to mock some instance method's call, you can use either:

1. already, fully mocked classes from libraries like `spring-test`, available in Liferay out of the box. Examples could be `MockServletContext` or `MockHttpServletRequest`, allowing you to tailor the objects as you need.
2. use PowerMock and Mockito libraries to mock individual calls on any class objects:

```java
private HttpServletRequest _getRequestWithApplicatoinAdapter(
    String adapterServletContextName) {

    MockHttpServletRequest request = new MockHttpServletRequest();

    ThemeDisplay spyThemeDisplay = spy(new ThemeDisplay());

    request.setAttribute(WebKeys.THEME_DISPLAY, spyThemeDisplay);

    Group spyScopeGroup = spy(new GroupImpl());

    UnicodeProperties spyProps = spy(new UnicodeProperties());

    doReturn(spyScopeGroup).when(spyThemeDisplay).getScopeGroup();
    doReturn(spyProps).when(spyScopeGroup).getTypeSettingsProperties();
    doReturn(adapterServletContextName).when(spyProps).getProperty(
        "customJspServletContextName");

    return request;
}
```

As you can see, we need to provide particular `typeSetting` in scope group of given HTTP request. Every time we want to mock an object's method call, we need to do two things:

1. get instrumented version of the object:
    * `ThemeDisplay spyThemeDisplay = spy(new ThemeDisplay());`
2. say which methods we want to mock and how:
    * `doReturn(spyScopeGroup).when(spyThemeDisplay).getScopeGroup();`
    * this line could be read as:
        * whenever method `getScopeGroup()` is being called on our instrumented object (`spyThemeDisplay)`, we'll get object `spyScopeGroup`
        * returned object `spyScopeGroup` could be (and in our example is) further mocked as well.

[Powermock documentation](http://code.google.com/p/powermock/wiki/MockitoUsage13) contains a ton of useful examples and provides a very god entry point. Complete source of the test class I've used in this post could be found on [Github](https://github.com/sustacek/liferay-portal/blob/LPS-30219/portal-impl/test/unit/com/liferay/portal/util/CustomJspRegistryImplTest.java).

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/02/creating-unit-tests-in-core-liferay.html)*.
