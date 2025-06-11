export function QuantityPurchased() {
  return (
    <StyledTextField
      label="Quantidade Comprada"
      name="quantity_purchased"
      value={formData.quantity_purchased}
      onChange={handleInputChange}
      fullWidth
      error={!!errors.quantity_purchased}
      helperText={errors.quantity_purchased}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ShoppingCart />
          </InputAdornment>
        ),
      }}
    />
  );
}
