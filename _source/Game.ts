class Game {
    
    static currentRun: Run;

  static showTitle(): void {
    UI.fillScreen(
      UI.renderTitleScreen([
        ['New Game', () => Game.showCharSelect()],
          ['Settings', () => {}], //TODO: settings
          ['Files', () => {}], //TODO: files (what should we call these?)
          ['Credits', () => Game.showCredits()],
      ])
    );
  }

  static showCharSelect(): void {
    UI.fillScreen(
      UI.renderCharacterSelect(Game.newRun, Game.showTitle, ...characters.getAll())
    );
    console.log(characters.getAll());
  }

    static newRun(character: Player): void {
        Game.currentRun = new Run(character);
        Game.currentRun.start();
    }
    
    static showCredits(): void {
        UI.fillScreen(
            UI.renderCredits([
                new CreditsEntry('May Lawver', 'Team Lead', 'Design', 'Programming'),
                new CreditsEntry('Pranay Rapolu', 'Programming', 'Music'),
                new CreditsEntry('Grace Rarer', 'Programming'),
                new CreditsEntry('Prindle', 'Programming'),
                new CreditsEntry('Mitchell Philipp', 'Programming'),
                new CreditsEntry('Seong Ryoo', 'Art'),
                new CreditsEntry('Logo is based on the font "This Boring Party" by Tom7.'),
                new CreditsEntry('Map icons use various Tombats fonts by Tom7.')
            ], () => Game.showTitle())
        );
    }

    static showGameOver(run: Run): void {
        UI.fillScreen(
            UI.makeHeader('Game Over'),
            UI.renderOptions([
                ['Back to Title Screen', () => Game.showTitle()]
            ]),
        );
    }

}
