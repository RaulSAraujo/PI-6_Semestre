INSERT INTO profile (id, `type`, created_at, updated_at, deleted_at, description)
VALUES
(DEFAULT, 'moderate', '2025-04-12 12:46:02.197', '2025-04-12 12:46:02.197', NULL, 'Moderado'),
(DEFAULT, 'undefined', '2025-05-25 09:53:15.341', '2025-04-12 12:46:06.801', NULL, 'Indefinido'),
(DEFAULT, 'aggressive', '2025-04-12 12:46:06.801', '2025-04-12 12:46:06.801', NULL, 'Agressivo'),
(DEFAULT, 'conservative', '2025-04-12 12:45:56.613', '2025-04-12 12:45:56.613', NULL, 'Conservador');


INSERT INTO listed_shares (id, ticker, `name`, b3_sector_classification, id_profile, created_at, updated_at, deleted_at)
VALUES
(DEFAULT, 'EMBR3', 'Embraer SA', 'Bens Industriais / Material de Transporte / Material Aeronáutico e de Defesa', 1, '2025-04-12 12:57:51.162', '2025-04-12 12:57:51.162', NULL),
(DEFAULT, 'BBAS3', 'Banco do Brasil SA', 'Financeiro / Intermediários Financeiros / Bancos', 2, '2025-04-12 13:05:24.086', '2025-04-12 13:05:24.086', NULL),
(DEFAULT, 'TOTS3', 'TOTVS SA', 'Tecnologia da Informação / Programas e Serviços / Programas e Serviços', 2, '2025-04-12 13:02:27.103', '2025-04-12 13:02:27.103', NULL),
(DEFAULT, 'VIVA3', 'Vivara SA', 'Consumo Cíclico / Tecidos. Vestuário e Calçados / Acessórios', 2, '2025-04-12 16:05:49.393', '2025-04-12 16:05:49.393', NULL),
(DEFAULT, 'KLBN3', 'KLABIN SA', 'Materiais Básicos / Madeira e Papel / Papel e Celulose', 2, '2025-04-12 16:06:54.829', '2025-04-12 16:06:54.829', NULL),
(DEFAULT, 'PETR4', 'Petróleo Brasileiro SA Petrobras', 'Petróleo. Gás e Biocombustíveis / Petróleo. Gás e Biocombustíveis / Exploração. Refino e Distribuição', 2, '2025-04-12 16:08:05.591', '2025-04-12 16:08:05.591', NULL);
