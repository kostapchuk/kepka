import {Checkbox, FormControlLabel, Typography} from "@mui/material";

const GuessedWordsOptions = ({roundWords, roundAnsweredWords, setRoundAnsweredWords}) => {
    return (
        roundWords.map(option => (
            <FormControlLabel key={Math.random()} control={<Checkbox
                key={Math.random()}
                checked={roundAnsweredWords.includes(option)}
                onChange={() => {
                  if (roundAnsweredWords.includes(option)) {
                    setRoundAnsweredWords(prevWords => prevWords.filter(word => word !== option));
                  } else {
                    setRoundAnsweredWords(prevWords => [...prevWords, option])
                  }
                }}
                sx={{
                  '&.Mui-checked': { transform: 'scale(1.5)' },
                  transform: 'scale(1.5)',
                  padding: '10px',
                }}
            />} label={
              <Typography variant="body1" style={{fontSize: '25px'}}>
                {option}
              </Typography>
            }/>
        ))
    )
};

export default GuessedWordsOptions;