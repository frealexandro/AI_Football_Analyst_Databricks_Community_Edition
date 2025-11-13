# ⚽ AI Football Analyst - Databricks Hackathon

**Plataforma:** Databricks Community Edition (FREE tier)
**Dataset:** English Premier League Stats 2021-2024 (Kaggle)
**Usuario Databricks:** randryan308@gmail.com

---

## 📂 Estructura del Proyecto

```
databricks_hakathon/
├── README.md                              # Este archivo
├── CLAUDE.md                              # Reglas del proyecto
├── FOOTBALL_PROGRESS.md                   # Plan de 6 fases con tasks
├── FOOTBALL_ANALYST_ARCHITECTURE.md       # Arquitectura técnica
│
├── 00_setup_config.py                     # FASE 0: Setup inicial ✅
├── 01_data_ingestion.py                   # FASE 1: Carga de datos ✅
├── 02_feature_engineering.py              # FASE 2: Features para ML ✅
│
├── 03_ml_models.py                        # FASE 3: Modelos ML (pendiente)
├── 04_dashboards.py                       # FASE 4: Dashboards (pendiente)
└── 05_ai_functions.py                     # FASE 5: AI Functions (pendiente)
```

---

## 🚀 Estado Actual

### ✅ Completado:

- **FASE 0:** Setup y configuración
  - MLflow configurado (básico, sin registry)
  - Funciones de utilidad creadas

- **FASE 1:** Data Ingestion
  - Dataset EPL descargado desde Kaggle
  - Limpieza de nombres de columnas para Delta Lake
  - Tabla creada: `football_mydata_raw`

- **FASE 2:** Feature Engineering (en ejecución)
  - Limpieza y normalización de datos
  - Estadísticas por equipo
  - Forma reciente (últimos 5 partidos)
  - Home advantage factors
  - 5 Delta Tables: clean, team_matches, team_stats, venue_stats, team_form

### 🔄 En Progreso:

- **FASE 2:** Ejecutando en Databricks

### ⏳ Pendiente:

- **FASE 3:** ML Models + MLflow
- **FASE 4:** SQL Dashboards (vía notebooks)
- **FASE 5:** AI Functions (widgets interactivos)
- **FASE 6:** Documentación final

---

## 🔧 Subir Notebooks a Databricks

```bash
# Usando Databricks CLI (configurado con profile 'hakathon')
databricks workspace import \
  --file ./02_feature_engineering.py \
  --format SOURCE \
  --language PYTHON \
  --overwrite \
  /Users/randryan308@gmail.com/02_feature_engineering \
  --profile hakathon
```

---

## 📊 Delta Tables Creadas

| Tabla | Registros | Descripción |
|-------|-----------|-------------|
| `football_mydata_raw` | 1,140 | Datos raw del dataset EPL |
| `football_matches_clean` | 1,140 | Partidos con datos limpios |
| `football_team_matches` | 2,280 | Vista por equipo (home + away) |
| `football_team_stats` | 20 | Estadísticas agregadas por equipo |
| `football_team_venue_stats` | 20 | Stats home vs away |
| `football_team_form` | 2,280 | Forma reciente (últimos 5 partidos) |

---

## 🎯 Próximos Pasos

1. Ejecutar FASE 2 en Databricks
2. Crear notebook FASE 3 (ML Models)
3. Entrenar modelo de predicción de partidos
4. Crear dashboards interactivos
5. Implementar AI Functions con widgets

---

**Última actualización:** 2025-11-11
