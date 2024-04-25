const { distance, closest } = require('fastest-levenshtein');
function my_distance(word1, word2) {
    if (word1.length < word2.length){
        let distances = [];
        for(let i = 0; i < word2.length - word1.length + 1; i++) {
            distances[i] = distance(word1, word2.slice(i, word1.length + i));
        }
       return Math.min(...distances);
    }
    else {
        return distance(word1, word2);
    }
}

console.log(my_distance('god', 'the godfather'))
console.log(distance('god', 'god'))