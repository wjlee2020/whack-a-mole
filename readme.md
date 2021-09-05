# Whack - a - Mole Project

There were many things that I think I learned and were able to understand deeper having built this small game. <br/>

## Run it with a server (no npm)

I ran it with VS Code Live Server

## JavaScript

I decided not to go with any frameworks with this because (in my opinion) I believe there are many things you can do with
vanilla js (especially after the release of es6, like modules, lexical scoping, template literals, and more). Of course, I think using (my favorite) Reactjs would have come in handy because then I could have easily managed state. I decided to try to use vanilla js with Redux to do that. <br/>

## Redux

I don't have a mature experience with Redux, and so I thought I tried to take my time here and use it (even if it was trivial). <br/>

### Redux Store

Although it may have a lot of boilerplate code, I think Redux does a great job separating state logic from other business processes. <br/>
Here, the provided scoreReducer and the score state inside the rootReducer is where the action takes place. <br/>
I dispatch the actions (which are basic functions that return an object with a type key), where they need to be. <br/>
In the case for scoring, I dispatched the addScore function that takes a payload of 1. <br/>
On reload, I also created an action to retrieve saved score data in the localStorage. <br/>
This action returns the original state of score (0) + whatever was stored inside localStorage (after parseInt). <br/>
I also have a timer reducer which manages an object that contains three states: timer (bool), playClock, and the mole movement time (interval time).
How redux works is: <br/>

- dispatch sends an action via the store
- the store checks inside the rootReducer of comparable state
- once state has been found, it goes into its reducer, and runs the function based on the case from action.type (of the original dispatch)

### How the game works: Overview

The gameboard is created with css grid. <br/>
I created each "mole hole" with a div tag as mentioned in the instructions. <br/>
Utilizing display: grid with nth-child pseudo class, I was able to create the layout from the instruction with a cleaner code than if I had done it with display: flex which would have led me to create more sub containers in the html.

Basic game play is determined by the timer flag which is initially set to false. <br/>
When the Start button is clicked, the timer flag will change to true, run two main functions:

- randomMoleHole to move the moles per setTimeOut. randomMoleHole will call the setTimeout(randomMoleHole) again with a different time argument to randomly change the interval of moving moles
- countdownPersistence to count down the game clock (and save it into the localStorage). I also let the game pause if the user accidentally refreshes the game since it would be inconvenient for the game to continue running for the split second during the reload.
- change timer flag as true to enable the user to click on each mole for points.
