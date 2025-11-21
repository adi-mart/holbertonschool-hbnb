#!/bin/bash

echo "Arrêt de tous les serveurs existants..."
# Tue tous les serveurs Python (HTTP et Flask)
pkill -f "python3 -m http.server" 2>/dev/null
pkill -f "run.py" 2>/dev/null
pkill -f "flask" 2>/dev/null
fuser -k 5000/tcp 2>/dev/null
fuser -k 8080/tcp 2>/dev/null

echo "Lancement du backend Flask (port 5000)..."
(cd /home/aurelie/projects/holbertonschool-hbnb/part3/hbnb && python3 run.py) &
BACKEND_PID=$!

echo "Lancement du frontend HTTP (port 8080)..."
(cd /home/aurelie/projects/holbertonschool-hbnb/part4/base_files && python3 -m http.server 8080) &
FRONTEND_PID=$!

echo "✅ Serveurs lancés !"
echo "   - Backend (API Flask) : http://127.0.0.1:5000"
echo "   - Frontend (Site web)  : http://localhost:8080"
echo ""

# Fonction de nettoyage quand le script est interrompu
cleanup() {
    echo ""
    echo "Arrêt des serveurs..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    pkill -f "run.py" 2>/dev/null
    pkill -f "python3 -m http.server" 2>/dev/null
    echo "✅ Serveurs arrêtés."
    exit 0
}

# Capture Ctrl+C pour faire le nettoyage
trap cleanup SIGINT

# Attend que les processus se terminent
wait