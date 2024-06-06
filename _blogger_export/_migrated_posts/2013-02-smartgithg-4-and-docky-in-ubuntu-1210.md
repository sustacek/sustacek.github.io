---
date: '2013-02-12T12:37:00.002-08:00'
description: ''
published: true
slug: 2013-02-smartgithg-4-and-docky-in-ubuntu-1210
tags:
- ubuntu
- http://schemas.google.com/blogger/2008/kind#post
- linux
- docky
- smartgithg
- java
- legacy-blogger
time_to_read: 5
title: SmartGit/Hg 4 and Docky in Ubuntu 12.10
---

*This was originally posted on blogger [here](https://josef-sustacek-ee.blogspot.com/2013/02/smartgithg-4-and-docky-in-ubuntu-1210.html)*.

Since the first time I started to use Ubuntu as a primary operating system on my work laptop, I liked the possibility of endless customization possibilities I could make in the OS to have the UI match my preferences. Although I trust UX engineers from&nbsp;Canonical&nbsp;to do the work for me in most cases, sometimes you like to use few things differently or simply try new cool widget in your day to day work. <br />
<br />
One major customization that I've started to use is <i>dock</i> at the bottom or the screen. It keeps my most-used applications and aggregates their windows (when they are running). This functionality is of course inspired by great dock present in OS X systems.<br />
<br />
I've used <a href="https://launchpad.net/awn/">AWN</a> in previous versions of Ubuntu, quite happily except few quirks, but in my newest 12.10 release, I've switched to <a href="http://www.go-docky.com/">Docky</a>.&nbsp;I came across it on some Internet forum where I was&nbsp;looking for solutions to my issues with AWN in freshly installed system.<br />
<br />
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody>
<tr><td><a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiegX0yPeDg-oBZB8l2Egnr0KceG4utjrB0VcpDkFT82SZ-azxJlRNp5ylQ_pGZrqys93uqkkYDlXmf78M8anE_qFDI_epmEM-I8OksW6obwdHCZCdjLV0Nrg3STAA72LMV975gQM7Z3xjF/s1600/docky.png" style="margin-left: auto; margin-right: auto;"><img border="0" height="60" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiegX0yPeDg-oBZB8l2Egnr0KceG4utjrB0VcpDkFT82SZ-azxJlRNp5ylQ_pGZrqys93uqkkYDlXmf78M8anE_qFDI_epmEM-I8OksW6obwdHCZCdjLV0Nrg3STAA72LMV975gQM7Z3xjF/s320/docky.png" width="320" /></a></td></tr>
<tr><td class="tr-caption" style="font-size: 13px;">Docky bar at the bottom of the screen</td></tr>
</tbody></table>
<br />
<a name="more"></a>Docky seems much simpler, robust and reliable so far. Everything works pretty much out of the box, my dock contains 5 static launchers right now (Skype, Google Chrome, Firefox, Last.fm, IntelliJ IDEA and SmartGit/Hg) and then some&nbsp;utilities&nbsp;offered by Docky.<br />
<br />
Regular applications, where binary executable file is used to launch and run the program, are usually working without any issues in Docky, However, some special applications, script- or Java-based, may have problems with dock. In my case, this happened with newest <a href="http://www.syntevo.com/smartgithg/index.html">SmartGit/Hg 4</a>. While I was able to pin it into launcher (SmartGit/Hg's distribution for Linux contains shell script to generate the *.desktop launcher file), I had problem with duplicate icon in the dock, once program was launched. Docky did not recognize the application's windows and thus was considering it to be a separate application then the pinned icon.<br />
<br />
Problem is the way in which Docky is able to match the launchers (pinned icons) to actual application's windows. Docky's options are sometimes limited, in case of SmartGit/Hg 4, the Ubuntu launcher runs a shell script <span style="font-family: Courier New, Courier, monospace;">...smartgithg-4_0_1/bin/smartgithg.sh</span>, which then starts a JVM which as an OS process looks like <span style="font-family: Courier New, Courier, monospace;">java -D ... -jar ...bootloader.jar</span>. Moreover, the title of the window is not static, SmartGit/Hg places the name of project into it. So Docky has obviously problem to match new OS process to the icon in dock.<br />
<br />
After a while, I was able to get the solution: use <i>StartupWMClass</i> hint in the launcher file, to help Docky identify the application's window. I found the hint in <a href="https://bugs.launchpad.net/docky/+bug/484610">Docky's bugtracker pages</a>. Necessary steps:<br />
<br />
<ol>
<li>find out the value for&nbsp;<i>StartupWMClass</i>:</li>
<ol>
<li>start SmartGit/Hg 4,</li>
<li>start terminal, run <span style="font-family: Courier New, Courier, monospace;">xprops,</span></li>
<li>with cursor (changed to cross by <span style="font-family: Courier New, Courier, monospace;">xprops</span> command) click on title of the SmartGit/Hg main window,</li>
<li>look into terminal, xprops finished, dumping a lot of information. The one we're looking for is at the bottom:</li>
<ul>
<li></li>
<li><span style="font-family: Courier New, Courier, monospace;">...</span></li>
<li><span style="font-family: Courier New, Courier, monospace;">ET_WM_SYNC_REQUEST</span></li>
<li><b><span style="font-family: Courier New, Courier, monospace;">WM_CLASS(STRING) = "SmartGit/Hg", "SmartGit/Hg"</span></b></li>
<li><span style="font-family: Courier New, Courier, monospace;">WM_ICON_NAME(STRING) = "Liferay - SmartGit/Hg 4.0.1 "</span></li>
<li><span style="font-family: 'Courier New', Courier, monospace;">...</span></li>
</ul>
</ol>
<li><span style="font-family: inherit;">open </span><span style="font-family: Courier New, Courier, monospace;">~/.local/share/applications/syntevo-smartgithg.desktop</span> -- the default launcher file for SmartGit/Hg 4,</li>
<li>add following line to the file:</li>
<ol>
<li><span style="font-family: Courier New, Courier, monospace;">StartupWMClass=SmartGit/Hg</span></li>
</ol>
</ol>
<br />
Then Docky will be able to match your SmartGit/Hg windows to pinned icon and you won't see double icon in dock any more.<br />
<br />
While looking at <span style="font-family: Courier New, Courier, monospace;">jetbrains-idea.desktop</span> launcher file for IntelliJ IDEA, I've noticed it uses the same approach and I've never had a problem with it in Docky, so I assume this approach may be reliable in a longer run.<br />
<br />
Btw.&nbsp;<a href="http://www.ubuntugeek.com/menulibre-menu-editor-for-gnome-and-unity.html">MenuLibre</a> has been very useful to manage all the launchers in Ubuntu. With Unity, the old-fashioned application's categories are not present in the UI any more. If allows you to change the *.desktop files manually in built-in editor or use GUI to form the file content's for you (selecting the executable file and icon using pop-up dialog etc.)