//Allocate endowment to players

// Number of players per group
var n = 4;

// Create an array of random numbers
var rand = Array(n).fill().map(() => Math.random());

// Sort them
var sorted = rand.slice().sort(function(a,b){return b-a});

// Rank them from the largest to the smallest
var ranks = rand.slice().map(function(v){ return sorted.indexOf(v)+1 });

// Number of partecipants with high income
var m =2;

// High income
var H = 40;

// Low income
var L = 20;

// Create Income array
var Income = new Array(n);

// Assign Income based on ranking
for (var i = 0; i < n; i++) {
  if (ranks[i]<=m) {
  Income[i] = H;
} else {
  Income[i] = L;
}
} 


// Display (to check)
var x = Income.toString();
alert(x)