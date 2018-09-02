const { stdout } = process;

module.exports = class StickyTerminalDisplay {
  constructor() {
    this.cursorRow = 0;
    this.lineRenderers = [];
  }

  getLineRenderer() {
    const renderer = new LineRenderer(this);

    this.lineRenderers.push(renderer);
    stdout.write('\n');
    this.cursorRow++;

    return renderer;
  }

  cursorToRenderer(renderer) {
    const index = this.lineRenderers.indexOf(renderer);
    if (index === -1) {
      throw new Error('LineRenderer not found');
    }

    while (this.cursorRow > index) {
      cursorUp();
      this.cursorRow--;
    }
  }

  cursorToBottom() {
    const bottomRow = this.lineRenderers.length;
    while (this.cursorRow < bottomRow) {
      cursorDown();
      this.cursorRow++;
    }
  }

  end() {
  }
}

class LineRenderer {
  constructor(display) {
    this.display = display;
  }

  write(message) {
    this.display.cursorToRenderer(this);
    eraseCurrentLine();

    stdout.write(message);

    cursorBack();
    this.display.cursorToBottom();
  }
}

function eraseCurrentLine() {
  // Move left 999 chars, then erase everything to the right
  stdout.write('\x1b[999D\x1b[K');
}

function cursorBack() {
  stdout.write('\x1b[999D');
}

function cursorUp() {
  stdout.write('\x1b[A');
}

function cursorDown() {
  stdout.write('\x1b[B');
}
