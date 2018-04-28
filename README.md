# news-analyzer
This project is a Chrome extension for analyzing online news articles. It uses
[Fakebox](https://machinebox.io/docs/fakebox), a machine learning API that analyzes
the title, content, and domain name of online news articles.  Learn more about
the machine learning algorithm [here](https://towardsdatascience.com/i-trained-fake-news-detection-ai-with-95-accuracy-and-almost-went-crazy-d10589aa57c).

## Installation
### Set up and run Fakebox
1. Install [Docker](https://docs.docker.com/install/). This is the container the
Fakebox API will run on.
2. Sign into [machinebox](https://machinebox.io/login?return_url=%2Faccount) and
 obtain your [box key](https://machinebox.io/docs/setup/box-key).
3. Open a terminal and run: `docker run -p 8080:8080 -e "MB_KEY=$MB_KEY" machinebox/fakebox`
4. Go to `http://localhost:8080/` in your browser to access the Fakebox console.

### Set up Chrome extension
1. Download or clone this repository. You can clone this repository by opening
a terminal and running `git clone https://github.com/emmaling27/news-analyzer.git`.
2. Open `chrome://extensions/` in Chrome.
3. Click "Developer mode" on the top right.
4. Click "Load unpacked" and select this repository. You should now see your
extension in the list and in the toolbar.

## Using the Chrome extension
Now that you've installed the Chrome extension and have Fakebox up and running,
when you click on the News Analyzer icon, you should see a popup with a big green
button that says "Analyze news." If you click, you should see a loader, and then
text describing the source and the bias of the content on the current page.  A
bar at the bottom of the popup shows how biased the content of the current page
is, where red is biased and green is impartial.

## Navigating the repository
To understand how Chrome extensions work, see the [documentation](https://developer.chrome.com/extensions)
and [this helpful blog](https://robots.thoughtbot.com/how-to-make-a-chrome-extension).
I will describe the important parts of the architecture of this Chrome extension
in the following:
- `page_scraper.js` is a content script that runs when the page is loaded. It
has access to the DOM of the current tab and waits for a message from `popup.js`.
When it receives the message that the user has clicked on the "Analyze news" button
in the popup, this script will get the paragraph elements of the page and strip
the links and other HTML elements so only the main text of the article remains. It
sends this back to `popup.js`.
- `popup.js` sends a message to the `page_scraper.js` to get the content from the
page and makes an XMLHttpRequest to Fakebox with the content.  The script processes
the API response, editing `popup.html` to display information on the source and
bias of the content.

## Troubleshooting
`test_fakebox.html` and `test_fakebox.js` are designed to test to make sure
Fakebox is up and running.  If you open `test_fakebox.html` and see the word
"nothing" on the page, Fakebox is not working.  If you see the word "something",
Fakebox is working. The script `test_fakebox.js` sends
an XMLHttpRequest to Fakebox with article content and should change "nothing" to
 "something" in `test_fakebox.html`.
