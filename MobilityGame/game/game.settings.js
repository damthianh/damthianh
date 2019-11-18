/**
 * # Game settings definition file
 * Copyright(c) 2019 damthianh <damanh1005@gmail.com>
 * MIT Licensed
 *
 * The variables in this file will be sent to each client and saved under:
 *
 *   `node.game.settings`
 *
 * The name of the chosen treatment will be added as:
 *
 *    `node.game.settings.treatmentName`
 *
 * http://www.nodegame.org
 * ---
 */
module.exports = {

    // Variables shared by all treatments.

    // #nodeGame properties:

    /**
     * ### TIMER (object) [nodegame-property]
     *
     * Maps the names of the steps of the game to timer durations
     *
     * If a step name is found here, then the value of the property is
     * used to initialize the game timer for the step.
     */
    TIMER: {
        instructions: 90000
    },

    // # Game specific properties

    // Number of game rounds repetitions.
  //  REPEAT: 20,

        // # Game specific properties

    // Number of game rounds repetitions.
    REPEAT: 5,

    //Initial endowment
  //  low: 20,
  //  high: 40,

    // In case an incoming offer does not pass validation, which indicates
    // cheating, re-set the dictator's offer to this value.
    defaultOffer: 100, //We need to change this one


    //MPCR
  // MPCR=0.25,



    // In case an incoming offer does not pass validation, which indicates
    // cheating, re-set the dictator's offer to this value.
    //defaultOffer: 100,

    // # Treatments definition.

    // They can contain any number of properties, and also overwrite
    // those defined above.

    // If the `treatments` object is missing a treatment named _standard_
    // will be created automatically, and will contain all variables.
    // Custom pages depending on treatment.
    bidderPage:  'bidder.html',
    resultsPage: 'results.html',

//Here we run only Non-merit treatment
    treatments: {
        standard: {
            description: "Assigned endowment",
            bidTime: 30000
        },

      //  merit_high_mobility: {
       //     description: "Earning endowment and high mobility",
      //      taskPage: 'task_high.html', //instruction of real effort task
       //     gamePage: 'game1_high.html', //instruction of PGG
      //      bidTime: 10000
      //  },

      //  merit_low_mobility: {
      //      description: "Earning endowment and low mobility",
      //      taskPage: 'task_low.html', //instruction of real effort task
      //      gamePage: 'game1_low.html',//instruction of PGG
       //     bidTime: 10000
       // }

    }
};
