class UI {

  static redrawFunction: Function;

  static makeDiv(c?: string, id?: string) {
    const div: HTMLElement = document.createElement('div');
    if (c) {
      div.classList.add(c);
    }
    if (id) {
      div.id = id;
    }
    return div;
  }

  static makeTextParagraph(str: string, c?: string, id?: string): HTMLElement {
    const p: HTMLElement = document.createElement('p');
    p.innerText = str;
    if (c) {
      p.classList.add(c);
    }
    if (id) {
      p.id = id;
    }
    return p;
  }

  static makeHeader(str: string, c?: string, id?: string, level: number = 1): HTMLElement {
    const h: HTMLElement = document.createElement(`h${level}`);
    h.innerText = str;
    if (c) {
      h.classList.add(c);
    }
    if (id) {
      h.id = id;
    }
    return h;
  }

  static makeButton(str: string, func: Function, disabled: boolean = false, c?: string, id?: string): HTMLButtonElement {
    const b: HTMLButtonElement = document.createElement('button');
    b.type = 'button';
    b.disabled = disabled;
    b.innerText = str;
    if (c) {
      b.classList.add(c);
    }
    if (id) {
      b.id = id;
    }
    b.onclick = function (ev: MouseEvent) {
      ev.preventDefault;
      func.call(this, ev);
    };
    return b;
  }

  static fakeClick(elem: HTMLElement): void {
    //TODO: structure this more reasonably
    elem.classList.remove('fakeclick');
    elem.classList.add('fakeclick');
    window.setTimeout(function() {
      elem.onclick(new MouseEvent('click'));
      elem.classList.remove('fakeclick');
    }, 500);
  }

  static renderCombatant(c: Combatant, target: Combatant, isTurn: boolean, buttonArr?: HTMLElement[]): HTMLElement {
    let which;
    if (c instanceof Player) {
      which = 'player';
    } else {
      which = 'enemy';
    }
    const div: HTMLElement = UI.makeDiv(which);
    div.appendChild(UI.makeTextParagraph(c.name, 'name'));
    div.appendChild(UI.makeTextParagraph(`Health: ${c.health} / ${c.maxHealth}`, 'health'));
    div.appendChild(UI.makeTextParagraph(`Energy: ${c.energy} / ${c.maxEnergy}`, 'energy'));
    const toolDiv: HTMLElement = document.createElement('div');
    toolDiv.classList.add('tools');
    for (let i = 0; i < c.tools.length; i++) {
      let currentDiv: HTMLElement = UI.renderCombatTool(c.tools[i], c, i, target, isTurn, buttonArr);
      currentDiv.classList.add(`tool_${i}`);
      toolDiv.appendChild(currentDiv);
    }
    div.appendChild(toolDiv);
    return div;
  }

  static renderTool(t: Tool): HTMLElement {
    const div: HTMLElement = UI.makeDiv('tool');
    div.appendChild(UI.makeTextParagraph(t.name, 'name'));
    div.appendChild(UI.makeTextParagraph(`Cost: ${t.cost.toString()}`, 'cost'));
    div.appendChild(UI.makeTextParagraph(t.effectsString(), 'effect'));
    if (t.multiplier > 1) {
      div.appendChild(UI.makeTextParagraph(`x${t.multiplier}`, 'multiplier'));
    }
    return div;
  }

  static renderCombatTool(t: Tool, c?: Combatant, i?: number, target?: Combatant, isTurn?: boolean, buttonArr?: HTMLElement[]) {
    const div: HTMLElement = UI.renderTool(t);
    if (t.usesPerTurn < Infinity) {
      div.appendChild(UI.makeTextParagraph(`(${t.usesLeft} use(s) left this turn)`));
    }
    if (p && i !== undefined) {
      let b = UI.makeButton('Use', function(e: MouseEvent) {
        c.useTool(i, target);
        UI.redraw();
      }, !t.usableBy(c) || !isTurn, 'use');
      div.appendChild(b);
      if (buttonArr !== undefined){
        buttonArr.push(b);
      }
    }
    return div;
  }

  static renderOfferTool(t: Tool, m: Modifier) {
    const div: HTMLElement = UI.renderTool(t);
    if (t.usesPerTurn < Infinity) {
      div.appendChild(UI.makeTextParagraph(`usable ${t.usesPerTurn} time(s) per turn`));
    }
    div.appendChild(UI.makeButton(`Apply ${m.name}`, function(e: MouseEvent) {
      m.apply(t);
      moveOn();
    }, false, 'apply'));
    return div;
  }

  static renderModifier(m: Modifier, p: Player, refusable: boolean = true) {
    const div: HTMLElement = UI.makeDiv('modifier');
    div.appendChild(UI.makeTextParagraph(m.name, 'name'));
    div.appendChild(UI.makeTextParagraph(m.describe(), 'desc'));
    for (let i = 0; i < p.tools.length; i++) {
      div.appendChild(UI.renderOfferTool(p.tools[i], m));
    }
    if (refusable) {
      div.appendChild(UI.makeButton('No Thank You', function() {
        moveOn();
      }));
    } else {
      div.appendChild(UI.makeButton("Can't Refuse!", function() {
        moveOn();
      }, true));
    }
    return div;
  }

  static renderMainTitle(): HTMLElement {
    return UI.makeHeader('The Prototype Inheritance', 'titletext');
  }

  static renderTitleScreen(options: [string, Function][]): HTMLElement {
    const div: HTMLElement = UI.makeDiv('titlescreen');
    div.appendChild(UI.renderMainTitle());
    const buttons: HTMLElement = UI.makeDiv('buttons');
    for (let i = 0; i < options.length; i++) {
      buttons.appendChild(UI.makeButton(options[i][0], options[i][1]));
    }
    div.appendChild(buttons);
    return div;
  }

  static renderCreditsEntry(entry: CreditsEntry): HTMLElement {
    const div: HTMLElement = UI.makeDiv('entry');
    div.appendChild(UI.makeHeader(entry.name, 'name'));
    div.appendChild(UI.makeTextParagraph(entry.roles.join(', '), 'roles'));
    return div;
  }

  static renderCredits(credits: CreditsEntry[]): HTMLElement {
    const div: HTMLElement = UI.makeDiv('credits');
    div.appendChild(UI.renderMainTitle());
    credits.map(x => UI.renderCreditsEntry(x)).forEach(val => {
      div.appendChild(val);
    });
    return div;
  }

  static setRedrawFunction(f: Function) {
    UI.redrawFunction = f;
  }

  static redraw() {
    if (UI.redrawFunction) {
      UI.redrawFunction();
    }
  }

}
