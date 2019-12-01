// tslint:disable

export const gogol = `
## The original Game of Life

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) is an example of a cellular automaton, where discrete "cells", or positions in space with a finite number of states, interact with each other based on a given set of rules. Conway's version, devised in 1970, involves an infinite grid (though that can vary), and each cell only has two states: on and off (aka living and dead). The rules are simple. Every generation:  
- A dead cell comes to life if it has exacly three living neighbors
- A living cell stays alive if it has two or three living neighbors

The cells can exhibit complex behavior in parallel, such as oscillators (configurations of cells that loop between the same set of finite states) and gliders (like oscillators, but that move in a single direction ad infinitum). It's even been found to be Turing complete, meaning it can be thought of as a [universal machine](https://en.wikipedia.org/wiki/Universal_Turing_machine) (hint hint, that means it can be configured to act as a [computer](https://pdfs.semanticscholar.org/19ea/f250c6b311870efa0950e642fb18febcfaf5.pdf))

## Concept

Conway's Game of Life has always been intriguing to me. However, it is only a single set of rules that govern a planar universe, but there are many others that exhibit their own interesting complex behavior. Behold, the Game of the Game of Life. While technically still only a [zero player game](https://en.wikipedia.org/wiki/Zero-player_game), GoGoL provides the controls to define your own rules for how the universe should behave. Go ahead, play God. Uh, I mean...play GoGoL?

## Design

GoGoL uses a front-end only design, where the logic is written in JavaScript. It uses the following frontend technologies:  
- Vanilla JS to handle the generation logic
- React-Redux to store the cell states and control data
- Webpack to bundle the JS into a single file
- Sass to bundle the CSS into a single file

In order to simplify the calculations, the entire grid is not stored. Rather, only the cells which are alive for any given generation are stored via their cooridinates. Every game-tick, the living cells are retrieved, then the next generation is constructed based on the decided set of rules. The cells are clickable when paused, allowing the user to change the configuration.

### Major components

\`grid.jsx\`: React component that handles rendering of the grid
\`cell.js\`: The class responsible for containing state information for a single cell, and performing neighbor calculations.
\`runner.jsx\`: React component that doesn't render, but connects to the store to provide \`life.js\` with grid information, and handles render timing.
\`life.js\`: The logic responsible for calculating the next state from the current state.

## Rules

Each cell has eight possible neighbor cells. These are the cells located directly above, below, to the left, to the right, and at all four diagonals. This is known as a Moore neighborhood, and is how cell states are calculated. A cell's next state is based on the number of living cells in it's Moore neighborhood. A dead cell with three neighbors (no more, no fewer) becomes alive (birth), and a living cell with two or three cells stays alive (survive). Any cell not part of either group is considered dead during the next generation.

These rules based off of birth and survival, which can easily be written in a special notation in the style of \`Bx/Sy\`, where the \`B\` stands for birth, and the \`S\` stands for survival. The \`x\` and \`y\` can be any distinct digits between 0 and 8, and represent the number of neighbors a cell must have for either condition to be true. Any dead candidate cell must have an \`x\` number of neighbors to be alive, and a living cell must have a \`y\` number of neighbors to stay alive. Using this notation, any arbitrary ruleset can be established. For example, Conway's version is denoted by the rule \`B3/S23\`. Allowing a user to choose their own notation is thus trivial.

## Engineering Challenges

### Calculating Frames

In order to transform this into code, several steps were necessary. In the beginning, there is a single Map, which maps coordinate strings to Cell objects. It not only keeps access to all living cells, but provides O(n) lookup by acting as a hash set. The calculation is as follows:

- Create a new Map (\`newGeneration\`)
- For every cell in the Map (\`grid\`), all neighbor coordinates are determined.
  - Any coordinate that's already in the grid increments the count for that cell
    - If that count has a true value in the \`survive\` object, it's added to the \`newGeneration\`
  - Any coordinate that's not already in the grid is added to a new Map (\`deadNeighbors\`)
- For every cell in \`deadNeighbors\`, all neighbor coordinates are determined.
  - Any coordinate that's in the grid increments the count for that cell
    - If that cound has a true value in the \`birth\` object, it's added to the newGeneration

### Determining Render Times

The runner component is the one responsible for using the life object to calculate grid procession, but also manages the timing. The life object uses a \`generate()\` function to do all calculations at once, which is performed in the runner's \`update()\` function. When the runner receives new controls through it's props, it determines whether it should start playing. If it should begin playing, it uses \`setInterval()\` with \`update()\` as the callback and the \`frameTime\` in controls as the interval. The handler that returns from \`setInterval()\` is stored. When it determines that it's time to pause, it calls \`clearInterval()\` with the saved handler, stopping the update from running.

## Controls

The controls are very simple, as to not overwhelm the user. The user can decide:  
- Start, Pause, Reset
- The render speed
- The rules (Who's born, and who survives)
- The configuration of the grid at any step
`;

export const orgmode = `
## Org(anization) Mode
VS Code Org Mode is an extension for Visual Studio Code inspired by the venerable [Org mode for Emacs](http://orgmode.org/). Org lets you keep notes, maintain TODO lists, and author documents, all in plain text.

## Concept
My good buddy Jason Reeder, a prominent Emacs and Org mode user in our circle, was the one who conceived of this project. Being comfortable with Visual Studio Code and wanting to extend it myself, I was more than excited to work on this project. While the extension isn't completed, it contains enough functionality to be useful. It currently has over a thousand downloads from the VS Marketplace, which makes it the largest project I've contributed to so far. It appears the reach of Org mode is much further than I thought.

## What it can do
There's no point describing it in detail here if Jason's already done a [bang up job](https://jsonreeder.github.io/vscode-org-mode/) of that already.

## What I did
I had two major contributions to this project.

### Getting off the ground
The first was getting started in the first place. With none of us having any experience making extensions for anything, we had nothing to go on. While I do think the Visual Studio docs are helpful, there's a lot of information that's either left out or really difficult to find for one reason or another. I discovered Yeoman which can scaffold a VSCode extension, as well as using the \`vsce\` tool to publish the extension to the store. There was a lot of trial and error, much of which was spent directly in the project's \`package.json\` file, where a lot of initial configuration and triggers are set.

### Date-Time
The second contribution was directly involved with the code: Dates. One really cool feature of Org mode is the ability to create a date-time string wrapped in brackets, and if it's formatted correctly, it gets its own syntax highlighting. But that's not the cool part. Using a single action (or keystroke), the date-time text under the cursor can be incremented or decremented by a single day and keeps track of the proper weekday. While one idea floating around was to allow the section of date-time under the cursor to be specifically what is modified, it wouldn't be exactly what the Org mode spec specifies.

I'm very proud of this project. It was my first work done in TypeScript, my first extension, my first successful group endeavor, and is actually used by other people. This sucked up a week of my life, and to watch it being used by hundreds of nerds around the world makes my heart sing.
`;

export const rubric = `
# This is an h1 header 

## This is an h2 header

### This is an h3 header

#### This is an h4 header

##### This is an h5 header

###### This is an h6 header

---

***

___

This is a paragraph

This is a paragraph
with a softbreak with no spaces

This is a paragraph 
with a softbreak with one space

This is a paragraph  
with a hardbreak with two spaces

This is a text with an *italic style*, a **bold style**, a ~~strikethrough~~, and \`inlined code\`.

\`\`\`
// This code block has no language
// That means it's generic and unstyled
\`\`\`

\`\`\`javascript
const x = 'This is a code block';
const y = 'Hello mom!';
\`\`\`

\`\`\`ruby
# Something more complicated to ensure formatting stays consistent
def fib(places)

     a = 0
     b = 1

     while a < places do
          puts a + "\\n"
          a = b
          b = a + b
     end
end

puts fib(1000)
\`\`\`

This is an [inline link](www.example.com)

This is an [inline link](www.example.com "With a title")

This is a [reference link][reference text]

This is an [internal reference link](./src/ast.ts)

This is a [reference link] using its own text as a reference

[reference text]: www.example.com
[reference link]: www.example.com

![first alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mumbai_Train.JPG/1280px-Mumbai_Train.JPG "First title text")

![second alt text][image reference]

[image reference]: https://upload.wikimedia.org/wikipedia/commons/5/5a/City_of_Rockhampton_train_%28Sunshine_railway_station%2C_Brisbane%29.jpg "Second title text"

This *paragraph has **nested** styles*

[This link has a **style** inside it](www.example.com)


This paragraph has a ~~[**bold link**](www.example.com)~~ with a line through it

1. First item 
   With more

2. Second item

   And then some

3. Third item

* An item
* Another item
* Yet another item

+ A list
   + That is
      + Nested
   + Which
   + Is
+ Interesting

1. You can
   + even
      1. nest
      2. with
   + mixed
   + list
2. types

| Tables        |      Are      |   Cool |
|:--------------|:-------------:|-------:|
| *col 3 is*    | right-aligned |  $1600 |
| col 2 is      | **centered**  |    $12 |
| zebra stripes |   are neat    | ~~$1~~ |

---

> This is a block quote with **internal styles**.

### This header has **internal styles** within it
`;