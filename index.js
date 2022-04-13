const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');

const getRandomPanels = () => {
    const panels =[
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    ];

    return panels[parseInt(Math.random() * panels.length)];
};

const sequences =[getRandomPanels()];
let sequenceToGuess = [...sequences];

const flash = panel => {
    return new Promise(resolve => {
      panel.className += ' active';
      setTimeout(() => {
        panel.className = panel.className.replace(
          ' active',''
        );
        setTimeout(() => {
          resolve();
        }, 250);
      }, 800);
    });
  };

let canClick = false;

const panelClicked = panelClick => {
    if (canClick === false) return;
    const expectedPanel = sequenceToGuess.shift();
    if (expectedPanel === panelClick) {
      if (sequenceToGuess.length === 0) {
        sequences.push(getRandomPanels());
        sequenceToGuess = [...sequences];
        startFlashing();
      }
    } else { 
        alert('GAME OVER');
    }
};

const startFlashing = async () => {
    canClick = false;
    for(const panel of sequences){
        await flash(panel);
    }
    canClick = true;
};

startFlashing();