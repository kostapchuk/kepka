import {Box, InputAdornment, TextField} from "@mui/material";

const TeamInputBlock = ({
                            teamName,
                            handleTeamBlur,
                            handleNewTeamBlur,
                            handleTeamNameChange,
                            handleTeamNameChangeByIndex,
                            newTeam,
                            error,
                            teamIndex,
                            handleDeleteTeam
                        }) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <TextField
                sx={{backgroundColor: '#F6F5F8'}}
                key={newTeam ? "emptyTeamInputKey" : teamIndex + "teamInputKey"}
                label={newTeam ? "Введите имя новой команды" : ""}
                value={teamName}
                onChange={(e) =>
                    newTeam ? handleTeamNameChange(e.target.value) : handleTeamNameChangeByIndex(teamIndex, e.target.value)
                }
                variant="outlined"
                onBlur={()=> newTeam ? handleNewTeamBlur() : handleTeamBlur(teamIndex)}
                fullWidth
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <img src="/cap.svg" alt="Cap"/>
                            </InputAdornment>
                        )
                    }
                }}
                error={error?.error}
                helperText={error?.helperText}
            />
            {newTeam ?
                <></>
                :
                <img
                    src="/close.svg"
                    alt="Delete team"
                    onClick={() => handleDeleteTeam(teamIndex)}
                    style={{cursor: 'pointer', marginLeft: '8px'}}
                />
            }
        </Box>
    )
}

export default TeamInputBlock
