export function InvestedAmount(){
    return (
        {formData.share_price &&
                formData.quantity_purchased &&
                formData.invested_amount && (
                  <Grid item xs={12}>
                    <SummaryCard>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Resumo do Investimento
                          </Typography>
                          <Typography variant="body1" fontWeight="500">
                            {formData.quantity_purchased} ações a{" "}
                            {formatCurrency(formData.share_price)} cada
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Typography variant="subtitle2" color="textSecondary">
                            Total Investido
                          </Typography>
                          <Typography
                            variant="h6"
                            color="success.main"
                            fontWeight="700"
                          >
                            {formatCurrency(formData.invested_amount)}
                          </Typography>
                        </Box>
                      </Box>
                    </SummaryCard>
                  </Grid>
                )}
    )
}