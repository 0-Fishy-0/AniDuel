<div align="center">

# ⚔️ AniDuel

**A browser-based card dueling game, built from scratch in vanilla JavaScript.**
No frameworks. No libraries. Just the DOM and a lot of game logic.

<!-- [**▶ Play it live**](https://0-fishy-0.github.io/AniDuel/) · -->
[Report a bug](https://github.com/0-Fishy-0/AniDuel/issues)

![JavaScript](https://img.shields.io/badge/JavaScript-5C5C5C?logo=javascript&logoColor=yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

<!--
TODO: replace with a gameplay GIF (best) or screenshot. Put it in /screenshots
<img src="screenshots/gameplay.gif" alt="AniDuel gameplay" width="800">
-->

</div>

---

## About

AniDuel is a turn-based card dueling game that runs entirely in the browser. Both players compete to bring their opponent's health to 0 while using the effects of different cards.

## Features

- 🃏 **Balanced card pool**: every card is defined in a single JS object, which keeps balancing simple
- ⚔️ **Turn-based duels** with full game state management
- 🎴 **Multi-card plays** and hand-size synergies
- 🌍 **Shared board events** that change the match as rounds progress
- 🖥️ **Entirely DOM-rendered UI**, with no canvas and no framework

## Run locally

```bash
git clone https://github.com/0-Fishy-0/AniDuel.git
cd AniDuel
```

Then open `mainMenu.html` in your browser.

## Under the hood

- **OOP architecture**: classes, inheritance and encapsulation keep the card, player and game logic modular.
- **State management**: the game state is the single source of truth, and the DOM is rendered from it each turn.

## Roadmap

- [ ] Card art
- [ ] More animations
- [ ] Summons that stay on the board for multiple rounds
