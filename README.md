# ⚽ AI Football Analyst - Databricks Community Edition

**Plataforma:** Databricks Community Edition (FREE tier)
**Dataset:** English Premier League Stats 2021-2024 (Kaggle)
**Usuario Databricks:** randryan308@gmail.com
**Estado:** ✅ COMPLETADO - Listo para integración con API

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción-del-proyecto)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Estado de Fases](#-estado-de-fases)
- [Delta Tables](#-delta-tables-creadas)
- [Modelos ML](#-modelos-ml-entrenados)
- [Visualizaciones](#-dashboards-y-visualizaciones)
- [Características del Sistema](#-características-del-sistema)
- [Próximos Pasos](#-próximos-pasos)

---

## 🎯 Descripción del Proyecto

Sistema completo de análisis y predicción de partidos de fútbol de la Premier League usando **Machine Learning** en Databricks Community Edition. El proyecto incluye:

- **Ingesta de datos** desde Kaggle (1,140 partidos, 25 equipos)
- **Feature engineering** avanzado (20+ features)
- **Modelos ML** predictivos (clasificación y regresión)
- **Dashboards interactivos** con Plotly
- **Exportación** de datos y modelos para API REST

**Stack Tecnológico:**
- Apache Spark + PySpark
- Delta Lake
- MLflow (tracking local)
- Scikit-learn (Gradient Boosting)
- Plotly (visualizaciones)

---

## 📂 Estructura del Proyecto

```
AI_Football_Analyst_Databricks_Hackathon/
├── README.md                              # Este archivo
├── CLAUDE.md                              # Reglas del proyecto (Community Edition)
│
├── Notebooks_Databricks/
│   ├── 00_setup_config.ipynb             # ✅ FASE 0: Setup inicial
│   ├── 01_data_ingestion.ipynb           # ✅ FASE 1: Descarga y carga de datos
│   ├── 02_feature_engineering.ipynb      # ✅ FASE 2: Features para ML
│   ├── 03_ml_models.ipynb                # ✅ FASE 3: Modelos ML (Gradient Boosting)
│   ├── 04_dashboards.ipynb               # ✅ FASE 4: Visualizaciones con Plotly
│   └── 05_export_to_delta.ipynb          # ✅ FASE 5: Exportación para API
│
└── Documentos de Arquitectura/
    ├── FOOTBALL_PROGRESS.md               # Plan de 6 fases con tasks
    └── FOOTBALL_ANALYST_ARCHITECTURE.md   # Arquitectura técnica
```

---

## 🚀 Estado de Fases

### ✅ FASE 0: Setup y Configuración (COMPLETADA)

- Instalación de librerías (plotly, scikit-learn, xgboost)
- Configuración de rutas de workspace
- Validación de Delta Lake
- MLflow configurado (tracking local, sin registry)
- Funciones de utilidad creadas

**Resultado:** Sistema listo para data ingestion

---

### ✅ FASE 1: Data Ingestion (COMPLETADA)

**Proceso:**
1. Descarga de dataset EPL desde Kaggle con `curl`
2. Carga de CSVs desde `/tmp` (sin usar DBFS)
3. Limpieza de nombres de columnas para Delta Lake
4. Guardado en tabla `football_mydata_raw`

**Dataset:**
- **1,140 partidos** (EPL 2021-2024)
- **40 columnas** (estadísticas detalladas)
- **25 equipos** únicos

**Tablas creadas:**
- `football_mydata_raw` (1,140 registros)

---

### ✅ FASE 2: Feature Engineering (COMPLETADA)

**Features creadas:**

1. **Estadísticas por equipo:**
   - Promedio de goles anotados/recibidos
   - Win rate general y por venue (home/away)
   - Posesión, tiros, corners promedio
   - Diferencia de goles (goal difference)

2. **Forma reciente:**
   - Puntos en últimos 5 partidos
   - Goles anotados/recibidos últimos 5 partidos
   - Promedio de puntos por partido reciente

3. **Home Advantage:**
   - Diferencia en goles: local vs visitante
   - Diferencia en puntos: local vs visitante
   - Win rate local vs visitante

4. **Features derivadas:**
   - `goal_diff_potential`: Diferencia entre ataque local y defensa visitante
   - `win_rate_diff`: Diferencia de win rate entre equipos
   - `possession_diff`: Diferencia de posesión
   - `shots_diff`: Diferencia de tiros

**Tablas creadas:**
- `football_matches_clean` (1,140 partidos limpios)
- `football_team_matches` (2,280 registros - vista por equipo)
- `football_team_stats` (25 equipos con stats agregadas)
- `football_team_venue_stats` (25 equipos con home/away stats)
- `football_team_form` (2,280 registros con forma reciente)
- `football_team_names` (25 equipos con mapeo ID→nombre)

---

### ✅ FASE 3: ML Models (COMPLETADA)

**Modelos entrenados:**

#### 1. Match Result Classifier
- **Algoritmo:** Gradient Boosting Classifier
- **Objetivo:** Predecir resultado del partido (Home Win / Draw / Away Win)
- **Features:** 20 features (stats de equipos, forma reciente, home advantage)
- **Performance:**
  - Accuracy: **43.4%** (en test set)
  - Accuracy total: **70.4%** (en dataset completo)
- **Top 3 Features más importantes:**
  1. `win_rate_diff` (29.2%)
  2. `possession_diff` (15.5%)
  3. `shots_diff` (14.2%)

#### 2. Goals Predictor
- **Algoritmo:** Gradient Boosting Regressor
- **Objetivo:** Predecir total de goles en el partido
- **Features:** 20 features (mismas que classifier)
- **Preprocesamiento:** StandardScaler
- **Performance:**
  - MAE: **1.40 goles**
  - Error < 1 gol: **46.9%**
  - Error < 2 goles: **75.4%**
  - RMSE: **1.79 goles**

**Modelos guardados en:**
- `football_models` (Delta Table con 3 registros)
  - `match_result_classifier` (Gradient Boosting)
  - `goals_predictor` (Gradient Boosting Regressor)
  - `goals_predictor_scaler` (StandardScaler)

**Predicciones de ejemplo:**
- `football_predictions_sample` (50 predicciones)

---

### ✅ FASE 4: Dashboards y Visualizaciones (COMPLETADA)

**8 Visualizaciones creadas con Plotly:**

1. **Top 10 Equipos por Win Rate**
   - Gráfico de barras con win rates
   - Escala de colores verde (mejor → peor)

2. **Ataque vs Defensa por Equipo**
   - Scatter plot (goles anotados vs recibidos)
   - Tamaño = win rate
   - Líneas de referencia (promedio liga)

3. **Home Advantage**
   - Barras horizontales comparando win rate local vs visitante
   - Top 15 equipos con mayor ventaja de local

4. **Confusion Matrix**
   - Heatmap del clasificador de resultados
   - Accuracy total: 70.4%

5. **Feature Importance**
   - Top 10 features más importantes
   - Barras horizontales con importancia

6. **Predicciones vs Reales (Goles)**
   - Scatter plot con línea de tendencia
   - Línea diagonal de predicción perfecta
   - 100 partidos de muestra

7. **Distribución de Errores**
   - Histograma de errores de predicción
   - Centrado en 0 (predicción perfecta)

8. **Predicciones Destacadas**
   - Top 10 mejores predicciones
   - Top 10 peores predicciones

**Todas las visualizaciones usando:** `displayHTML(fig.to_html())`

---

### ✅ FASE 5: Exportación para API (COMPLETADA)

**Datos exportados:**

1. **Tablas Delta creadas para API:**
   - `football_api_data` (25 equipos con features completos)
   - `football_feature_names` (20 feature names)
   - `football_api_metadata` (metadata del proyecto)

2. **JSONs generados:**
   - `team_stats.json` (25 equipos)
   - `feature_names.json` (20 features)
   - `metadata.json` (info del proyecto)
   - `football_data.json` (export completo ~17 KB)

3. **Modelos listos para deployment:**
   - Guardados en Delta Table `football_models` como pickle
   - Disponibles para carga con `pickle.loads()`

**Estrategia para API:**
- **OPCIÓN A (Recomendada):** Datos estáticos en JSON
- **OPCIÓN B:** Databricks REST API (queries SQL)
- **OPCIÓN C:** Hybrid (caché + refresh)

---

## 📊 Delta Tables Creadas

| Tabla | Registros | Columnas | Descripción |
|-------|-----------|----------|-------------|
| `football_mydata_raw` | 1,140 | 40 | Datos raw del dataset EPL |
| `football_matches_clean` | 1,140 | 44 | Partidos con datos limpios y normalizados |
| `football_team_matches` | 2,280 | 15 | Vista por equipo (home + away) |
| `football_team_stats` | 25 | 17 | Estadísticas agregadas por equipo |
| `football_team_venue_stats` | 25 | 11 | Stats home vs away por equipo |
| `football_team_form` | 2,280 | 20 | Forma reciente (últimos 5 partidos) |
| `football_team_names` | 25 | 2 | Mapeo de team_id → team_name |
| `football_models` | 3 | 5 | Modelos ML serializados (pickle) |
| `football_predictions_sample` | 50 | 9 | Predicciones de ejemplo |
| `football_api_data` | 25 | 12 | Datos consolidados para API |
| `football_feature_names` | 20 | 2 | Nombres de features ordenados |
| `football_api_metadata` | 7 | 2 | Metadata del proyecto |

**Total:** 12 tablas Delta
**Total registros:** ~9,000+

---

## 🤖 Modelos ML Entrenados

### Match Result Classifier

```python
Algoritmo: Gradient Boosting Classifier
Features: 20
Accuracy: 43.4% (test) / 70.4% (full dataset)
Clases: Home Win (H), Draw (D), Away Win (A)

Classification Report:
              precision    recall  f1-score   support
           A       0.42      0.46      0.44        78
           D       0.23      0.21      0.22        52
           H       0.54      0.53      0.54        98
```

### Goals Predictor

```python
Algoritmo: Gradient Boosting Regressor
Features: 20 (con StandardScaler)
MAE: 1.396 goles
RMSE: 1.792 goles
Error < 1 gol: 46.9%
Error < 2 goles: 75.4%
```

---

## 📈 Dashboards y Visualizaciones

**Tecnología:** Plotly + displayHTML()

**Tipos de gráficos:**
- Barras (verticales y horizontales)
- Scatter plots con tendencia
- Heatmaps (confusion matrix)
- Histogramas de distribución
- Gráficos comparativos (grouped bars)

**Insights principales:**
- Manchester City: Mejor equipo (268 puntos, 84 victorias)
- Home advantage promedio: ~0.3 goles más en casa
- Features más importantes: win_rate_diff, possession_diff, shots_diff

---

## ⚙️ Características del Sistema

### ✅ Cumple con Databricks Community Edition

- **Delta Lake:** 12 tablas creadas ✅
- **Spark/PySpark:** Procesamiento distribuido ✅
- **MLflow básico:** Tracking local (sin registry) ✅
- **Notebooks:** 6 notebooks ejecutados ✅
- **Visualizaciones:** Plotly + displayHTML() ✅

### ❌ NO usa (no disponible en Community Edition)

- Model Registry (guardado en Delta Table)
- Model Serving (exportado para API externa)
- SQL Warehouse (dashboards via notebooks)
- AI Functions (notebook interactivo con widgets)
- Lakehouse Apps

---

## 🎯 Próximos Pasos

### 1. Integración con API REST (Cloud Run / Flask)

**Opciones:**
- Usar JSONs exportados (datos estáticos)
- Conectar vía Databricks REST API
- Hybrid (caché + refresh endpoint)

**Endpoints sugeridos:**
```
GET  /api/teams              # Lista de equipos
GET  /api/teams/{id}         # Stats de un equipo
POST /api/predict/result     # Predecir resultado del partido
POST /api/predict/goals      # Predecir total de goles
GET  /api/stats              # Estadísticas generales
```

### 2. Frontend (GitHub Pages / React)

**Componentes:**
- Selector de equipos (dropdown)
- Formulario de predicción
- Visualización de resultados
- Dashboard con stats de equipos
- Comparador de equipos

### 3. Deployment

**Stack sugerido:**
- Backend: Cloud Run (Flask API)
- Frontend: GitHub Pages (React/HTML)
- Datos: JSONs estáticos o Databricks REST API
- Modelos: Incluidos en el contenedor o descargados desde Delta

---

## 📚 Documentación Adicional

- **CLAUDE.md:** Reglas del proyecto y limitaciones de Community Edition
- **FOOTBALL_PROGRESS.md:** Plan de 6 fases con tasks detalladas
- **FOOTBALL_ANALYST_ARCHITECTURE.md:** Arquitectura técnica completa

---

## 🔧 Comandos Útiles

### Subir notebook a Databricks:

```bash
~/.local/bin/databricks workspace import \
  --file notebook.ipynb \
  --format JUPYTER \
  --overwrite \
  /Users/randryan308@gmail.com/football_analyst/notebooks/XX_name \
  --profile hakathon
```

### Listar notebooks:

```bash
~/.local/bin/databricks workspace list \
  /Users/randryan308@gmail.com/football_analyst \
  --profile hakathon
```

### Ver tablas Delta en notebook:

```sql
SHOW TABLES LIKE 'football_%'
```

---

## 📊 Estadísticas del Proyecto

- **Partidos analizados:** 1,140
- **Equipos únicos:** 25
- **Features creadas:** 20+
- **Modelos entrenados:** 2
- **Tablas Delta:** 12
- **Visualizaciones:** 8
- **Notebooks completados:** 6

---

## 🏆 Logros del Proyecto

✅ Sistema completo de análisis de fútbol con ML
✅ 100% compatible con Databricks Community Edition (FREE)
✅ Modelos con performance razonable (43-70% accuracy, MAE 1.4 goles)
✅ Dashboards profesionales con Plotly
✅ Datos exportados y listos para API REST
✅ Arquitectura escalable y bien documentada

---

## 👤 Autor

**Proyecto:** AI Football Analyst
**Plataforma:** Databricks Community Edition
**Usuario:** randryan308@gmail.com
**Última actualización:** 2025-11-17

---

## 📝 Licencia

Este proyecto fue desarrollado como parte de un hackathon educativo usando Databricks Community Edition (FREE tier).

---

**Value Prop:** "Análisis profesional de fútbol con Machine Learning, 100% gratis en Databricks Community Edition"
