function main() {
  // define ticker element
  const tickerEl = document.getElementById("ticker");

  // get game scores from ESPN API
  fetch("http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard")
    .then((response) => response.json())
    .then((data) => {
      const games = data.events;

      games.forEach((game) => {
        console.log(game);
        // create div to place the score
        const gameEl = document.createElement("div");

        // add bootstrap classes to the div
        gameEl.className =
          "ticker-item text-center";

        // get the scores
        const scores = {};
        game.competitions[0].competitors.forEach((team) => {
          if (team.homeAway === "away") {
            scores.away = team.score;
          } else {
            scores.home = team.score;
          }
        });

        // put the score in the div
        gameEl.innerText = `${scores.away} ${game.shortName} ${scores.home}
        ${game.status.type.shortDetail}`;

        // add the div to the ticker element
        tickerEl.appendChild(gameEl);
      });
    });
}

document.addEventListener("DOMContentLoaded", main());
