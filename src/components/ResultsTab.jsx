import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Collapse} from "@mui/material";
import Button from "@mui/material/Button";

const ResultsTab = () => {

    const {score} = useSelector(state => state.game);
    const {t} = useTranslation();
    const {wordStats} = useSelector(state => state.statistics);
    const [gameStats, setGameStats] = useState({});
    const [teamByTourStats, setTeamByTourStats] = useState({});
    const [playerByTourStats, setPlayerByTourStats] = useState({});
    const [wordByTourStats, setWordByTourStats] = useState({});

    const topTeam = Object.entries(score).reduce((highest, [team, currentScore]) => {
        return currentScore > highest[1] ? [team, currentScore] : highest;
    }, ['', -Infinity]);

    useEffect(() => {
        setGameStats(findEasiestAndHardestWords());
        setTeamByTourStats(findBestTeamPerTour());
        setPlayerByTourStats(findBestPlayerPerTour());
        setWordByTourStats(findEasiestAndHardestWordsPerTour());
    }, []);


    function findEasiestAndHardestWords() {
        // Group by word and sum up the time
        const wordTimeMap = {};

        wordStats.forEach(stat => {
            if (!wordTimeMap[stat.word]) {
                wordTimeMap[stat.word] = 0;
            }
            wordTimeMap[stat.word] += Number(stat.duration);
        });

        let easiestWord = null;
        let hardestWord = null;
        let minTime = Infinity;
        let maxTime = -Infinity;

        for (const word in wordTimeMap) {
            const totalTime = wordTimeMap[word];

            if (totalTime < minTime) {
                minTime = totalTime;
                easiestWord = word;
            }

            if (totalTime > maxTime) {
                maxTime = totalTime;
                hardestWord = word;
            }
        }

        return {
            easiest: {word: easiestWord, duration: Math.round(minTime / 1000)},
            hardest: {word: hardestWord, duration: Math.round(maxTime / 1000)}
        };
    }

    function findEasiestAndHardestWordsPerTour() {
        // Get unique tours
        const uniqueTours = [...new Set(wordStats.map(stat => stat.tour))];
        const results = {};

        uniqueTours.forEach(tourName => {
            // Filter stats for this tour
            const tourStats = wordStats.filter(stat => stat.tour === tourName);

            // Group by word and sum up the time
            const wordTimeMap = {};

            tourStats.forEach(stat => {
                if (!wordTimeMap[stat.word]) {
                    wordTimeMap[stat.word] = 0;
                }
                wordTimeMap[stat.word] += stat.duration;
            });

            let easiestWord = null;
            let hardestWord = null;
            let minTime = Infinity;
            let maxTime = -Infinity;

            for (const word in wordTimeMap) {
                const totalTime = wordTimeMap[word];

                if (totalTime < minTime) {
                    minTime = totalTime;
                    easiestWord = word;
                }

                if (totalTime > maxTime) {
                    maxTime = totalTime;
                    hardestWord = word;
                }
            }

            results[tourName] = {
                easiest: {word: easiestWord, duration: Math.round(minTime / 1000)},
                hardest: {word: hardestWord, duration: Math.round(maxTime / 1000)}
            };
        });

        return results;
    }

    function findBestTeamPerTour() {
        // Get unique tours
        const uniqueTours = [...new Set(wordStats.map(stat => stat.tour))];
        const results = {};

        uniqueTours.forEach(tourName => {
            // Filter stats for the specified tour
            const tourStats = wordStats.filter(stat => stat.tour === tourName);

            // Count words guessed by each team
            const teamWordCount = {};

            tourStats.forEach(stat => {
                if (!teamWordCount[stat.team]) {
                    teamWordCount[stat.team] = 0;
                }
                teamWordCount[stat.team]++;
            });

            let bestTeam = null;
            let maxWords = -Infinity;

            for (const team in teamWordCount) {
                const wordCount = teamWordCount[team];

                if (wordCount > maxWords) {
                    maxWords = wordCount;
                    bestTeam = team;
                }
            }

            results[tourName] = {
                team: bestTeam,
                wordCount: maxWords
            };
        });

        return results;
    }

    function findBestPlayerPerTour() {
        // Get unique tours
        const uniqueTours = [...new Set(wordStats.map(stat => stat.tour))];
        const results = {};

        uniqueTours.forEach(tourName => {
            // Filter stats for the specified tour
            const tourStats = wordStats.filter(stat => stat.tour === tourName);

            // Group by player and count words guessed for each
            const playerWordCount = {};
            const playerTeamMap = {}; // To keep track of which team each player belongs to

            tourStats.forEach(stat => {
                if (!playerWordCount[stat.player]) {
                    playerWordCount[stat.player] = 0;
                    playerTeamMap[stat.player] = stat.team;
                }
                playerWordCount[stat.player]++;
            });

            let bestPlayer = null;
            let bestTeam = null;
            let maxWords = -Infinity;

            for (const player in playerWordCount) {
                const wordCount = playerWordCount[player];

                if (wordCount > maxWords) {
                    maxWords = wordCount;
                    bestPlayer = player;
                    bestTeam = playerTeamMap[player];
                }
            }

            results[tourName] = {
                player: bestPlayer,
                team: bestTeam,
                wordCount: maxWords
            };
        });

        return results;
    }

    const [showDetailedStats, setShowDetailedStats] = useState(false);

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant="h3" sx={{fontSize: "20px", fontWeight: "600"}}>
                    {t('congratulations')}
                </Typography>
                <img src="/cap.png" alt="Cap" style={{width: '100px', paddingTop: '32px'}}/>
                <Typography sx={{fontSize: '16px', pt: 2.5}}>
                    {topTeam[0]}
                </Typography>
                <Typography sx={{fontSize: '16px', color: '#6B6B6B', pt: 1}}>
                    {topTeam[1]}
                </Typography>
                <Divider sx={{width: '95%', border: '1px solid #D1D1D1', mt: 4, mb: 2}}/>
                <Typography>
                    📍Самое простое слово - {gameStats?.easiest?.word}.
                    Команды потратили всего {gameStats?.easiest?.duration} секунд на отгадывание
                </Typography>
                <Typography>
                    ✍️Самое сложное слово - {gameStats?.hardest?.word}.
                    Команды потратили аж {gameStats?.hardest?.duration} секунд на отгадывание
                </Typography>
                <Button sx={{color: "#6B6B6B", backgroundColor: "#FFFFFF"}}
                        onClick={() => setShowDetailedStats(!showDetailedStats)}>
                    Показать детальную статистику
                </Button>
                <Collapse in={showDetailedStats} timeout="auto" unmountOnExit>
                    {[...new Set(wordStats.map(stat => stat.tour))].map(tour =>
                        <Typography>
                            💡Лучшей командой в туре: {t(tour.toLowerCase())} оказалась - {teamByTourStats[tour]?.team}
                            {" "}с количеством отвеченных слов - {teamByTourStats[tour]?.wordCount}
                        </Typography>
                    )}
                    <br/>
                    <br/>
                    {[...new Set(wordStats.map(stat => stat.tour))].map(tour =>
                        <Typography>
                            👉 Лучшей игроком в туре: {t(tour.toLowerCase())} оказался игрок
                            - {playerByTourStats[tour]?.player}
                            {" "} из команды {playerByTourStats[tour]?.team}. Игрок успел
                            загадать {playerByTourStats[tour]?.wordCount} слов
                        </Typography>
                    )}
                    <br/>
                    <br/>
                    {[...new Set(wordStats.map(stat => stat.tour))].map(tour =>
                        <>
                            <Typography>
                                📌Самое простое слово в
                                туре {t(tour.toLowerCase())} - {wordByTourStats[tour]?.easiest?.word}.
                                Команды потратили всего {wordByTourStats[tour]?.easiest?.duration} секунды на
                                отгадывание
                            </Typography>
                            <Typography>
                                📌Самое сложное слово в туре {t(tour.toLowerCase())} - {wordByTourStats[tour]?.word}.
                                Команды потратили аж {wordByTourStats[tour]?.hardest?.duration} секунд на
                                отгадывание
                            </Typography>
                        </>
                    )}
                </Collapse>
            </Box>
        </Box>
    )
}

export default ResultsTab;
