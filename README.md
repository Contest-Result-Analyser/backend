# Contest Result Analyzer

The software is designed to read and interpret Cabrillo logs, a format extensively adopted in amateur radio contests, and it performs in-depth analysis based on the data within these logs.

Furthermore, the software awards points for various achievements or milestones within the contest. These criteria for points can vary widely based on the particular contest ruleset in use. These scores are computed for each individual participant in the contest.

Ultimately, a leaderboard is compiled, ranking all participants based on their individual scores tallied from these points. This leaderboard provides a clear insight into the standing and comparative performance of each participant throughout the contest.

## Cabrillo Format

For more information on Cabrillo, please visit [www.cqwpx.com/cabrillo.htm](https://www.cqwpx.com/cabrillo.htm).

## Environment file (.env)

```
DB_CLIENT=mysql2
DB_HOST=localhost
DB_USER=my_contest_user
DB_PASSWORD=my_contest_pass
DB_NAME=contest
```

## Setup Instructions

1. After you've loaded the project onto your computer/server, create a `.env` file with the access data of your MySQL (MariaDB) database.
2. You should also have Node.js, npm, and TypeScript installed.
3. You can start the project with `npm run dev` (since we're still in the development phase).
4. Place the Cabrillo logs in the `uploads/logs` folder.
5. After starting, call up the following URL in your browser: `http://127.0.0.1:3000/api/cabrillo/parse?filename=my_log.CBR`
6. Now the log will be read and the found ham operators (Germany) will be directly retrieved and stored in the database.

## Auto deployment
Push to main deploys to https://dev.frankencontest.de/api
Push a semver tag deploys to https://frankencontest.de/api