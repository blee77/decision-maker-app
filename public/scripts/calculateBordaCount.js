function calculateBordaCount(results) {
  const candidates = {}; // object to store candidate points

  // loop through each row in the results table
  for (let i = 0; i < results.length; i++) {
    const row = results[i];
    const rank = row.rank; // get the candidate's rank from the row
    const points = candidates[row.name] || 0; // get the candidate's current points, default to 0
    const n = Object.keys(candidates).length; // get the number of candidates so far
    const newPoints = points + (n - rank); // calculate the new points based on the rank
    candidates[row.name] = newPoints; // update the candidate's points in the object
  }

  // sort the candidates by their total points in descending order
  const sortedCandidates = Object.keys(candidates).sort(
    (a, b) => candidates[b] - candidates[a]
  );

  return sortedCandidates; // return the array of candidates sorted by their total points
}

module.exports = { calculateBordaCount };
