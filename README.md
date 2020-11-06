# Disfigure

Disfigure (DIStraction-Free Interface by Great-but-Ugly Removal of Elements),
by temporarily removing undesirable parts of a website,
makes it possible to enjoy a stripped-down version of the site.
The removal is temporary in the sense that
a tab reload or a refresh will bring back the removed parts.
But the parts are not just hidden.
So, the reload/refresh is actually necessary.

A great use of Disfigure is
(in fact, the reason behind its development has been)
to chat on any Facebook page (except "facebook.com/messages/...")
using the chat tabs (the ones that open up from bottom right)
without the distraction of notifications popping up every few seconds.
Another one is being able to watch videos on YouTube without
annoying pop-ups, comments, video suggestions, even the current playlist!

_**Note:**
Disfigure was intended for desktop users.
So, it may not be mobile-friendly._

### Warning

- Removal of parts is irreversible without a tab reload/refresh.

- Disfigure removes without being nice about it.
So, related features may malfunction.

- This was created and tested using
Mozilla Firefox 76.0.1 (64-bit),
and Google Chrome 83.0.4103.61 (64-bit).
There may be discrepancies in case of other browsers 
or other versions of the same browser(s).

### Why Use It

Using a website does not mean you have to make use of every feature all the time.
Chatting on Facebook (using the webpage, not via Messenger)
can be interrupted by continuous pop-up notifications.
Or quietly watching a YouTube video can be ruined
by a persistent reminder about some new policy (not that those should be ignored)
or a feedback form demanding to know how your day is going.

Since reloading is just a button away,
you will find that
removing some parts of the page to do get some peace for a while
actually is not a bad idea.

### Feature

The sole feature makes it possible
to select and remove predefined parts of a few particular websites:

- Facebook options:

  1. **Notification card:**
Pops up from bottom left.
Corresponding notifications are considered seen/checked if hovered.

  2. **Search box:**
Top-bar search box.

  3. **Tob-bar logo**

  4. **Tob-bar**

  5. **Tob-bar others**

  6. **Page background:**
Distracting details in case of the "Chatty" preset.
Could be page's main content!
Use this cautiously.

- Facebook preset:

  - **Sneaky:**
Combines options 1–6.

- YouTube options:

  1. **Policy review:**
Displayed if some update in the policy has not been checked out by the user yet.
Appears above even the topbar.

  2. **Top-bar**

  3. **Pop-up:**
May or may not appear,
asking for user experience feedback,
or advertising YouTube TV or YouTube Premium.

  4. **Video suggestions**
Includes the "up next" video, and the auto-play button.

  5. **Comments**

  6. **Current playlist:**
Shows up if current video is part of a playlist.

  7. **Live chat:**
Chat section for live videos.

  8. **Video & page titles:**
Tab name (the value of the &laquo;title&raquo; tag); video name and date; numbers of views, likes, and dislikes, etc.

  9. **Video details**
Uploader name, subscribe button, video description, and other details.

  10. **Video overlay ad:**
Advertisements that appear over the video.

  11. **Extra tags in `<head>`:**
HTML tags inside `<head>` that are not visually essential for watching a video.

  12. **Extra tags in `<body>`:**
HTML tags inside `<body>` that are not visually essential for watching a video.

- YouTube presets:

  - **Cozy:**
Combines options 1–7, 9, 10.

  - **Sneaky:**
Option 8.

  - **Stingy:**
Options 11 and 12.

- For Google Translate,
just the pop-up about upcoming changes is directly removed.

### How to Use It

To use the bookmarklet file ("`disfigure.txt`"),
just add its content as a bookmarklet to your browser.

If you want to make a bookmarklet yourself,
see instructions
[somewhere below](#how-do-i-make-a-bookmarklet).

#### Adding a bookmarklet to browser

1. Create a new bookmark in your browser.

2. Copy and paste the content of "`disfigure.txt`"
in the "Location" (for Mozilla Firefox)
or the "URL" (for Google Chrome) field.

You are expected to use "Disfigure" as the bookmarklet name.

#### Using Disfigure

1. Activate Disfigure.
The pop-up will appear.

2. Select your options and/or presets.

3. Click on the "Done" button.

Selected parts of the page will disappear.

### How It Works

Disfigure removes the HTML code of the selected part(s) from the page's HTML.
Dead simple.
(Except for Facebook's "bluebar"
where it only changes the color to transparent.)

The CSS selectors of the predefined parts are listed in the code.

### Upside

Disfigure removes distracting and undesirable parts of a webpage
so that you may chat or watch a video in peace.

### Downside

- The selected parts are removed from the HTML structure of the webpage.
So, the only way to get a deleted part back
is to reload the tab.

- Since some perfectly functional parts are just deleted,
the browser console may throw a lot of errors.
Other parts of the page works fine after removal.
The page does not _break_,
it only loses some features.

- The "`font-family`" and other related CSS may be different on different sites
due to the default values on individual sites being different.
To override all possibilities seemed like a lot of work
and was decided against.

- There is no "Cancel" button.
The only ways of closing the pop-up are
either clicking the "Done" button
or pressing the "Escape" key.

  Due to a lack of basic design sense,
the developer went too far ahead without such a button first,
and is now afraid to change anything visual.

- There is no button to deselect all options at once.
Due to the developer's lack of basic design sense.
Again.

  However, presets can be unchecked to deselect corresponding options,
although that is not a very desirable solution.

#### YouTube-specific

- Disfigure should be used after the page has finished loading.
Otherwise, unexpected parts (the main content!) may get removed.
The CSS selectors that are used to identify targets are
those that appear after the page is _finished_ with all the DOM manipulation.

- It may become necessary, in some cases,
to use the "Stingy" preset after the video has started loading.
Otherwise, the `<script>` tags necessary to load it may get deleted.

- Deleted parts
(for example, the current playlist, if a playlist video is playing)
may reappear if tab zoom changes.

- YouTube seems to insert tags into the HTML any time it wants.
So, even after Disfigure has been used to strip the page down
a number of parts may pop up in the code
(not making a visible appearance).

### Dependency

If the CSS selectors of the targeted parts ever change,
those parts will not be removed
until the selectors are updated.

Since Disfigure deals with webpages,
changes in HTML can be inconveniently frequent.

### Credit

- [JSMin](https://www.crockford.com/jsmin.html)
by Douglas Crockford has been used
to minify the code while creating the provided bookmarklet.

### License

### Future Plan

- Addition:
  - Google spreadsheet: zoom messages
- Browser extension

### Miscellaneous

#### Is there a debug mode?

No.
But helpful messages are printed in the browser console in a few scenarios.

#### What's with the "Great-but-Ugly"?

The result is great but the process is ugly.

Instead of gently hiding the offending parts
and letting the site run as intended under the hood,
the developer went for the
what-the-hell-if-I-don't-need-it-let's-just-delete-it approach.

This was a reason an alternative interpretation
"Distraction-Free Interface by _Generally Unadvised_ Removal of Elements"
was considered.

#### How do I make a bookmarklet?

Disfigure is already provided in bookmarklet form
(the "`disfigure.txt`" file).

If you still want to make it yourself:

1. Create a new bookmark in your browser.

2. Copy the content of "`disfigure.js`" and remove all the comments.
Even better if you can minify the code.

3. Put this code in the
"Location" (for Mozilla Firefox)
or the "URL" (for Google Chrome) field,
preceded by "`javascript:(function(){`" and followed by "`})()`".

4. Save it.

You are expected to use "Disfigure" as the name of the bookmarklet.
