# How to write scripts
Falco makes it possible to track a website's performance from a public page but also a private page, accessed only through authentication. For that you will need to write a script and this guide will help you through that.

You can also refer to [WebPageTest documentation about scripting](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting).

## General
* Scripts are divided by steps, that way you can track performance for each step. At the beginning of each step add `setEventName [StepName]`.
* If you want to track only some parts of your script (for example you don't care about the performance of the login, you only want the performance of getting to a certain page once logged in), you can put `logData 0` before the part you don't want WebPageTest to track and `logData 1` just before the part you're interested in. WPT will execute all of the script but will only record the part after `logData 1`.
* To navigate through pages by url rather than clicking on buttons, use `navigate [full_url]`. Use it at the beginning of the script to point to the login page for example.
* The script is a list of javascript commands, each command should be preceded by `exec` (for example to declare variables) or `execAndWait` (after a click). `execAndWait` will wait for browser to complete any activity generated from the action, while `exec` only executes the javascript command.

## Clicking on a button
Use javascript command to select the button, generally using an attribute of the button: `document.querySelector('button[type=submit]')`. The attribute can be `href`, `type`, `name` etc. Go though the console's explorer to search for a way to select your button.
Then to simulate the click :

```js
execAndWait document.querySelector('button[type=submit]').click()
```

## Getting past authentication
First find a way to select username and password inputs, generally `document.querySelector('input[type=password]')`. Then you need to change the value of the inputs, then submit the login form. It should look like this, with your own querySelectors and values.

```js
exec let username = document.querySelector('input[type=username]'); let lastValue = username.value; username.value = "AwesomeUsername";
```
Unfortunately, in most broswers and languages, this line wont be enough.

At least in React/Redux applications, you should use an event to properly fill the form, and the script looks like this :

```js
exec let username = document.querySelector('input[type=username]'); let lastValue = username.value; username.value = "AwesomeUsername"; let event = new Event('input', { bubbles: true });let tracker = username._valueTracker; if (tracker) { tracker.setValue(lastValue); } username.dispatchEvent(event);

exec let password = document.querySelector('input[type=password]'); let lastValue2 = password.value; password.value = "AwesomePassword"; let event2 = new Event('input', { bubbles: true });let tracker2 = password._valueTracker; if (tracker2) { tracker2.setValue(lastValue2); } password.dispatchEvent(event2);

execAndWait	document.querySelector('button[type=submit]').click()
```
For Internet Explorer, you also need to add a polyfill to create a custom event, then use it instead of `Event` [(source)](https://gist.github.com/gt3/787767e8cbf0451716a189cdcb2a0d08):

```js
exec	(function(){if(typeof window.CustomEvent==="function")return false;function CustomEvent(event,params){params=params||{bubbles:false,cancelable:false,detail:undefined};var evt=document.createEvent("CustomEvent");evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail);return evt}CustomEvent.prototype=window.Event.prototype;window.CustomEvent=CustomEvent})();
```


## Test the script
The fastest way to test your script is to copy-paste javascript commands (without `exec` and `execAndWait`) one by one into the console and verify that it does what it should.

After that you can test it through [WebPageTest](https://www.webpagetest.org/) directly: in the advanced settings you can put a script to test instead of a page.

## Finding the selectors
It may be challenging to find the right selectors for the buttons and inputs. Testing through the console is the only way to find it.
You can go through documentation for help :
* [CSS Selectors](https://www.w3schools.com/cssref/css_selectors.asp)
* [Query Selectors](https://www.w3schools.com/jsref/met_document_queryselector.asp)
* [XPath](https://developer.mozilla.org/en-US/docs/Web/API/XPathResult)

Otherwise, here is a variety of useful selectors:

* The last of a list of similar inputs:
```js
let numberOfInputs = document.querySelectorAll('input[type=text]').length;
let input =  document.querySelectorAll('input[type=text]')[numberOfInputs - 1]
```
* Selecting by text, example: select the `a` with text `Link Text`
```js
document.evaluate("//a[text()='Link Text']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
```
