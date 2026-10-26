---
slug: cloud-formation-boolean-as-parameter-in
title: Cloud Formation - Boolean as Parameter in template
authors: [js]
tags: [cloudformation, aws]
---

You've most likely noticed, that Cloud Formation does not support any Boolean type for template Parameters (see [AWS docs](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html?shortFooter=true)). You will get:

<!-- truncate -->

```text
Template format error: Unrecognized parameter type: Boolean
```

But many of the resources have `Boolean` parameter, like [AWS::RDS::DBInstance -> MultiAZ](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html?shortFooter=true#cfn-rds-dbinstance-multiaz) or its *StorageEncrypted* property.

Solution? Use following workaround:

* a "yes" / "no" selection *Parameter* with `String` type (or really any two values which make sense to your use case / language),
* a *Condition* (converting `String` to a semi-`Boolean`) and
* in the resource's property, use the intrinsic function `Fn:If` to convert semi-`Boolean` result of the condition into real `Boolean`

Note that you cannot use the *Condition* directly as the property's value, using e.g. "Ref" + its name - you'd get a validation error, even if you defined "DependsOn":

```text
Unresolved resource dependencies [DbRdsMultiAZCondition] in the Resources block of the template
```

See [the following Gist](https://gist.github.com/sustacek/987a85e51387849d7debe676ed7d19ff) showing the relevant parts of the template to implement the solution.

It's long and ugly, but it works :-)

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2016/09/cloud-formation-boolean-as-parameter-in.html)*.

---

## 1 comments captured from [original post](https://josef-sustacek-ee.blogspot.com/2016/09/cloud-formation-boolean-as-parameter-in.html) on Blogger

**pauldevine said on 2017-11-12**

Thanks for this.
