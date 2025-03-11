import Button from "@mui/material/Button";

const PrimaryButton = ({onClick, content}) => {
  return(
      <Button
          onClick={onClick}
          sx={{
              width: '100%',
              backgroundColor: '#7A51EC',
              borderRadius: '12px',
              color: '#FFFFFF',
              height: '48px',
              fontWeight: '600',
              fontSize: '16px',
              textTransform: 'none'
          }}
      >
          {content}
      </Button>
  )
}

export default PrimaryButton
