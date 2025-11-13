# 🤖 CLAUDE - Reglas del Proyecto AI Football Analyst

**IMPORTANTE: Leer antes de trabajar en el proyecto**

---

## 🎯 REGLAS FUNDAMENTALES

### 1. TODO SE HACE EN DATABRICKS. NADA LOCAL.

- ✅ Usar **Databricks Community Edition (FREE)** - SIEMPRE
- ✅ Todo el código en notebooks de Databricks
- ❌ NO ejecutar código localmente
- ❌ NO instalar nada en la máquina local

### 2. SOLO FREE TIER / COMMUNITY EDITION

**CRÍTICO:** Databricks Community Edition tiene LIMITACIONES:

- ✅ Delta Lake: Funciona perfecto
- ✅ Spark: Funciona perfecto
- ✅ Notebooks: Funciona perfecto
- ✅ Serverless Compute: Funciona (único cluster disponible)
- ⚠️ MLflow: LIMITADO (Model Registry no disponible)
- ❌ Model Serving: NO disponible en Community Edition
- ❌ SQL Warehouse: NO disponible (o muy limitado)
- ❌ Lakehouse Apps: NO disponible
- ❌ AI Functions (ai_query, ai_generate_text): NO disponibles

**ADAPTAR EL PROYECTO A ESTAS LIMITACIONES:**
- Usar MLflow básico (logging local, sin registry)
- Dashboards con notebooks + display() en lugar de SQL Warehouse
- "AI Coach" mediante notebooks interactivos con widgets
- Modelos guardados en Delta Tables o archivos, no Model Serving

### 3. USAR SOLO CAPACIDADES NATIVAS DISPONIBLES EN FREE

- ✅ PySpark + Delta Lake
- ✅ MLflow básico (tracking local)
- ✅ Notebooks con widgets (interactividad)
- ✅ display() y displayHTML() para visualizaciones
- ✅ Plotly/Matplotlib en notebooks
- ❌ NO asumir que features de pago están disponibles

---

## 📊 ARQUITECTURA - Solo Databricks Nativo

```
┌─────────────────────────────────────────────────────┐
│      AI FOOTBALL ANALYST (Databricks Native)        │
└─────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼

📊 DATOS (3)      🤖 ML CORE       🎨 INTERFACES
─────────────     ──────────       ─────────────
Players Data ┐
Teams Data   ├→  Feature Eng  → SQL Dashboard
Matches Data ┘      ↓              (Databricks SQL)
     ↓          MLflow Model         ↓
Delta Tables       ↓              AI Functions
(Bronze/Silver)  Model Serving      ↓
                    ↓           SQL AI Queries
                Predictions        ↓
                              Lakehouse Apps
```

---

## 🛠️ STACK TECNOLÓGICO (Community Edition - FREE)

### ✅ USAR (Disponible en Community Edition):

1. **Data Storage:**
   - Delta Lake ✅
   - Delta Tables (Bronze, Silver, Gold) ✅
   - Databricks File System (DBFS) ✅

2. **Processing:**
   - Apache Spark (PySpark) ✅
   - Spark SQL ✅
   - Pandas (conversión con .toPandas()) ✅

3. **ML:**
   - MLflow BÁSICO (tracking local, sin registry) ⚠️
   - scikit-learn ✅
   - XGBoost ✅
   - Modelos guardados en Delta o archivos ✅

4. **Visualization:**
   - Notebooks con display() ✅
   - Plotly/Matplotlib ✅
   - displayHTML() para HTML custom ✅
   - Widgets para interactividad ✅

5. **"AI Coach":**
   - Notebooks interactivos con widgets ✅
   - Funciones Python para lógica ✅
   - display() para mostrar resultados ✅
   - NO usar: Model Serving, SQL AI Functions, Lakehouse Apps ❌

### ❌ NO USAR (Externo):

- ❌ Gradio (usar Lakehouse Apps en su lugar)
- ❌ Streamlit (usar SQL Dashboards)
- ❌ Flask/FastAPI (usar Model Serving)
- ❌ Local Python scripts
- ❌ Jupyter notebooks locales
- ❌ Local file system

---

## 📋 ESTRUCTURA DEL PROYECTO

```
/Users/{email}/football_analyst/
├── 00_setup_config              # Setup inicial
├── notebooks/
│   ├── 01_data_ingestion/       # Cargar datos → Delta Lake
│   ├── 02_data_processing/      # Spark pipeline + features
│   ├── 03_ml_training/          # MLflow + Model Registry
│   ├── 04_sql_dashboard/        # SQL queries + dashboards
│   └── 05_ai_functions/         # AI Functions + Model Serving
└── data/                        # Delta Tables
    ├── bronze/                  # Raw data
    ├── silver/                  # Features
    └── gold/                    # Predictions
```

---

## 🔥 FASES DEL PROYECTO (Databricks Native)

### FASE 0: Setup (1h)
- Crear estructura en Databricks
- Configurar librerías
- Validar Delta Lake y MLflow

### FASE 1: Data Ingestion (15min)
- Descargar dataset con `curl` en notebook
- Cargar CSVs a Delta Lake (Bronze)
- Sin API keys, sin complicaciones

### FASE 2: Feature Engineering (3.5h)
- Spark pipeline para limpiar datos
- Crear features single-source y cross-source
- Guardar en Delta Lake (Silver)

### FASE 3: ML Models (3h)
- Entrenar modelos con MLflow tracking
- Registrar en MLflow Model Registry
- Deploy a Databricks Model Serving
- Crear endpoints REST

### FASE 4: SQL Dashboard (2h)
- Crear queries SQL con datos de Delta
- Usar Databricks SQL Warehouse
- Crear dashboard visual nativo
- Agregar filtros interactivos

### FASE 5: AI Functions (3h)
**NUEVO - Usando capacidades nativas:**
- Crear **SQL AI Functions** para queries inteligentes
- Setup **Model Serving endpoint** para predicciones
- Crear **Python UDFs** con lógica AI
- (Opcional) **Lakehouse App** si hay tiempo

---

## 🤖 AI COACH - Enfoque Community Edition

**IMPORTANTE:** Sin Model Serving ni SQL AI Functions en FREE tier

### Solución: Notebook Interactivo con Widgets

```python
# Notebook: 05_ai_coach/interactive_predictor

# 1. Widgets para input
dbutils.widgets.dropdown("team1", "Arsenal", teams_list)
dbutils.widgets.dropdown("team2", "Man City", teams_list)
dbutils.widgets.dropdown("formation", "4-3-3", ["4-4-2", "4-3-3", "3-5-2"])

# 2. Cargar modelo (guardado en Delta o pickle)
import pickle
model = pickle.load(open("/dbfs/models/match_predictor.pkl", "rb"))

# 3. Función de predicción
def predict_match(team1, team2):
    # Cargar features de Delta
    features = load_team_features(team1, team2)
    # Predecir
    prediction = model.predict(features)
    proba = model.predict_proba(features)
    return prediction, proba

# 4. Ejecutar y mostrar
team1 = dbutils.widgets.get("team1")
team2 = dbutils.widgets.get("team2")
result = predict_match(team1, team2)

# 5. Display con HTML
displayHTML(f"""
<h2>⚽ Predicción: {team1} vs {team2}</h2>
<p>Resultado: {result[0]}</p>
<p>Confianza: {result[1]}</p>
""")
```

**NO intentar usar:**
- ❌ Model Serving endpoints
- ❌ SQL AI Functions
- ❌ Lakehouse Apps
- ❌ REST APIs externos

---

## ⚡ COMANDOS ÚTILES

### Subir notebook a Databricks:
```bash
~/.local/bin/databricks workspace import \
  --file notebook.py \
  --language PYTHON \
  --format SOURCE \
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

### Ver tablas Delta:
```sql
SHOW TABLES LIKE 'football_*'
```

---

## 📝 DOCUMENTOS DEL PROYECTO

Solo mantener estos 3 archivos:

1. **CLAUDE.md** (este archivo)
   - Reglas del proyecto
   - Stack tecnológico
   - Referencias rápidas

2. **FOOTBALL_PROGRESS.md**
   - Plan completo por fases
   - Tracking de progreso
   - Checkpoints

3. **FOOTBALL_ANALYST_ARCHITECTURE.md**
   - Arquitectura detallada
   - Decisiones técnicas
   - Diagramas

---

## 🚫 LO QUE NO HACER

1. **NO crear código Python local**
   - Todo debe estar en notebooks de Databricks

2. **NO usar librerías externas para UI**
   - Gradio ❌
   - Streamlit ❌
   - Usar SQL Dashboards o Lakehouse Apps ✅

3. **NO intentar correr notebooks localmente**
   - Solo en Databricks Serverless

4. **NO complicar con APIs externas**
   - Kaggle download directo con curl
   - No API keys si es posible

5. **NO ignorar capacidades nativas**
   - Databricks tiene AI Functions
   - Databricks tiene Model Serving
   - Databricks tiene SQL Dashboards
   - Usar lo que ya existe!

---

## ✅ CHECKLIST ANTES DE CREAR CÓDIGO

Antes de escribir cualquier notebook, preguntarse:

- [ ] ¿Esto se ejecutará EN Databricks? (no local)
- [ ] ¿Está disponible en Community Edition FREE? (verificar limitaciones)
- [ ] ¿Los datos están en Delta Lake?
- [ ] ¿Estoy usando SOLO: Spark, Delta, notebooks, widgets, display()?
- [ ] ¿NO estoy usando: Model Serving, SQL Warehouse, AI Functions, Lakehouse Apps?
- [ ] ¿La UI es un notebook con widgets y display(), NO una app externa?
- [ ] ¿MLflow es solo para tracking local, NO registry?

Si todas las respuestas son correctas → Proceder ✅

**REGLA DE ORO: Si no estás 100% seguro que funciona en FREE tier, NO lo uses**

---

## 🎯 OBJETIVO FINAL (Community Edition Compatible)

Sistema completo de análisis de fútbol con IA que:

1. ✅ Corre 100% en Databricks Community Edition (FREE)
2. ✅ Usa Delta Lake para datos (Bronze/Silver/Gold)
3. ✅ Usa Spark para procesamiento
4. ✅ Usa MLflow básico para tracking de experimentos
5. ✅ Usa notebooks con display() para visualización
6. ✅ Usa widgets para interactividad (AI Coach)
7. ✅ Modelos guardados en archivos o Delta
8. ✅ Es demostrable en 5 minutos

**Value Prop:** "Análisis profesional de fútbol con ML, 100% gratis en Databricks Community Edition"

**Stack Final:** Spark + Delta + MLflow básico + Notebooks interactivos

---

## 📚 REFERENCIAS DATABRICKS (Community Edition)

**Disponibles en FREE:**
- **Delta Lake:** https://docs.databricks.com/delta/
- **Spark SQL:** https://docs.databricks.com/sql/
- **Notebooks:** https://docs.databricks.com/notebooks/
- **MLflow básico:** https://www.mlflow.org/docs/latest/index.html

**NO disponibles en Community Edition:**
- ~~Model Serving~~ (requiere plan de pago)
- ~~SQL Warehouse~~ (requiere plan de pago)
- ~~AI Functions~~ (requiere plan de pago)
- ~~Lakehouse Apps~~ (requiere plan de pago)

**IMPORTANTE:** Siempre verificar en docs si la feature requiere plan de pago

---

**Última actualización:** 2025-11-11
**Proyecto:** AI Football Analyst
**Plataforma:** Databricks Community Edition (FREE TIER)
**Principios:**
1. TODO EN DATABRICKS, NADA LOCAL
2. SOLO FEATURES DISPONIBLES EN COMMUNITY EDITION
3. VERIFICAR SIEMPRE LIMITACIONES DEL FREE TIER
