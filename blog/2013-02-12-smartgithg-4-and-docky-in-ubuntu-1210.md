---
slug: smartgithg-4-and-docky-in-ubuntu-1210
title: SmartGit/Hg 4 and Docky in Ubuntu 12.10
authors: [js]
tags: [ubuntu, linux, docky, smartgithg, java]
---

Since the first time I started to use Ubuntu as a primary operating system on my work laptop, I liked the possibility of endless customization possibilities I could make in the OS to have the UI match my preferences. Although I trust UX engineers from Canonical to do the work for me in most cases, sometimes you like to use few things differently or simply try new cool widget in your day to day work.

One major customization that I've started to use is *dock* at the bottom or the screen. It keeps my most-used applications and aggregates their windows (when they are running). This functionality is of course inspired by great dock present in OS X systems.

I've used [AWN](https://launchpad.net/awn/) in previous versions of Ubuntu, quite happily except few quirks, but in my newest 12.10 release, I've switched to [Docky](http://www.go-docky.com/). I came across it on some Internet forum where I was looking for solutions to my issues with AWN in freshly installed system.

[![Docky bar at the bottom of the screen](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiegX0yPeDg-oBZB8l2Egnr0KceG4utjrB0VcpDkFT82SZ-azxJlRNp5ylQ_pGZrqys93uqkkYDlXmf78M8anE_qFDI_epmEM-I8OksW6obwdHCZCdjLV0Nrg3STAA72LMV975gQM7Z3xjF/s320/docky.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiegX0yPeDg-oBZB8l2Egnr0KceG4utjrB0VcpDkFT82SZ-azxJlRNp5ylQ_pGZrqys93uqkkYDlXmf78M8anE_qFDI_epmEM-I8OksW6obwdHCZCdjLV0Nrg3STAA72LMV975gQM7Z3xjF/s1600/docky.png)

*Docky bar at the bottom of the screen*

<!-- truncate -->

Docky seems much simpler, robust and reliable so far. Everything works pretty much out of the box, my dock contains 5 static launchers right now (Skype, Google Chrome, Firefox, Last.fm, IntelliJ IDEA and SmartGit/Hg) and then some utilities offered by Docky.

Regular applications, where binary executable file is used to launch and run the program, are usually working without any issues in Docky, However, some special applications, script- or Java-based, may have problems with dock. In my case, this happened with newest [SmartGit/Hg 4](http://www.syntevo.com/smartgithg/index.html). While I was able to pin it into launcher (SmartGit/Hg's distribution for Linux contains shell script to generate the `*.desktop` launcher file), I had problem with duplicate icon in the dock, once program was launched. Docky did not recognize the application's windows and thus was considering it to be a separate application then the pinned icon.

Problem is the way in which Docky is able to match the launchers (pinned icons) to actual application's windows. Docky's options are sometimes limited, in case of SmartGit/Hg 4, the Ubuntu launcher runs a shell script `...smartgithg-4_0_1/bin/smartgithg.sh`, which then starts a JVM which as an OS process looks like `java -D ... -jar ...bootloader.jar`. Moreover, the title of the window is not static, SmartGit/Hg places the name of project into it. So Docky has obviously problem to match new OS process to the icon in dock.

After a while, I was able to get the solution: use *StartupWMClass* hint in the launcher file, to help Docky identify the application's window. I found the hint in [Docky's bugtracker pages](https://bugs.launchpad.net/docky/+bug/484610). Necessary steps:

1. find out the value for *StartupWMClass*:
    1. start SmartGit/Hg 4,
    2. start terminal, run `xprops`,
    3. with cursor (changed to cross by `xprops` command) click on title of the SmartGit/Hg main window,
    4. look into terminal, xprops finished, dumping a lot of information. The one we're looking for is at the bottom:

       ```text
       ...
       ET_WM_SYNC_REQUEST
       WM_CLASS(STRING) = "SmartGit/Hg", "SmartGit/Hg"
       WM_ICON_NAME(STRING) = "Liferay - SmartGit/Hg 4.0.1 "
       ...
       ```

2. open `~/.local/share/applications/syntevo-smartgithg.desktop` -- the default launcher file for SmartGit/Hg 4,
3. add following line to the file:

    ```properties
    StartupWMClass=SmartGit/Hg
    ```

Then Docky will be able to match your SmartGit/Hg windows to pinned icon and you won't see double icon in dock any more.

While looking at `jetbrains-idea.desktop` launcher file for IntelliJ IDEA, I've noticed it uses the same approach and I've never had a problem with it in Docky, so I assume this approach may be reliable in a longer run.

Btw. [MenuLibre](http://www.ubuntugeek.com/menulibre-menu-editor-for-gnome-and-unity.html) has been very useful to manage all the launchers in Ubuntu. With Unity, the old-fashioned application's categories are not present in the UI any more. If allows you to change the `*.desktop` files manually in built-in editor or use GUI to form the file content's for you (selecting the executable file and icon using pop-up dialog etc.)

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/02/smartgithg-4-and-docky-in-ubuntu-1210.html)*.
