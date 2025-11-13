# 🏗️ AI FOOTBALL ANALYST - ARQUITECTURA TÉCNICA

**Proyecto:** AI Football Analyst
**Stack:** Databricks + Google Cloud Run + Gemini AI
**Última actualización:** 2025-11-13

---

## 🎯 ARQUITECTURA GENERAL (3 CAPAS)

```
┌──────────────────────────────────────────────────────────────────────┐
│                         USER LAYER                                    │
│                     (GitHub Pages Frontend)                           │
├──────────────────────────────────────────────────────────────────────┤
│  • Landing Page (index.html)                                         │
│  • Notebooks HTML (read-only dashboards)                             │
│  • AI Coach Chat Interface (agent.html) ⭐                           │
│    - Chat UI con Gemini AI                                           │
│    - Gráficos interactivos (Plotly.js)                               │
│    - Integración con Cloud Run API                                   │
└──────────────────────────────────────────────────────────────────────┘
                              ↓ HTTP REST
┌──────────────────────────────────────────────────────────────────────┐
│                      API LAYER                                        │
│                (Google Cloud Run - Flask API)                         │
├──────────────────────────────────────────────────────────────────────┤
│  Flask REST API (Serverless)                                         │
│  ├── GET  /teams → Lista de 25 equipos                               │
│  ├── POST /predict → Predicción de partido                           │
│  │   Input: {home: "Arsenal", away: "Man City"}                      │
│  │   Process:                                                         │
│  │   1. Cargar features de ambos equipos (caché)                     │
│  │   2. Construir vector de 20 features                              │
│  │   3. Predecir con Gradient Boosting Classifier                    │
│  │   4. Predecir goles con Gradient Boosting Regressor               │
│  │   Output: {result, probabilities, expected_goals, factors}        │
│  ├── GET  /stats/{team} → Estadísticas del equipo                    │
│  └── GET  /refresh → Re-descarga desde Databricks                    │
│                                                                       │
│  Startup Process:                                                     │
│  1. Conectar a Databricks DBFS API                                   │
│  2. Descargar modelos pickle (classifier, regressor, scaler)         │
│  3. Descargar team_stats.json (25 equipos)                           │
│  4. Descargar feature_names.json                                     │
│  5. Cargar modelos en memoria (caché global)                         │
│                                                                       │
│  Runtime: Usa modelos cacheados (rápido, sin latencia de Databricks) │
└──────────────────────────────────────────────────────────────────────┘
                              ↑ DBFS API (REST)
┌──────────────────────────────────────────────────────────────────────┐
│                     DATA & ML LAYER                                   │
│                  (Databricks Community Edition)                       │
├──────────────────────────────────────────────────────────────────────┤
│  BRONZE LAYER (Raw Data)                                             │
│  └── football_mydata_raw (1,140 partidos)                            │
│       - Datos sin procesar desde Kaggle                              │
│                                                                       │
│  SILVER LAYER (Cleaned + Features)                                   │
│  ├── football_matches_clean (1,140 partidos procesados)              │
│  ├── football_team_stats (25 equipos con agregaciones)               │
│  ├── football_team_venue_stats (home vs away)                        │
│  └── football_team_names (mapeo ID → nombre)                         │
│                                                                       │
│  GOLD LAYER (ML Outputs)                                             │
│  ├── football_models (3 modelos serializados)                        │
│  │   - match_result_classifier (Gradient Boosting)                   │
│  │   - goals_predictor (Gradient Boosting Regressor)                 │
│  │   - goals_predictor_scaler (StandardScaler)                       │
│  └── football_predictions_sample (50 ejemplos)                       │
│                                                                       │
│  DBFS EXPORT (Para API)                                              │
│  /FileStore/football_analyst/api/                                    │
│  ├── models/                                                          │
│  │   ├── match_result_classifier.pkl                                 │
│  │   ├── goals_predictor.pkl                                         │
│  │   └── goals_predictor_scaler.pkl                                  │
│  ├── team_stats.json (25 equipos con features)                       │
│  ├── feature_names.json (20 features)                                │
│  ├── models_metadata.json                                            │
│  └── predictions_sample.json                                         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 📦 **Resumen de Documentos Actualizados:**

✅ **ENTREGABLES_HACKATHON.md** - Arquitectura full-stack actualizada
✅ **FOOTBALL_PROGRESS.md** - Ya estaba actualizado
✅ **FOOTBALL_ANALYST_ARCHITECTURE.md** - Arquitectura técnica detallada

---

**Estado actual del proyecto:**
- ✅ Databricks: 6 notebooks listos (60% completado)
- ⏳ Cloud Run: Por implementar (API Flask)
- ⏳ GitHub Pages: Por implementar (Frontend + Agente Gemini)

**Próximo paso:** Ejecutar notebook `05_export_to_dbfs` en Databricks para preparar datos para la API. 🚀
