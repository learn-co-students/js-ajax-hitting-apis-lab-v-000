// your code here
function displayCommits(el){
  const commits  = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
  .map(
    commit =>
    '<li><strong>' +
     commit.author.login +
     '</strong> - ' +
      commit.commit.message +
      '</li>'
  ).join('')}</ul>`;
  document.getElementById('Details').innerHTML = commitsList;
}
