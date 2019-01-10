// your code here
// function displayBranches() {
// }
function getBranches(el) {
  let owner = el.dataset.username;
  let repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  const URI = 'https://api.github.com/repos/' + owner + '/' + repo + '/branches';
  // GET /repos/:owner/:repo/branches
  req.addEventListener('load', displayBranches);
  req.open('GET', URI);
  req.send();
}
