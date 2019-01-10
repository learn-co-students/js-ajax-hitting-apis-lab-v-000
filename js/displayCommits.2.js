function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(c => {
    return `<li>${c.author.login}</li>
      <li>${c.commit.author.name}</li>
      <li>${c.commit.committer.message}</li><br>`;
  }).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
