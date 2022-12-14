import React from "react";
import Button from "@mui/material/Button";
import { Stack, TextField, Typography } from "@mui/material";

export function App() {
  const [response, setResponse] = React.useState<string>();
  const [error, setError] = React.useState<Error>();

  const fetchAndDisplayResponse = (endpoint: string) => async () => {
    try {
      const result = await fetch(`http://localhost:1234${endpoint}`, {
        method: "POST",
        body: 'Hello from Wasm',
      });
      setResponse(await result.text());
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <Typography variant="h3">Docker extension demo</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This is a basic page rendered with MUI, using Docker's theme. Read the
        MUI documentation to learn more. Using MUI in a conventional way and
        avoiding custom styling will help make sure your extension continues to
        look great as Docker's theme evolves.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will trigger a request to the backend. Its
        response will appear in the textarea.
      </Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Stack spacing={2}>
          <Button variant="contained" onClick={fetchAndDisplayResponse('/echo')}>
            Echo From Backend
          </Button>
          <Button variant="contained" onClick={fetchAndDisplayResponse('/echo/reversed')}>
            Reverse From Backend
          </Button>
        </Stack>

        <TextField
          label="Backend response"
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={response ?? ""}
        />
      </Stack>
      {error && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {error.message}
        </Typography>
      )}
    </>
  );
}
