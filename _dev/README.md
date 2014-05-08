DooMLauncher
============
DooMLauncher is a lightweight, unobtrusive application for playing custom DooM engine WADs.

*Why another FrontLoader?* You ask? Well, I simply wanted my own frontloader for DooM. There's nothing special about this one over the others on the market - the entire point of this is to make playing custom WADs quick and easy without having to deal with changing multiple select menus (like a traditional frontloader), navigating to your source port folder and dragging and dropping wads onto the exe, or creating a bat file for each of your custom WADs. Also, I just simply needed something to do. 

### What You Should Know
As mentioned in the first paragraph of this readme, this program is currently in a prototype state. It works flawlessly for me, but that's because it's handcoded to my system and environment - so if you download it and compile it yourself - your results will vary (most likely fail).

Should you decide to download it right now, here's what you should know. 

1. This application currently does not support HERETIC, HEXEN, STRIFE, CHEXQUEST, or HACX - if I missed any other DooM engine games in that list - they aren't supported either. I obviously plan on implementing support for those as well at a later date. 
2. The way this works at the moment requires you to edit your WADs names. That's how it knows which -IWAD to include on start-up. So all you have to do is prepend your DooM1 WADs with d1_ and your DooMII WADs with d2_. No real further adjustment is required, and this is something I might keep in the final process. Though a stretch goal is to include an import function that will automatically rename the file for you.
3. The coding sucks. I know. No excuses. Another reason I'm doing this is to get further into JavaScript development. 
4. This is being developed on Windows 8.1, and all Windows platforms should be supported. Linux/OSx is another stretch goal.
 
