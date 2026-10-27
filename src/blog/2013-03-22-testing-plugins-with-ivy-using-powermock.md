---
title: Testing plugins with Ivy using Powermock
authors: [js]
tags: [test, plugins, mock, liferay, junit]
---

Recently, [liferay-plugins](https://github.com/liferay/liferay-plugins) SDK (and also its EE version) switched to using Ivy to manage some of the dependencies. Even when there are still static dependencies taken from defined portal -- Ivy dependencies are added to the `lib/ext` and `ROOT/WEB-INF/lib` ones, see [build-common.xml](https://github.com/liferay/liferay-plugins/blob/master/build-common.xml#L25) -- this makes adding dependencies into plugins so much easier and cleaner.

<!-- truncate -->

Since I'm working on some plugins, I wanted to cover the functionality properly using JUnit tests, using [Powermock](https://code.google.com/p/powermock/) and [Mockito](https://code.google.com/p/mockito/). Here are necessary steps to get those libraries on test classpath in plugins SDK:

1. open `./ivy.xml`
2. add following dependencies:

```xml
...
<dependency conf="runtime" name="xml-apis" org="xml-apis" rev="1.4.01" />
<dependency conf="test" name="junit" org="junit" rev="4.11" />
<!-- CUSTOM BEGIN -->
<dependency conf="test" name="mockito-all" org="org.mockito" rev="1.9.5" />
<dependency conf="test" name="powermock-api-mockito" org="org.powermock" rev="1.5" />
<dependency conf="test" name="powermock-api-support" org="org.powermock" rev="1.5" />
<dependency conf="test" name="powermock-core" org="org.powermock" rev="1.5" />
<dependency conf="test" name="powermock-reflect" org="org.powermock" rev="1.5" />
<dependency conf="test" name="powermock-module-junit4" org="org.powermock" rev="1.5" />
<dependency conf="test" name="powermock-module-junit4-common" org="org.powermock" rev="1.5" />
<dependency conf="test" name="javassist" org="javassist" rev="3.12.1.GA"/>
<!-- CUSTOM END -->
...
```

I'm sure there may be more combinations of dependencies, this is the first that fully worked for my basic tests using classes and calls like `@PrepareForTest`, `@RunWith(PowerMockRunner.class)`, `PowerMockito.mock(...)` and `Mockito.*`.

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/03/testing-plugins-with-ivy-using-powermock.html)*.
