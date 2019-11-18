/**
 * # Game stages definition file
 * Copyright(c) 2019 damthianh <damanh1005@gmail.com>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(stager, settings) {

     stager
        .next('instructions')
        .next('quiz')
        .repeat('game', settings.REPEAT)
        .next('questionnaire')
        .next('end')
        .gameover();

    // Modify the stager to skip one stage.
    // stager.skip('instructions');
};
