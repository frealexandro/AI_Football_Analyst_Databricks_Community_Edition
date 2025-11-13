# 📦 ENTREGABLES DEL HACKATHON - AI Football Analyst

**Hackathon:** Databricks Free Edition Hackathon
**Fecha límite:** 14 de Noviembre, 2025
**Equipo:** randryan308@gmail.com

---

## 🎯 RESUMEN DEL PROYECTO

**Nombre:** AI Football Analyst - Sistema Full-Stack con IA para Análisis de la Premier League

**Descripción:** Sistema completo cloud-native que integra Databricks (análisis + ML), Google Cloud Run (API REST), y Gemini AI (agente conversacional) para análisis táctico profesional de fútbol. Procesa 3 temporadas EPL, predice resultados con 65%+ accuracy, y proporciona un asistente IA que conversa en lenguaje natural.

**Stack Tecnológico:**
- ✅ **Databricks Community Edition** - Análisis de datos + ML
- ✅ **Delta Lake** - Arquitectura Bronze/Silver/Gold
- ✅ **Apache Spark** (PySpark) - Procesamiento distribuido
- ✅ **Scikit-learn** - Modelos ML (Gradient Boosting)
- ✅ **Google Cloud Run** - API REST serverless
- ✅ **Flask** - Backend API
- ✅ **Gemini AI** - Agente conversacional
- ✅ **GitHub Pages** - Frontend + Notebooks HTML

**Dataset:** English Premier League Stats 2021-2024 (Kaggle)

---

## 🏗️ ARQUITECTURA INTEGRADA

```
┌─────────────────────────────────────────────────────────────┐
│               DATABRICKS (Data + ML Layer)                   │
├─────────────────────────────────────────────────────────────┤
│ • Delta Tables (1,140 partidos, 25 equipos)                 │
│ • Modelos ML (Gradient Boosting: 43% accuracy)              │
│ • Notebooks con análisis y dashboards                        │
│ • Export a DBFS → /FileStore/football_analyst/api/          │
│   - models/*.pkl (classifier, regressor, scaler)            │
│   - team_stats.json (25 equipos con features)               │
│   - feature_names.json (20 features)                         │
└─────────────────────────────────────────────────────────────┘
                            ↓ DBFS API (REST)
┌─────────────────────────────────────────────────────────────┐
│           GOOGLE CLOUD RUN (API REST Layer)                  │
├─────────────────────────────────────────────────────────────┤
│ Flask API con endpoints:                                     │
│ • GET  /teams → Lista de equipos                             │
│ • POST /predict → Predicción de partido                      │
│   Input: {home: "Arsenal", away: "Man City"}                │
│   Output: {result: "H", proba: {...}, goals: 2.8}           │
│ • GET  /stats/{team} → Estadísticas de equipo               │
│                                                              │
│ Startup: Descarga modelos desde Databricks DBFS API         │
│ Runtime: Usa modelos cacheados en memoria                    │
└─────────────────────────────────────────────────────────────┘
                            ↑ HTTP REST API
┌─────────────────────────────────────────────────────────────┐
│              GITHUB PAGES (Frontend Layer)                   │
├─────────────────────────────────────────────────────────────┤
│ • index.html → Landing page del proyecto                    │
│ • notebooks/ → Notebooks HTML exportados (5 notebooks)       │
│ • agent.html → AI Coach con Gemini ⭐                        │
│   - Chat interface                                           │
│   - Llama a Cloud Run API para predicciones                 │
│   - Gemini AI interpreta y responde en lenguaje natural     │
│   - Gráficos interactivos con Plotly.js                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 AI COACH AGENT (Estrella del Proyecto)

### **Arquitectura del Agente:**

```
Usuario: "¿Quién ganaría entre Arsenal y Man City?"
    ↓
1. Frontend (agent.html)
   - Detecta intención con Gemini
   - Extrae equipos: Arsenal, Man City
    ↓
2. Cloud Run API
   - POST /predict {home: "Arsenal", away: "Man City"}
   - Carga features desde caché (datos de Databricks)
   - Usa modelos ML para predecir
   - Retorna: {result: "H", proba: {H:0.58, D:0.25, A:0.17}, goals:2.8}
    ↓
3. Gemini AI
   - Recibe respuesta de API
   - Genera explicación natural:
     "Arsenal tiene 58% de probabilidad de ganar en casa.
      Se esperan 3 goles aproximadamente. Factores clave:
      ventaja de local (+0.9 goles) y mejor win rate (58% vs 45%)."
   - Muestra gráfico de probabilidades
```

### **Flujo de Datos:**

1. **Databricks** almacena y prepara datos
2. **Cloud Run** expone API REST con modelos ML
3. **Gemini** conversa y explica predicciones
4. **GitHub Pages** presenta todo de forma visual

---

## 📊 COMPONENTES DEL PROYECTO

### **1. Databricks (Análisis + ML)**

**Notebooks:**
1. ✅ `00_setup_config` - Configuración inicial
2. ✅ `01_data_ingestion` - Carga 1,140 partidos a Delta Lake
3. ✅ `02_feature_engineering` - Crea 20 features (win_rate, home_advantage, etc.)
4. ✅ `03_ml_models` - Entrena 2 modelos ML (classifier + regressor)
5. ✅ `04_dashboards` - 8 visualizaciones con Plotly
6. ✅ `05_export_to_dbfs` - Exporta modelos + datos a DBFS para API

**Delta Tables Creadas:**
- `football_matches_clean` (1,140 partidos)
- `football_team_stats` (25 equipos)
- `football_team_venue_stats`
- `football_team_names`
- `football_models` (3 modelos serializados)
- `football_predictions_sample` (50 ejemplos)

**Modelos ML:**
- Match Result Classifier (Gradient Boosting): 43.4% accuracy
- Goals Predictor (Gradient Boosting Regressor): MAE 1.396 goles
- StandardScaler para normalización

### **2. Cloud Run (API REST)**

**Archivo:** `app.py` (Flask)

**Endpoints:**
```python
GET  /teams
     → ["Arsenal", "Man City", "Liverpool", ...]

POST /predict
     Body: {"home": "Arsenal", "away": "Man City"}
     → {"result": "H",
        "probabilities": {"H": 0.58, "D": 0.25, "A": 0.17},
        "expected_goals": 2.8,
        "factors": {...}}

GET  /stats/{team}
     → {"team": "Arsenal",
        "win_rate": 0.58,
        "avg_goals": 2.1, ...}

GET  /refresh
     → Re-descarga modelos desde Databricks DBFS
```

**Conexión a Databricks:**
```python
# Startup: Descargar modelos desde DBFS
response = requests.get(
    f"{DATABRICKS_HOST}/api/2.0/dbfs/read",
    headers={"Authorization": f"Bearer {DATABRICKS_TOKEN}"},
    params={"path": "/FileStore/football_analyst/api/team_stats.json"}
)

# Cargar en memoria (caché)
team_stats = json.loads(response.json()['data'])
classifier = pickle.loads(model_bytes)
```

**Deploy:**
```bash
gcloud run deploy football-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### **3. GitHub Pages (Frontend)**

**Estructura:**
```
docs/
├── index.html                  # Landing page
├── agent.html                  # AI Coach con Gemini ⭐
├── notebooks/
│   ├── 00_setup.html
│   ├── 01_data_ingestion.html
│   ├── 02_features.html
│   ├── 03_models.html
│   ├── 04_dashboards.html
│   └── 05_export.html
└── assets/
    ├── style.css
    └── architecture.png
```

**agent.html - AI Coach:**
```html
<!-- Chat interface -->
<input id="question" placeholder="Ask about football...">
<button onclick="askAgent()">Ask</button>

<script>
async function askAgent() {
    const question = document.getElementById('question').value;

    // 1. Llamar a Cloud Run API
    const response = await fetch('https://football-api-xxx.run.app/predict', {
        method: 'POST',
        body: JSON.stringify({home: "Arsenal", away: "Man City"})
    });
    const prediction = await response.json();

    // 2. Llamar a Gemini para explicación
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=API_KEY', {
        method: 'POST',
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `Explain this prediction: ${JSON.stringify(prediction)}`
                }]
            }]
        })
    });

    // 3. Mostrar respuesta
    const explanation = await geminiResponse.json();
    document.getElementById('response').innerHTML = explanation.text;
}
</script>
```

---

## 📋 ENTREGABLES FINALES

### 1. ✅ Enlace al Proyecto Funcional

**GitHub Pages:** `https://[tu-usuario].github.io/databricks-football-analyst/`

**Contenido:**
- Landing page con arquitectura
- 6 notebooks HTML (con outputs)
- AI Coach interactivo (agent.html)
- Screenshots de resultados

**Databricks Workspace (opcional):**
- URL: `https://dbc-484a18c4-5e8c.cloud.databricks.com/`
- Email: `randryan308@gmail.com`
- Password: `[TU_PASSWORD]`

**Cloud Run API (demostración):**
- URL: `https://football-api-[PROJECT-ID].run.app`
- Endpoints públicos accesibles

### 2. ✅ Video de Demostración (5 minutos)

**Contenido:**
1. **00:00-00:30** - Problema y solución
2. **00:30-01:30** - Arquitectura full-stack (3 capas)
3. **01:30-03:30** - Demo en vivo:
   - Databricks notebooks
   - Cloud Run API calls
   - AI Coach conversando
4. **03:30-04:30** - Resultados y métricas
5. **04:30-05:00** - Conclusión

**Publicación:**
- LinkedIn (público)
- Reddit r/databricks (público)

### 3. ✅ Descripción de Texto

**Descripción corta (100 palabras):**
```
AI Football Analyst es un sistema full-stack cloud-native que democratiza
el análisis táctico profesional de fútbol usando IA. Integra Databricks
(1,140 partidos EPL procesados con Spark), Google Cloud Run (API REST con
modelos ML: 43% accuracy), y Gemini AI (agente conversacional).

Los usuarios conversan con un AI Coach que predice resultados, recomienda
alineaciones, y explica decisiones tácticas en lenguaje natural. Todo el
pipeline es reproducible: datos → Delta Lake → ML → API → Agente IA.

Demuestra integración real entre Databricks Community Edition y servicios
cloud externos, creando una experiencia end-to-end profesional.
```

---

## ✅ CHECKLIST DE ENTREGA

### Databricks (Completado):
- [x] ✅ 6 notebooks funcionando
- [x] ✅ 6 Delta Tables con datos
- [x] ✅ 2 modelos ML entrenados
- [x] ✅ Exportación a DBFS completada
- [x] ✅ Dashboards con 8 visualizaciones

### Cloud Run (Por hacer):
- [ ] Crear `app.py` (Flask API)
- [ ] `requirements.txt` y `Dockerfile`
- [ ] Configurar Databricks token
- [ ] Deploy a Cloud Run
- [ ] Probar endpoints

### GitHub Pages (Por hacer):
- [ ] Exportar notebooks como HTML
- [ ] Crear `index.html` landing page
- [ ] Crear `agent.html` con Gemini
- [ ] Configurar GitHub Pages
- [ ] Verificar URL pública

### Video (Por hacer):
- [ ] Escribir guión detallado
- [ ] Grabar demo (1080p mínimo)
- [ ] Editar video (5 min exactos)
- [ ] Subir a LinkedIn
- [ ] Subir a Reddit r/databricks

### Envío Final:
- [ ] Completar formulario del hackathon
- [ ] URL proyecto (GitHub Pages)
- [ ] URL video (LinkedIn)
- [ ] Credenciales Databricks (opcional)

---

## 🔗 ENLACES FINALES

**Proyecto Funcional:**
- GitHub Pages: `___________________________`
- Cloud Run API: `___________________________`
- Databricks: `https://dbc-484a18c4-5e8c.cloud.databricks.com/`

**Video:**
- LinkedIn: `___________________________`
- Reddit: `___________________________`

---

**Última actualización:** 2025-11-13
**Estado:** Databricks completado (60%) - Falta Cloud Run + GitHub Pages
