export function SharePrice() {
  return (
    <StyledTextField
      label="Preço da Ação"
      name="share_price"
      value={formData.share_price}
      onChange={handleInputChange}
      fullWidth
      error={!!errors.share_price}
      helperText={errors.share_price}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AttachMoney />
          </InputAdornment>
        ),
      }}
    />
  );
}
