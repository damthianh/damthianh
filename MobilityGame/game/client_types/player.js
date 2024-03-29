/**
 * # Player type implementation of the game stages
 * Copyright(c) 2019 damthianh <damanh1005@gmail.com>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    stager.setOnInit(function() {

        // Initialize the client.

        var header, frame;

        // Bid is valid if it is a number between 0 and 100.
        this.isValidBid = function(n) {
            return node.JSUS.isInt(n, -1, 101);
        };

        this.randomOffer = function(offer, submitOffer) {
            var n;
            n = J.randomInt(-1,100);
            offer.value = n;
            submitOffer.click();
        };

        // Setup page: header + frame.
        header = W.generateHeader();
        frame = W.generateFrame();

        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header, {
            title: false
        });
        this.visualTimer = node.widgets.append('VisualTimer', header);

        this.doneButton = node.widgets.append('DoneButton', header);

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('instructions', {
        frame: 'instructions.htm'
    });

    stager.extendStep('quiz', {
        frame: 'quiz.htm'
    });

  //I have not changed any content in 'game'


    stager.extendStep('game', {
        donebutton: false,
        frame: 'game.htm',
        roles: {
            DICTATOR: {
                timer: settings.bidTime,
                cb: function() {
                    var button, offer, div;

                    // Make the dictator display visible.
                    div = W.getElementById('dictator').style.display = '';
                    button = W.getElementById('submitOffer');
                    offer =  W.getElementById('offer');

                    // Listen on click event.
                    button.onclick = function() {
                        var decision;

                        // Validate offer.
                        decision = node.game.isValidBid(offer.value);
                        if ('number' !== typeof decision) {
                            W.writeln('Please enter a number between ' +
                                      '0 and 20.', 'dictator');
                            return;
                        }
                        button.disabled = true;

                        // Mark the end of the round, and
                        // store the decision in the server.
                        node.done({ offer: decision });
                    };
                },
                timeup: function() {
                    node.game.randomOffer(W.getElementById('offer'),
                                          W.getElementById('submitOffer'));
                }
            },
            OBSERVER: {
                cb: function() {
                    var span, div, dotsObj;

                    // Make the observer display visible.
                    div = W.getElementById('observer').style.display = '';
                    span = W.getElementById('dots');
                    dotsObj = W.addLoadingDots(span);

                    node.on.data('decision', function(msg) {
                        dotsObj.stop();
                        W.setInnerHTML('waitingFor', 'Decision arrived: ');
                        W.setInnerHTML('decision',
                                       'The dictator offered: ' +
                                       msg.data + ' ECU.');

                        node.timer.randomDone();
                    });
                }
            }
        }
    });



  stager.extendStep('questionnaire', {
        frame: 'postgame.htm',
        widget: {
            name: 'ChoiceManager',
            root: 'root',
            options: {
                id: 'questionnaire',
                title: false,
                forms:  [
                    {
                        name: 'ChoiceTable',
                        id: 'alreadyParticipated',
                        choices: [ 'Yes', 'No' ],
                        requiredChoice: true,
                        title: false,
                        mainText: 'Have you ever participated in a similar ' +
                            'experiment before?'
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'mobility',
                        choices: [ 'Low', 'High', 'No opinion'],
                        requiredChoice: true,
                        title: false,
                        mainText: 'Based on incomes you obtained throughout 5 rounds, how do you perceive income mobility of your group?'
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'strategy',
                        choices: [
                            [ 'random', 'Randomly chose numbers' ],
                            [ 'egoist', 'Maximized my own monetary payoff' ],
                            [ 'inequality aversion', 'Minimized differences between your payoff and others\' payoffs'],
                            [ 'other', 'Other (please described below)' ]
                        ],
                        title: false,
                        orientation: 'v',
                        requiredChoice: true,
                        mainText: 'Describe the strategy you played:'
                    },
                ],
                freeText: 'Please leave any feedback for the experimenter'
            }
        }
    });



  //End stage
    stager.extendStep('end', {
        donebutton: false,
        frame: 'end.htm',
        cb: function() {
            node.game.visualTimer.setToZero();
        }
    });


};
