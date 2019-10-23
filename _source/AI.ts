/* Monte Carlo tree search simulation of possible moves that an AI combatant can make */

class AI {
    botCopy: Enemy; // copy of the AI-controlled combatant
    humanCopy: Player; // copy of the human-controlled combatant
    bestSequence: number[]; // the highest-utlity sequence that has been found
    bestSequenceScore: number; // the utility score of the best sequence
    scoreFunction: (Enemy, Player) => number // the utility function used to assign scores to possible outcomes

    constructor(aiCombatant: Enemy, humanCombatant: Player) {
        // TODO use the clone() method the actual enemy and player combatants
        this.botCopy = aiCombatant.clone();
        this.humanCopy = humanCombatant.clone();
        //make sure the opponents are correct
        this.botCopy.opponent = this.humanCopy;
        this.humanCopy.opponent = this.botCopy;
        this.bestSequence = []; // the default move is to just end the turn immediately

        // check bot for status effects that change utility function
        // if more than one status implements an overriding utility function, use the one last in the sorted list of statuses
        let statuses = this.botCopy.statuses;
        let preferenceOverride: (bot: Enemy, human: Player) => number;
        statuses.forEach(function(status){
            if(status.overridenUtilityFunction != undefined) {
                preferenceOverride = status.overridenUtilityFunction;
            }
        });

        this.scoreFunction = preferenceOverride || this.botCopy.utilityFunction; // use enemy's utility function if there isn't one from a status effect

        this.bestSequenceScore = this.scoreFunction(this.botCopy, this.humanCopy);
    }

    // simulates random turns to find a higher-scoring outcome than the current bestSequence
    search(iterations: number) {
        let startTime = new Date();
        for (let i = 0; i < iterations; i++) {
            let movesList = [];
            // clone a simulation of the combatants
            let dummyBot = this.botCopy.clone();
            let dummyHuman = this.humanCopy.clone();
            dummyBot.opponent = dummyHuman;
            dummyHuman.opponent = dummyBot;
            dummyBot.refresh();
            dummyHuman.refresh();

            while (true) {
                let possibleMoves = dummyBot.validMoves();
                if (dummyBot.health == 0) {
                    break;
                }
                if (possibleMoves.length == 0) {
                    break;
                }
                possibleMoves.push(-1); // quitting the turn early could sometimes the right move
                let chosenMove = Random.fromArray(possibleMoves);
                if (chosenMove == -1) {
                    break;
                }
                dummyBot.useTool(chosenMove, dummyHuman);
                movesList.push(chosenMove);
            }

            // simulate status effect results
            dummyBot.endTurn();
            dummyHuman.endTurn();

            let consequence = this.scoreFunction(dummyBot, dummyHuman);
            //console.log("Sequence " + movesList + "has utility score of " + consequence);
            if (consequence >= this.bestSequenceScore) {
                this.bestSequenceScore = consequence;
                this.bestSequence = movesList;
            }
        }

        let finishTime = new Date();
        let duration = finishTime.getTime() - startTime.getTime();
        console.log("Sim time (milliseconds): " + duration);
    }

    static bestMoveSequence(aiCombatant: Enemy, humanCombatant: Player, simIterations: number) {
        let sim = new AI(aiCombatant, humanCombatant);
        sim.search(simIterations);
        return sim.bestSequence;
    }
}

