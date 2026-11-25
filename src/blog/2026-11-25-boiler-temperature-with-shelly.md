---
title: Temperature measurement inside OKC boiler -- Shelly pill
authors: [js]
tags: [shelly, victron, boiler]
---

For a long time, I wanted to get have a way to know how hot the water is in our boiler house boiler. To have a rough idea how much energy it can store till it's fully heated, and also how much hot water we have left for the house. Not just analog thermomenter, but get that data out, into our Victron system, HomeAssistant etc. So I started to dig on option how to measure it.

<!-- truncate -->

We have a standard Drazice boiler at home: [OKC NTR/HP 300](https://www.dzd.cz/ohrivace-a-zasobniky-teple-vody/neprimotopne/neprimotopny-zasobnik-okc-ntr-hp). We have 2 heating elements, top one (TJ 6/4 3,75kW) and a bottom one (RDW 18-7,5 kW). We use the bottom one when surplus from solar plant is avaialble and the top one is scheduled, kind of like HDO, but smarter and managed by Shelly relays and some setup in the Shelly app (will create a separate blog for this).

The boiler has 3 measuring points available in the back, one near the top, then one in about 2/3 of the heihgt and a last one at about 1/3. Cold water gets in the bottom and the warm one leaves at the top, so from these 3 reading you can guess from there 3 quite easily. First I thought about [Ruuvi](https://ruuvi.com/ruuvitag-pro/), which Victron integrates with, but these are not really suited to measure temperature inside boilers, just ambient temperature. Then I looked for what Victron has available, but did not succeed there. There are some temperature reading input ready in Cerbo GX itself, also in the MPPTs, but it's all some weird outdated standards, for which I could not find any matching sensors (the wire to go into boiler itself). Folks usually seem to make these themselves using soldering iron and some rubber, not really for me :-)   

Some time ago, Victron [added support](https://www.shelly.com/blogs/documentation/kbuca-victron-energy-venus-os) to discover and integrate with Shelly devices, starting with Venus OS 3.70. I boughts some relays and it works pretty well, assuming both Cerbo GX and the Shelly devices live on the same local subnet.

So I looked what temperature measuring options there are among Shelly devices. First I found the [Shelly Add-on](https://www.shelly.com/products/shelly-plus-add-on), but it seemed clumsy and expensive to me, as I did not need the relay at all here. The the AI bot on there site which I used to explore their products suggested [The Pill](https://www.shelly.com/products/the-pill-by-shelly). That was perfect, power via USB-C (no batteries needed). Coupled with [1 to 5 splitter](https://www.shelly.com/products/splitter-1-to-5-3-5-mm-jack-shelly-pill) and 3 pieces of [Shelly Temp. Sensor DS18B20](https://www.shelly.com/products/temperature-sensor-ds18b20-3-5-mm-jack-1-m-cable), that was all I needed. The temp. sensors fit perfectly into the temperature measuring shafts in the Drazice boiler -- you just unscrew the plastic piece, put the Shelly sensor in and screw back.

The shaft is dry AFAIK, I thought the temp sensor will go into the water a bit, but that's probably not make sense and you'd have to deal with the moisture sealing for the water not to get out. The water pressure can rise up to 6 bar inside the boiler as it's heated, only then the safety valve will start to let some small amount of water out. So the seal would have to be really tight I guess.

Anyway, you have 3 temp sensors in the back of the boiler, just plug them to the splitter, then the splitter to the pill and you're done. Now only the USB-C cable for the pill from some nearby outlet and you can register the pill in Shelly app as any other device.

With Venus OS [v3.90-beta14](https://community.victronenergy.com/t/venus-os-v3-90-beta14-available-for-public-testing/63281#p-227132-change-log-5), the pill is even supported in Victron as any other native temperature sensor. So after you enable the pill's temp readings' channels in "Integrations", the temps are in your Victron system as if read by Victron's native temp sensors. This is big thing, because you get the temps available in:
* Cerbo GX display on main screen -- new Levels tab appears, under Environment you have it nicely rendered
* the readings will also show up in VRM automatically, which is nice

Works reliably so far.
