import {Box, TextField} from "@mui/material";

const PlayerInputBlock = ({
                              teamIndex,
                              playerIndex,
                              player,
                              handlePlayerNameChangeByIndex,
                              handlePlayerNameChange,
                              handlePlayerBlur,
                              handleNewPlayerBlur,
                              error,
                              handleDeletePlayer,
                              newPlayer
                          }) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <TextField
                key={`${teamIndex}${playerIndex}`}
                value={player}
                onChange={(e) =>
                    newPlayer ? handlePlayerNameChange(teamIndex, e.target.value) : handlePlayerNameChangeByIndex(playerIndex, teamIndex, e.target.value)
                }
                variant="outlined"
                onBlur={()=> newPlayer ? handleNewPlayerBlur(teamIndex) : handlePlayerBlur(teamIndex, playerIndex)}
                fullWidth
                error={error}
                helperText={error?.helperText}
            />
            {!newPlayer &&
                <img
                    src="/close.svg"
                    alt="Delete player"
                    onClick={() => handleDeletePlayer(teamIndex, playerIndex)}
                    style={{cursor: 'pointer', marginLeft: '8px'}}
                />
            }
        </Box>
    )
}

export default PlayerInputBlock
