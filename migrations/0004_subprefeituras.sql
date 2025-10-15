-- Subprefeituras master data and related structures

CREATE TABLE IF NOT EXISTS subprefeituras (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT,
  description TEXT,
  population INTEGER,
  area_km2 NUMERIC,
  density_per_km2 NUMERIC,
  performance NUMERIC,
  alerts INTEGER DEFAULT 0,
  trend TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subprefeitura_districts (
  id BIGSERIAL PRIMARY KEY,
  subprefeitura_id TEXT NOT NULL REFERENCES subprefeituras(id) ON DELETE CASCADE,
  name TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_subprefeitura_districts_subprefeitura
  ON subprefeitura_districts (subprefeitura_id);

CREATE TABLE IF NOT EXISTS subprefeitura_highlights (
  id BIGSERIAL PRIMARY KEY,
  subprefeitura_id TEXT NOT NULL REFERENCES subprefeituras(id) ON DELETE CASCADE,
  highlight TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_subprefeitura_highlights_subprefeitura
  ON subprefeitura_highlights (subprefeitura_id);

CREATE TABLE IF NOT EXISTS subprefeitura_metrics (
  id BIGSERIAL PRIMARY KEY,
  subprefeitura_id TEXT NOT NULL REFERENCES subprefeituras(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  value NUMERIC,
  target NUMERIC,
  extra JSONB DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_subprefeitura_metrics_subprefeitura
  ON subprefeitura_metrics (subprefeitura_id);

CREATE TABLE IF NOT EXISTS subprefeitura_monthly_indicators (
  id BIGSERIAL PRIMARY KEY,
  subprefeitura_id TEXT NOT NULL REFERENCES subprefeituras(id) ON DELETE CASCADE,
  period TEXT NOT NULL,
  populacao NUMERIC,
  economia NUMERIC,
  seguranca NUMERIC,
  UNIQUE (subprefeitura_id, period)
);

CREATE TABLE IF NOT EXISTS subprefeitura_alerts (
  id BIGSERIAL PRIMARY KEY,
  subprefeitura_id TEXT NOT NULL REFERENCES subprefeituras(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  severity TEXT,
  area TEXT,
  timeframe TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_subprefeitura_alerts_subprefeitura
  ON subprefeitura_alerts (subprefeitura_id);

CREATE TABLE IF NOT EXISTS subprefeitura_services (
  id BIGSERIAL PRIMARY KEY,
  subprefeitura_id TEXT NOT NULL REFERENCES subprefeituras(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  service_type TEXT,
  address TEXT,
  status TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_subprefeitura_services_subprefeitura
  ON subprefeitura_services (subprefeitura_id);

CREATE TABLE IF NOT EXISTS subprefeitura_demographics (
  id BIGSERIAL PRIMARY KEY,
  subprefeitura_id TEXT NOT NULL REFERENCES subprefeituras(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  percentage NUMERIC,
  population INTEGER
);
CREATE INDEX IF NOT EXISTS idx_subprefeitura_demographics_subprefeitura
  ON subprefeitura_demographics (subprefeitura_id);

-- Seed dataset for all 32 subprefeituras

CREATE TEMP TABLE seed_subprefeituras (
  id TEXT,
  name TEXT,
  region TEXT,
  description TEXT,
  population INTEGER,
  area_km2 NUMERIC,
  performance NUMERIC,
  alerts INTEGER,
  trend TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  idh NUMERIC,
  renda_media NUMERIC,
  escolaridade_media NUMERIC,
  expectativa_vida NUMERIC,
  seguranca_score NUMERIC,
  educacao_score NUMERIC,
  saude_score NUMERIC,
  transporte_score NUMERIC,
  limpeza_score NUMERIC,
  economia_score NUMERIC
);

INSERT INTO seed_subprefeituras VALUES
  ('aricanduva-formosa-carrao', 'Aricanduva/Formosa/Carrão', 'Zona Leste', 'Eixo leste com forte presença comercial e logística.', 410000, 21.5, 78, 2, 'up', -23.5540, -46.5190, 0.79, 3100, 9.5, 74.8, 72, 78, 74, 70, 76, 75),
  ('butanta', 'Butantã', 'Zona Oeste', 'Região universitária e residencial com forte presença de pesquisa e inovação.', 428000, 56.1, 89, 1, 'stable', -23.5629, -46.7291, 0.901, 5120, 11.8, 79.1, 91, 94, 88, 85, 92, 90),
  ('campo-limpo', 'Campo Limpo', 'Zona Sul', 'Área com grande população e programas sociais ativos.', 607000, 36.7, 72, 4, 'up', -23.6532, -46.7089, 0.78, 2980, 9.0, 74.0, 68, 75, 71, 69, 78, 70),
  ('capela-do-socorro', 'Capela do Socorro', 'Zona Sul', 'Região com áreas de mananciais e bairros populosos.', 594000, 134.2, 74, 3, 'stable', -23.7080, -46.6980, 0.745, 2700, 8.8, 73.2, 70, 74, 72, 68, 77, 73),
  ('casa-verde-cachoeirinha', 'Casa Verde/Cachoeirinha', 'Zona Norte', 'Região tradicional com boa infraestrutura urbana.', 309000, 26.7, 81, 2, 'up', -23.4910, -46.6640, 0.82, 3600, 10.5, 76.5, 83, 82, 79, 78, 85, 81),
  ('cidade-ademar', 'Cidade Ademar', 'Zona Sul', 'Região em processo de urbanização com crescimento populacional.', 266000, 30.7, 73, 3, 'stable', -23.6543, -46.6452, 0.742, 2680, 8.7, 73.1, 71, 74, 72, 68, 77, 73),
  ('cidade-tiradentes', 'Cidade Tiradentes', 'Zona Leste', 'Conjunto habitacional de grande porte com alta densidade.', 211000, 15.0, 69, 5, 'up', -23.5890, -46.4140, 0.71, 2400, 8.2, 72.8, 65, 72, 68, 64, 74, 67),
  ('ermelino-matarazzo', 'Ermelino Matarazzo', 'Zona Leste', 'Área leste com tradição industrial e serviços emergentes.', 207000, 15.1, 76, 2, 'stable', -23.5000, -46.4760, 0.76, 2900, 9.0, 74.0, 74, 78, 75, 73, 79, 77),
  ('freguesia-brasilandia', 'Freguesia/Brasilândia', 'Zona Norte', 'Região norte com forte identidade cultural.', 394000, 31.4, 79, 3, 'stable', -23.4690, -46.7000, 0.78, 3050, 9.3, 74.5, 77, 81, 78, 75, 82, 80),
  ('guaianases', 'Guaianases', 'Zona Leste', 'Bairro com expansão urbana e projetos sociais.', 268000, 17.8, 71, 4, 'up', -23.5420, -46.4050, 0.73, 2600, 8.5, 73.0, 68, 73, 70, 67, 75, 72),
  ('ipiranga', 'Ipiranga', 'Zona Sudeste', 'Região histórica com importância nacional e polos de inovação.', 463000, 37.5, 84, 1, 'up', -23.5823, -46.6090, 0.875, 4380, 11.2, 77.4, 86, 85, 82, 81, 87, 85),
  ('itaim-paulista', 'Itaim Paulista', 'Zona Leste', 'Extremo leste com forte presença de comércio local.', 224000, 21.7, 75, 3, 'stable', -23.4940, -46.4110, 0.75, 2800, 8.9, 73.6, 73, 77, 74, 72, 78, 76),
  ('itaquera', 'Itaquera', 'Zona Leste', 'Área com grandes equipamentos esportivos e culturais.', 523000, 54.3, 77, 2, 'up', -23.5430, -46.4480, 0.765, 2950, 9.4, 75.0, 75, 79, 76, 74, 80, 78),
  ('jabaquara', 'Jabaquara', 'Zona Sul', 'Região sul bem conectada ao centro.', 223000, 14.1, 82, 1, 'stable', -23.6260, -46.6420, 0.83, 3800, 11.0, 76.8, 84, 83, 80, 85, 84, 82),
  ('jacana-tremembe', 'Jaçanã/Tremembé', 'Zona Norte', 'Região com grandes áreas verdes e serras.', 323000, 65.1, 80, 2, 'up', -23.4560, -46.5950, 0.795, 3200, 9.8, 75.5, 79, 80, 77, 75, 83, 81),
  ('lapa', 'Lapa', 'Zona Oeste', 'Polo econômico e cultural com forte presença de serviços.', 305000, 40.8, 86, 1, 'up', -23.5270, -46.7030, 0.86, 4500, 11.5, 78.5, 87, 88, 84, 83, 89, 87),
  ('mboi-mirim', 'M''Boi Mirim', 'Zona Sul', 'Região com grande população e desafios socioambientais.', 562000, 62.0, 71, 4, 'up', -23.6660, -46.7600, 0.73, 2700, 8.6, 73.0, 67, 72, 70, 66, 74, 69),
  ('mooca', 'Mooca', 'Zona Leste', 'Bairro tradicional com forte presença industrial e de serviços.', 343000, 35.8, 85, 2, 'up', -23.5590, -46.6010, 0.86, 4300, 11.3, 78.0, 86, 87, 83, 82, 88, 86),
  ('parelheiros', 'Parelheiros', 'Zona Sul', 'Área com grande cobertura ambiental e comunidades rurais.', 150000, 353.5, 70, 3, 'stable', -23.8110, -46.7280, 0.70, 2200, 8.0, 72.0, 65, 70, 68, 62, 73, 66),
  ('penha', 'Penha', 'Zona Leste', 'Região com tradição religiosa e comércio diversificado.', 504000, 43.7, 78, 2, 'stable', -23.5220, -46.5410, 0.78, 3100, 9.7, 74.8, 74, 79, 76, 73, 80, 77),
  ('perus-anhanguera', 'Perus/Anhanguera', 'Zona Noroeste', 'Eixo noroeste com áreas industriais e residenciais.', 166000, 56.1, 73, 2, 'down', -23.4200, -46.7500, 0.74, 2500, 8.5, 73.5, 70, 74, 72, 68, 76, 73),
  ('pinheiros', 'Pinheiros', 'Zona Oeste', 'Região dinâmica com polos de tecnologia e cultura.', 295000, 31.0, 90, 1, 'up', -23.5610, -46.6980, 0.91, 6200, 12.3, 80.2, 92, 94, 90, 89, 93, 92),
  ('pirituba-jaragua', 'Pirituba/Jaraguá', 'Zona Noroeste', 'Polo logístico e residencial em crescimento.', 462000, 55.1, 79, 2, 'stable', -23.4730, -46.7310, 0.78, 3050, 9.3, 74.7, 76, 80, 77, 74, 81, 78),
  ('santana-tucuruvi', 'Santana/Tucuruvi', 'Zona Norte', 'Região com forte presença residencial e serviços de saúde.', 318000, 35.1, 83, 2, 'up', -23.4890, -46.6270, 0.84, 4000, 10.8, 77.0, 84, 85, 82, 80, 86, 84),
  ('santo-amaro', 'Santo Amaro', 'Zona Sul', 'Centro empresarial com grande oferta de serviços.', 239000, 37.0, 84, 2, 'stable', -23.6520, -46.7050, 0.85, 4200, 11.2, 77.8, 85, 84, 81, 82, 86, 85),
  ('sao-mateus', 'São Mateus', 'Zona Leste', 'Região com parques industriais e bairros residenciais.', 436000, 45.0, 75, 3, 'stable', -23.5860, -46.4600, 0.745, 2700, 8.9, 73.5, 72, 76, 74, 70, 78, 75),
  ('sao-miguel-paulista', 'São Miguel Paulista', 'Zona Leste', 'Extremo leste com forte identidade cultural.', 371000, 24.3, 74, 3, 'up', -23.4940, -46.4270, 0.75, 2800, 9.0, 73.7, 71, 75, 73, 69, 77, 74),
  ('sapopemba', 'Sapopemba', 'Zona Leste', 'Região densamente povoada com mobilidade em expansão.', 310000, 13.0, 73, 3, 'up', -23.6000, -46.5150, 0.74, 2650, 8.7, 73.0, 70, 74, 72, 68, 76, 73),
  ('centro', 'Centro', 'Região Central', 'Principal hub administrativo e econômico da cidade.', 523000, 26.2, 88, 2, 'up', -23.5505, -46.6333, 0.892, 4850, 12.3, 78.2, 92, 95, 89, 85, 94, 96),
  ('vila-maria-vila-guilherme', 'Vila Maria/Vila Guilherme', 'Zona Norte', 'Região logística com conexões viárias estratégicas.', 324000, 26.0, 80, 2, 'stable', -23.5050, -46.5940, 0.80, 3200, 9.9, 75.5, 78, 81, 79, 76, 82, 80),
  ('vila-mariana', 'Vila Mariana', 'Zona Sul', 'Região consolidada com polos educacionais e culturais.', 344000, 26.5, 89, 1, 'up', -23.5880, -46.6330, 0.90, 5600, 12.0, 79.5, 91, 92, 87, 88, 93, 90),
  ('vila-prudente', 'Vila Prudente', 'Zona Leste', 'Região leste com boa conectividade e serviços.', 529000, 33.3, 78, 2, 'up', -23.5850, -46.5700, 0.78, 3100, 9.5, 74.8, 76, 80, 77, 75, 81, 79);

INSERT INTO subprefeituras (
  id,
  name,
  region,
  description,
  population,
  area_km2,
  density_per_km2,
  performance,
  alerts,
  trend,
  latitude,
  longitude,
  metadata
)
SELECT
  id,
  name,
  region,
  description,
  population,
  area_km2,
  CASE WHEN area_km2 > 0 THEN ROUND(population::numeric / area_km2, 0) ELSE NULL END,
  performance,
  alerts,
  trend,
  latitude,
  longitude,
  jsonb_build_object(
    'idh', idh,
    'renda_media', renda_media,
    'escolaridade_media', escolaridade_media,
    'expectativa_vida', expectativa_vida
  )
FROM seed_subprefeituras
ON CONFLICT (id) DO NOTHING;

CREATE TEMP TABLE seed_subpref_districts (
  subprefeitura_id TEXT,
  district TEXT
);

INSERT INTO seed_subpref_districts VALUES
  ('aricanduva-formosa-carrao', 'Aricanduva'),
  ('aricanduva-formosa-carrao', 'Vila Formosa'),
  ('aricanduva-formosa-carrao', 'Carrão'),
  ('butanta', 'Butantã'),
  ('butanta', 'Morumbi'),
  ('butanta', 'Raposo Tavares'),
  ('butanta', 'Rio Pequeno'),
  ('butanta', 'Vila Sônia'),
  ('campo-limpo', 'Campo Limpo'),
  ('campo-limpo', 'Capão Redondo'),
  ('campo-limpo', 'Vila Andrade'),
  ('capela-do-socorro', 'Capela do Socorro'),
  ('capela-do-socorro', 'Cidade Dutra'),
  ('capela-do-socorro', 'Grajaú'),
  ('casa-verde-cachoeirinha', 'Casa Verde'),
  ('casa-verde-cachoeirinha', 'Cachoeirinha'),
  ('casa-verde-cachoeirinha', 'Limão'),
  ('cidade-ademar', 'Cidade Ademar'),
  ('cidade-ademar', 'Pedreira'),
  ('cidade-tiradentes', 'Cidade Tiradentes'),
  ('ermelino-matarazzo', 'Ermelino Matarazzo'),
  ('ermelino-matarazzo', 'Ponte Rasa'),
  ('freguesia-brasilandia', 'Freguesia do Ó'),
  ('freguesia-brasilandia', 'Brasilândia'),
  ('guaianases', 'Guaianases'),
  ('guaianases', 'Lajeado'),
  ('ipiranga', 'Ipiranga'),
  ('ipiranga', 'Cursino'),
  ('ipiranga', 'Sacomã'),
  ('itaim-paulista', 'Itaim Paulista'),
  ('itaim-paulista', 'Vila Curuçá'),
  ('itaquera', 'Itaquera'),
  ('itaquera', 'Cidade Líder'),
  ('itaquera', 'José Bonifácio'),
  ('itaquera', 'Parque do Carmo'),
  ('jabaquara', 'Jabaquara'),
  ('jacana-tremembe', 'Jaçanã'),
  ('jacana-tremembe', 'Tremembé'),
  ('lapa', 'Lapa'),
  ('lapa', 'Barra Funda'),
  ('lapa', 'Perdizes'),
  ('lapa', 'Jaguaré'),
  ('mboi-mirim', 'Jardim Ângela'),
  ('mboi-mirim', 'Jardim São Luís'),
  ('mooca', 'Mooca'),
  ('mooca', 'Água Rasa'),
  ('mooca', 'Belém'),
  ('parelheiros', 'Parelheiros'),
  ('parelheiros', 'Marsilac'),
  ('penha', 'Penha'),
  ('penha', 'Vila Matilde'),
  ('penha', 'Cangaíba'),
  ('penha', 'Artur Alvim'),
  ('perus-anhanguera', 'Perus'),
  ('perus-anhanguera', 'Anhanguera'),
  ('pinheiros', 'Pinheiros'),
  ('pinheiros', 'Alto de Pinheiros'),
  ('pinheiros', 'Itaim Bibi'),
  ('pinheiros', 'Jardim Paulista'),
  ('pirituba-jaragua', 'Pirituba'),
  ('pirituba-jaragua', 'Jaraguá'),
  ('pirituba-jaragua', 'São Domingos'),
  ('santana-tucuruvi', 'Santana'),
  ('santana-tucuruvi', 'Tucuruvi'),
  ('santana-tucuruvi', 'Mandaqui'),
  ('santo-amaro', 'Santo Amaro'),
  ('santo-amaro', 'Campo Belo'),
  ('santo-amaro', 'Campo Grande'),
  ('sao-mateus', 'São Mateus'),
  ('sao-mateus', 'São Rafael'),
  ('sao-mateus', 'Iguatemi'),
  ('sao-miguel-paulista', 'São Miguel'),
  ('sao-miguel-paulista', 'Jardim Helena'),
  ('sao-miguel-paulista', 'Vila Jacuí'),
  ('sapopemba', 'Sapopemba'),
  ('centro', 'Sé'),
  ('centro', 'República'),
  ('centro', 'Bela Vista'),
  ('centro', 'Consolação'),
  ('centro', 'Santa Cecília'),
  ('centro', 'Liberdade'),
  ('centro', 'Cambuci'),
  ('centro', 'Bom Retiro'),
  ('vila-maria-vila-guilherme', 'Vila Maria'),
  ('vila-maria-vila-guilherme', 'Vila Guilherme'),
  ('vila-maria-vila-guilherme', 'Vila Medeiros'),
  ('vila-mariana', 'Vila Mariana'),
  ('vila-mariana', 'Moema'),
  ('vila-mariana', 'Saúde'),
  ('vila-prudente', 'Vila Prudente'),
  ('vila-prudente', 'São Lucas');

INSERT INTO subprefeitura_districts (subprefeitura_id, name)
SELECT d.subprefeitura_id, d.district
FROM seed_subpref_districts d
WHERE NOT EXISTS (
  SELECT 1
  FROM subprefeitura_districts existing
  WHERE existing.subprefeitura_id = d.subprefeitura_id
    AND existing.name = d.district
);

INSERT INTO subprefeitura_highlights (subprefeitura_id, highlight)
SELECT seed.id, highlight.highlight_text
FROM seed_subprefeituras seed
CROSS JOIN LATERAL (
  VALUES
    ('Projetos estratégicos em ' || seed.name),
    ('Iniciativas de inovação na ' || COALESCE(seed.region, seed.name)),
    ('Engajamento comunitário fortalecido em ' || seed.name)
) AS highlight(highlight_text)
WHERE NOT EXISTS (
  SELECT 1
  FROM subprefeitura_highlights existing
  WHERE existing.subprefeitura_id = seed.id
    AND existing.highlight = highlight.highlight_text
);

INSERT INTO subprefeitura_metrics (subprefeitura_id, category, value, target, extra)
SELECT seed.id, metric.category, metric.value, metric.target, metric.extra
FROM seed_subprefeituras seed
CROSS JOIN LATERAL (
  VALUES
    ('Segurança', seed.seguranca_score, 90, jsonb_build_object('incidents', GREATEST(CEILING(seed.population::numeric / 4000)::int, 40))),
    ('Educação', seed.educacao_score, 90, jsonb_build_object('schools', GREATEST(CEILING(seed.population::numeric / 6000)::int, 8))),
    ('Saúde', seed.saude_score, 85, jsonb_build_object('units', GREATEST(CEILING(seed.population::numeric / 7000)::int, 6))),
    ('Transporte', seed.transporte_score, 82, jsonb_build_object('lines', GREATEST(CEILING(seed.population::numeric / 45000)::int, 4))),
    ('Limpeza', seed.limpeza_score, 90, jsonb_build_object('coverage', LEAST(100, seed.limpeza_score + 4))),
    ('Economia', seed.economia_score, 88, jsonb_build_object('businesses', GREATEST(CEILING(seed.population::numeric * 0.03)::int, 1500)))
) AS metric(category, value, target, extra)
WHERE NOT EXISTS (
  SELECT 1
  FROM subprefeitura_metrics existing
  WHERE existing.subprefeitura_id = seed.id
    AND existing.category = metric.category
);

WITH monthly_generated AS (
  SELECT
    seed.id,
    months.period,
    GREATEST(0, (seed.population - 2000) + (months.offset * 800))::numeric AS populacao,
    LEAST(100, seed.economia_score + months.offset - 2)::numeric AS economia,
    LEAST(100, seed.seguranca_score + months.offset - 2)::numeric AS seguranca
  FROM seed_subprefeituras seed
  CROSS JOIN LATERAL (
    VALUES
      ('2024-05', 0),
      ('2024-06', 1),
      ('2024-07', 2),
      ('2024-08', 3),
      ('2024-09', 4)
  ) AS months(period, offset)
)
INSERT INTO subprefeitura_monthly_indicators (subprefeitura_id, period, populacao, economia, seguranca)
SELECT mg.id, mg.period, mg.populacao, mg.economia, mg.seguranca
FROM monthly_generated mg
WHERE NOT EXISTS (
  SELECT 1
  FROM subprefeitura_monthly_indicators existing
  WHERE existing.subprefeitura_id = mg.id
    AND existing.period = mg.period
);

INSERT INTO subprefeitura_alerts (subprefeitura_id, message, severity, area, timeframe, metadata)
SELECT seed.id,
       alert.message,
       alert.severity,
       alert.area,
       alert.timeframe,
       jsonb_build_object('source', 'seed')
FROM seed_subprefeituras seed
CROSS JOIN LATERAL (
  VALUES
    ('medium', 'Serviços', '6h', 'Atenção a aumento de demanda em ' || seed.name),
    ('low', 'Infraestrutura', '1d', 'Obras e manutenção programadas em ' || seed.name)
) AS alert(severity, area, timeframe, message)
WHERE NOT EXISTS (
  SELECT 1
  FROM subprefeitura_alerts existing
  WHERE existing.subprefeitura_id = seed.id
    AND existing.message = alert.message
);

INSERT INTO subprefeitura_services (subprefeitura_id, name, service_type, address, status, metadata)
SELECT seed.id,
       service.name,
       service.service_type,
       service.address,
       service.status,
       jsonb_build_object('source', 'seed')
FROM seed_subprefeituras seed
CROSS JOIN LATERAL (
  VALUES
    ('UBS ' || seed.name, 'Saúde', 'Av. Principal, 100 - ' || seed.name, 'Funcionando'),
    ('CEU ' || seed.name, 'Educação', 'Complexo Educacional, 200 - ' || seed.name, 'Funcionando')
) AS service(name, service_type, address, status)
WHERE NOT EXISTS (
  SELECT 1
  FROM subprefeitura_services existing
  WHERE existing.subprefeitura_id = seed.id
    AND existing.name = service.name
);

WITH pop_split AS (
  SELECT
    id,
    population,
    ROUND(population * 0.22)::int AS pop_0_17,
    ROUND(population * 0.31)::int AS pop_18_34,
    ROUND(population * 0.29)::int AS pop_35_54
  FROM seed_subprefeituras
),
pop_final AS (
  SELECT
    id,
    population,
    pop_0_17,
    pop_18_34,
    pop_35_54,
    GREATEST(population - pop_0_17 - pop_18_34 - pop_35_54, 0) AS pop_55
  FROM pop_split
),
demographics_source AS (
  SELECT id, '0-17 anos'::text AS category, 22::numeric AS percentage, pop_0_17 AS pop_count FROM pop_final
  UNION ALL
  SELECT id, '18-34 anos', 31::numeric, pop_18_34 FROM pop_final
  UNION ALL
  SELECT id, '35-54 anos', 29::numeric, pop_35_54 FROM pop_final
  UNION ALL
  SELECT id, '55+ anos', 18::numeric, pop_55 FROM pop_final
)
INSERT INTO subprefeitura_demographics (subprefeitura_id, category, percentage, population)
SELECT ds.id, ds.category, ds.percentage, ds.pop_count
FROM demographics_source ds
WHERE NOT EXISTS (
  SELECT 1
  FROM subprefeitura_demographics existing
  WHERE existing.subprefeitura_id = ds.id
    AND existing.category = ds.category
);

DROP TABLE seed_subpref_districts;
DROP TABLE seed_subprefeituras;
