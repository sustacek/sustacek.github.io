---
title: Temperature inside boiler - Shelly Pill
authors: [js]
tags: [shelly, victron, boiler]
gallery:
  - src: /img/posts/2026-11-25-boiler-temperature/temps%20-%20cerbogx.png
    alt: Temperature readings on the Cerbo GX display
  - src: /img/posts/2026-11-25-boiler-temperature/temps%20-%20vrm.png
    alt: Temperature readings in Victron Remote Management
---

For a long time, I wanted a way to know how hot the water is in our boiler house boiler. I wanted to estimate how much energy it could store when fully heated, and how much hot water remained for the house. I wanted more than an analog thermometer: I wanted the data in our Victron system, Home Assistant, and elsewhere. So I started looking for a way to measure it.

<!-- truncate -->

We have a standard Drazice boiler at home: [OKC NTR/HP 300](https://www.dzd.cz/ohrivace-a-zasobniky-teple-vody/neprimotopne/neprimotopny-zasobnik-okc-ntr-hp). We have two heating elements: the top one ([TJ 6/4 3.75 kW](https://www.dzd.cz/drazice-tj-3-75kw)) and a bottom one (RDW 18-7.5 kW). We use the bottom element when surplus solar power is available, and the top element is scheduled, rather like HDO, but smarter and managed with Shelly relays and setup in the Shelly app. I will create a separate blog post about this.

The boiler has three measuring points on the back: one near the top, one around two-thirds of the height, and one around one-third. Cold water enters at the bottom and warm water leaves at the top, so these three readings provide a fairly easy estimate. I first considered [Ruuvi](https://ruuvi.com/ruuvitag-pro/), which Victron integrates with, but Ruuvi tags are more suitable for ambient measurements than for measuring inside boilers. I then looked at the temperature options Victron provides but did not find a suitable solution. The Cerbo GX and MPPT devices have temperature inputs, but they use older standards for which I could not find matching sensors with cables suitable for the boiler. People usually seem to make these themselves with a soldering iron and rubber; that was not for me :-)

Some time ago, Victron [added support](https://www.shelly.com/blogs/documentation/kbuca-victron-energy-venus-os) for discovering and integrating Shelly devices, starting with Venus OS 3.70. I bought several relays, and it works fairly well, provided that both the Cerbo GX and the Shelly devices are on the same local subnet.

I looked at the temperature-measuring options among Shelly devices. I first found the [Shelly Add-on](https://www.shelly.com/products/shelly-plus-add-on), but it seemed too clumsy and expensive because I did not need a relay. Then the AI assistant on the Shelly website suggested [the Pill](https://www.shelly.com/products/the-pill-by-shelly). It was perfect: it is powered via USB-C and needs no batteries. Combined with a [1-to-5 splitter](https://www.shelly.com/products/splitter-1-to-5-3-5-mm-jack-shelly-pill) and three [Shelly temperature sensors DS18B20](https://www.shelly.com/products/temperature-sensor-ds18b20-3-5-mm-jack-1-m-cable), it was all I needed. The temperature sensors fit perfectly into the measuring shafts on the Drazice boiler: simply unscrew the plastic cover, insert the Shelly sensor, and screw the cover back on.

As far as I know, the shafts are dry. I thought the temperature sensor would extend slightly into the water, but that probably does not make sense, because it would require a moisture seal to prevent water from escaping. The water pressure inside the boiler can rise to 6 bar as it is heated, at which point the safety valve starts to release a small amount of water. The seal would therefore need to be very tight, I imagine.

Anyway, you have three temperature sensors on the back of the boiler. Just plug them into the splitter, plug the splitter into the Pill, and you are done. The only remaining cable is the USB-C cable for the Pill. Connect it to a nearby outlet and register the Pill in the Shelly app like any other device.

With Venus OS [v3.90-beta14](https://community.victronenergy.com/t/venus-os-v3-90-beta14-available-for-public-testing/63281#p-227132-change-log-5), the Pill is supported in Victron like any other native temperature sensor. After enabling the Pill's temperature channels in **Integrations**, the temperatures appear in your Victron system as if they were read by Victron's native temperature sensors. This is significant because the temperatures become available in:

* the Cerbo GX display, on the main screen -- a new Levels tab appears under Environment and renders them nicely;
* VRM, where the readings also appear automatically.

So far, it has worked reliably.
