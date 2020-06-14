# DisFIGURE

Disfigure (DIStraction-Free Interface by Great-but-Ugly Removal of Elements),
by temporarily removing undesirable parts of a website,
makes it possible to enjoy a stripped-down version of the site.
The removal is temporary in the sense that
a tab reload or a refresh will bring back the removed parts.
But the parts are not just hidden.
So, the reload/refresh is actually necessary.

A great use of Disfigure is
(in fact, the reason behind its development has been)
to chat on any Facebook page (except "`facebook.com/messages`")
using the chat tabs (the ones that open up from bottom right)
without the distraction of notifications popping up every few seconds.

_**Note:**
Disfigure was intended for desktop users.
So, it might not be very (or at all) mobile-friendly._

### Warning

- Removal of parts/elements is irreversible without a tab reload/refresh.

- Disfigure removes without being nice about it.
So, related features may malfunction.

_**Note:**
This was created and tested using
Firefox Developer Edition 77.0b2 (64-bit)
on Ubuntu 16.04 LTS.
There may be discrepancies in case of other browsers 
or other versions of the same browser(s)
or other operating systems._

### Why Use It

Using a website does not mean you have to make use of every feature all the time.
Chatting on Facebook (using the webpage, not via Messenger)
can be interrupted by continuous pop-up notifications,
or quietly watching a YouTube video can be ruined
by a persistent reminder about some new policy (not that those should be ignored)
or a feedback form demanding to know how your day is going.

Since reloading is just a button away,
you will find that
removing some parts of the page to do get some peace for a while
actually is not a bad idea.

### How to Use It

To use the code directly in the browser console,
copy the content of "`disfigure.js`" and paste it in the console.
Disfigure will activate.

To use the bookmarklet file ("`disfigure.txt`"),
just add its content as a bookmarklet to your browser.

If you want to make a bookmarklet yourself,
see instructions
[somewhere below](#how-to-make-a-bookmarklet).

#### Creating a bookmarklet in browser

1. Create a new bookmark in your browser.

2. Copy and paste the content of "`disfigure.txt`"
in the "Location" (for Mozilla Firefox)
or the "URL" (for Google Chrome) field.

You are expected to use "Disfigure" as the bookmarklet name.

#### Using Disfigure

1. Activate Disfigure.
The pop-up will appear.

2. Select your options.

3. Click on the "Done" button.

Selected parts of the page will have disappeared.

### How It Works

Disfigure removes the HTML code of the selected part from the page's HTML.
Dead simple.

(Except for the "blue bar" on Facebook,
where it only changes the color to transparent.)

### Upside

- Disfigure removes distracting and undesirable parts of a webpage.

### Downside

- Disfigure removes the selected parts from the HTML structure of the webpage.
So, the only way to get a deleted part back
is to reload the tab.

- Since some perfectly functional parts are just deleted,
the browser console may throw a lot of errors.
Other parts of the page works fine after removal.
The page does not _break_,
it only loses some features.

### Dependency

If the CSS selectors of the targeted parts ever change,
those parts will not be removed
until the selectors are updated.

Since this deals with webpages,
changes in HTML can be inconveniently frequent.

### Credit

- [JSMin](https://www.crockford.com/jsmin.html)
by Douglas Crockford has been used
to minify the code while creating the provided bookmarklet.

### License

### Future Plan

- Site-specific subpanels
- Addition:
  - Facebook: background text
  - Google spreadsheet: zoom messages
  - Google Translate: upcoming changes
- Site-specific colors (stalled due to lack of design sense)
- Browser extension

### Miscellaneous

#### Is there a debug mode?

No.
But a message is printed in the browser console in a few scenarios.

#### What's with the "Great-but-Ugly"?

The result is great but the process is ugly.

Instead of gently hiding the offending parts
and letting the site run as intended under the hood,
the developer went for the
what-the-hell-if-I-dont-need-it-lets-just-delete-it approach.

This was a reason an alternative interpretation
"Distraction-Free Interface by _Generally Unadvised_ Removal of Elements"
was considered.

#### How to make a bookmarklet?

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
