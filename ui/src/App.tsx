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
      <Typography variant="h3">Docker Wasm Extension Demo</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below buttons will trigger a request to a <strong>Wasm</strong> backend running an HTTP Server. Its
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
