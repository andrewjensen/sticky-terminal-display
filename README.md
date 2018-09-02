# Sticky Terminal Display

Control and update lines on the terminal for progress bars

## Installation

```
npm install sticky-terminal-display
```

## Example Usage

This code will show a countdown, all on a single line of the terminal.

```js
const StickyTerminalDisplay = require('sticky-terminal-display');

runCountdown();

async function runCountdown() {
  const display = new StickyTerminalDisplay();
  const renderer = display.getLineRenderer();
  renderer.write('Starting countdown...');
  await pause(1000);
  for (let i = 3; i > 0; i--) {
    renderer.write(`${i}...`);
    await pause(1000);
  }
  renderer.write('Blastoff!');
}

async function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

You can use this with multiple renderers too! You might use this if you have a process with multiple workers that need to display their state.

TODO: show example
