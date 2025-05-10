import Box from "@mui/material/Box";
import React from "react";

const InputWithDelete = ({children, onDelete, newInput}) => {
  return (
      <Box display="flex" alignItems="flex-start" gap={1}>
        {children}
        <img
            src="/close.svg"
            alt="Delete icon"
            onClick={onDelete}
            style={{
              cursor: 'pointer',
              width: '24px',
              visibility: newInput ? "hidden" : "visible",
              marginTop: '16px'
            }}
        />
      </Box>
  );
}

export default InputWithDelete;