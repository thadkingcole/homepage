function main() {
  // define ticker element
  const tickerEl = document.getElementById("ticker");

  // get game scores from ESPN API
  fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard")
    .then((response) => response.json())
    .then((data) => {
      const games = data.events;

      games.forEach((game) => {
        // create div to place the score
        const gameEl = document.createElement("div");

        // add bootstrap classes to the div
        gameEl.className = "ticker-item text-center";

        // get the scores
        // TODO add team logos
        const away = {};
        const home = {};
        game.competitions[0].competitors.forEach((team) => {
          if (team.homeAway === "away") {
            away.score = team.score;
          } else {
            home.score = team.score;
          }
        });

        // put the score in the div
        gameEl.innerText = `${away.score} ${game.shortName} ${home.score}
        ${game.status.type.shortDetail}`;

        // add the div to the ticker element
        tickerEl.appendChild(gameEl);
      });
    });
}

document.addEventListener("DOMContentLoaded", main());
