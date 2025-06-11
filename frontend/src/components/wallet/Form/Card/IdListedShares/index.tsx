export function IdListedShares() {
  return (
    <StyledFormControl fullWidth error={!!errors.id_listed_shares}>
      <InputLabel id="acoes-select-label">Ação</InputLabel>
      <StyledSelect
        labelId="acoes-select-label"
        value={formData.id_listed_shares}
        onChange={handleAcoesChange}
        label="Ação"
        startAdornment={
          <InputAdornment position="start">
            <ShowChart />
          </InputAdornment>
        }
        disabled={loadingAcoes || !formData.id_client}
        endAdornment={
          loadingAcoes ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null
        }
      >
        {loadingAcoes ? (
          <MenuItem value="" disabled>
            Carregando ações...
          </MenuItem>
        ) : !formData.id_client ? (
          <MenuItem value="" disabled>
            Selecione um cliente primeiro
          </MenuItem>
        ) : Array.isArray(acoes) && acoes.length > 0 ? (
          acoes.map((a) => (
            <MenuItem key={a.id.toString()} value={a.id}>
              <Box display="flex" alignItems="center">
                <TickerChip
                  size="small"
                  label={a.ticker}
                  icon={<ShowChart />}
                  sx={{ mr: 1 }}
                />
                <Typography>{a.name}</Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Nenhuma ação disponível para este perfil
          </MenuItem>
        )}
      </StyledSelect>
      {errors.id_listed_shares && (
        <FormHelperText error>{errors.id_listed_shares}</FormHelperText>
      )}
    </StyledFormControl>
  );
}
