---
date: '2016-09-15T06:09:00.000-07:00'
description: ''
published: true
slug: 2016-09-cloud-formation-boolean-as-parameter-in
tags:
- http://schemas.google.com/blogger/2008/kind#post
- cloudformation
- aws
- legacy-blogger
time_to_read: 5
title: Cloud Formation - Boolean as Parameter in template
---

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2016/09/cloud-formation-boolean-as-parameter-in.html)*.

You've most likely noticed, that Cloud Formation does not support any Boolean type for template Parameters (see <a href="http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html?shortFooter=true">AWS docs</a>). You will get:<br />
<pre style="background-color: #f7f7f7; border: 1px solid rgb(208, 208, 208); color: #303030; font-size: 11pt; padding: 10px; width: auto !important;"><span style="font-size: 11pt;">Template format error: </span>Unrecognized parameter type: Boolean</pre>
<br />
But many of the resources have <span>Boolean</span> parameter, like <a href="http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html?shortFooter=true#cfn-rds-dbinstance-multiaz">AWS::RDS::DBInstance -&gt; MultiAZ</a> or its&nbsp;<i>StorageEncrypted</i> property.<br />
<br />
Solution? Use following workaround:<br />
<ul>
<li>a "yes" / "no" selection <i>Parameter</i> with&nbsp;<span>String</span>&nbsp;type (or really any two values which make sense to your use case / language),&nbsp;</li>
<li>a <i>Condition</i> (converting <span>String</span> to a semi-<span>Boolean</span>) and&nbsp;</li>
<li>in the resource's property, use the intrinsic function <span>Fn:If</span>&nbsp;to convert semi-<span>Boolean</span>&nbsp;result of the condition into real <span>Boolean</span></li>
</ul>
<span style="font-family: inherit;">Note that you cannot use the <i>Condition</i> directly as the property's value, using e.g. "Ref" +&nbsp;its name&nbsp;- you'd get a validation error, even if you defined "DependsOn":&nbsp;</span><br />
<div>
<pre style="background-color: #f7f7f7; border: 1px solid rgb(208, 208, 208); color: #303030; font-size: 11pt; padding: 10px; width: auto;"><span>Unresolved resource dependencies [DbRdsMultiAZCondition] in the Resources block of the template</span></pre>
<div>
<ul>
</ul>
See following Gist showing the relevant parts of the template to implement the solution:<br />
<br />

It's long and ugly, but it works :-)</div>
</div>

---

## 1 comments captured from [original post](https://josef-sustacek-ee.blogspot.com/2016/09/cloud-formation-boolean-as-parameter-in.html) on Blogger

**pauldevine said on 2017-11-12**

Thanks for this.

