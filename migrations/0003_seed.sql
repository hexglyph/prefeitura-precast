-- Seed base indicators and results for dashboard KPIs
INSERT INTO indicators (indicator_id, name, metadata) VALUES
  (1000, 'População Total - Município', '{"unit":"habitantes"}'),
  (1001, 'Índice de Qualidade Urbana', '{"unit":"pontos"}'),
  (1002, 'Alertas Ativos', '{"unit":"contagem"}'),
  (1003, 'Eficiência Operacional', '{"unit":"percentual"}')
ON CONFLICT (indicator_id) DO NOTHING;

-- Populate monthly results for São Paulo (MUN)
-- População (milhões)
INSERT INTO indicator_results (indicator_id, nivel, regiao_code, regiao_name, periodo, value_num, value_raw)
VALUES
  (1000, 'MUN', 3550308, 'São Paulo', '2024-06', 12.35, '12.35'),
  (1000, 'MUN', 3550308, 'São Paulo', '2024-07', 12.38, '12.38'),
  (1000, 'MUN', 3550308, 'São Paulo', '2024-08', 12.40, '12.40'),
  (1000, 'MUN', 3550308, 'São Paulo', '2024-09', 12.42, '12.42')
ON CONFLICT DO NOTHING;

-- Índice de Qualidade (0-10)
INSERT INTO indicator_results (indicator_id, nivel, regiao_code, regiao_name, periodo, value_num, value_raw)
VALUES
  (1001, 'MUN', 3550308, 'São Paulo', '2024-06', 8.0, '8.0'),
  (1001, 'MUN', 3550308, 'São Paulo', '2024-07', 8.1, '8.1'),
  (1001, 'MUN', 3550308, 'São Paulo', '2024-08', 8.2, '8.2'),
  (1001, 'MUN', 3550308, 'São Paulo', '2024-09', 8.2, '8.2')
ON CONFLICT DO NOTHING;

-- Alertas ativos (contagem)
INSERT INTO indicator_results (indicator_id, nivel, regiao_code, regiao_name, periodo, value_num, value_raw)
VALUES
  (1002, 'MUN', 3550308, 'São Paulo', '2024-06', 10, '10'),
  (1002, 'MUN', 3550308, 'São Paulo', '2024-07', 11, '11'),
  (1002, 'MUN', 3550308, 'São Paulo', '2024-08', 12, '12'),
  (1002, 'MUN', 3550308, 'São Paulo', '2024-09', 13, '13')
ON CONFLICT DO NOTHING;

-- Eficiência (%)
INSERT INTO indicator_results (indicator_id, nivel, regiao_code, regiao_name, periodo, value_num, value_raw)
VALUES
  (1003, 'MUN', 3550308, 'São Paulo', '2024-06', 0.85, '85%'),
  (1003, 'MUN', 3550308, 'São Paulo', '2024-07', 0.86, '86%'),
  (1003, 'MUN', 3550308, 'São Paulo', '2024-08', 0.87, '87%'),
  (1003, 'MUN', 3550308, 'São Paulo', '2024-09', 0.88, '88%')
ON CONFLICT DO NOTHING;

-- Some initial insights
INSERT INTO insights (scope, input, output, metadata)
VALUES
  ('geral', '{"seed":true}', 'Município apresentou melhora gradual na eficiência e estabilidade no índice de qualidade. Recomenda-se manter políticas que reduziram o tempo de resposta e reforçar regiões com maior concentração de incidentes.', '{"seed":true}');
