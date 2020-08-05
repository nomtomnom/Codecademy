let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
const generateTarget = () => Math.floor(Math.random()*10);

const compareGuesses = (humanScore, computerScore, target) => {
    let target = generateTarget();

    if (Math.abs(humanScore-target) < Math.abs(computerScore-target)) {
        return true;
    } else if (Math.abs(humanScore-target) > Math.abs(computerScore-target)) {
        return false
    } else { return 'Tie game!' };
};

const updateScore = (winner) => {
    if (winner === 'human') {humanScore++
    } else {computerScore++};
}

const advanceRound = () => currentRoundNumber++;