// your code here


function getRepositories() {
  let userName = document.getElementById('username').value;
  let repoURL = `https://api.github.com/users/${userName}/repos`
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories)
  req.open("GET", repoURL)
  req.send()

};

function displayRepositories() {

};

function getCommits(element) {
  const repoName = element.dataset.repository
  const userName = element.dataset.username
  const commitsURL = `https://api.github.com/repos/${userName}/${repoName}/commits`

const req = new XMLHttpRequest();
req.addEventListener("load", displayCommits)
req.open("GET", commitsURL);
req.send();

};

function displayCommits() {
  const commits = JSON.parse(this.responseText)

  const commitsList = "<ul>" + commits.map(commit => {
    const commitAuthor = commit['author']['login']
    const commitAuthorName = commit['commit']['author']['name']
    const commitMessage = commit['commit']['message']

    return (`
      <li>
        <p><strong>Author's Name:</strong> ${commitAuthorName}</p>
        <strong>${commitAuthor}</strong> - ${commitMessage}
      </li>
    `)
  }).join('') + "</ul>"
  document.getElementById('details').innerHTML = commitsList
}

function displayBranches() {

}
