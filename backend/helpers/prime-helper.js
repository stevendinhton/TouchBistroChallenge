module.exports = {

  // Sieve of Eratosthenes algorithm to find all prime numbers less than n
  getPrimeNumbers: function(n) {
    var array = [];
    var square = Math.sqrt(n)
    var output = [];

    // Create array
    for (var i = 0; i < n; i++) {
      array.push(true);
    }

    // Remove multiples of prime numbers starting from 2
    for (var i = 2; i <= square; i++) {
      if (array[i]) {
        for (var j = i * i; j < n; j += i) {
          array[j] = false;
        }
      }
    }

    // Any element set to true is a prime
    for (var i = 2; i < n; i++) {
      if(array[i]) {
        output.push(i);
      }
    }

    return output;
  },

  getPrimeMedians: function(n) {
    var primeNumbers = this.getPrimeNumbers(n);
    var middleIndex = (primeNumbers.length - 1) / 2;

    return primeNumbers.slice(Math.floor(middleIndex), Math.ceil(middleIndex) + 1);
  }
}
