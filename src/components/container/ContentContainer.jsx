import {
  AppBar,
  Box,
  Button,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ContentContainer({ title, children, onAddClick, isLoading }) {
  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ flexGrow: 1 }}
          >
            {onAddClick && (
              <>
                {isLoading ? (
                  <Skeleton variant="rectangular" width={60} height={30} />
                ) : (
                  <Button
                    variant="contained"
                    onClick={onAddClick}
                    startIcon={<AddIcon />}
                  >
                    Create
                  </Button>
                )}
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: 4 }}>{isLoading && <LinearProgress />}</Box>
      <Box
        sx={{
          p: 4,
          minWidth: 300,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

export default ContentContainer;
