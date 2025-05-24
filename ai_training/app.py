import os
import joblib
from flask import Flask, request, jsonify

# Carrega o modelo treinado
model = joblib.load('model.pkl')

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Espera um JSON com {"data": [[feature1, feature2, ...], ...]}
        data = request.get_json()
        X = data['data']
        # Garante que X é uma lista de listas
        if isinstance(X[0], (int, float)):
            X = [X]
        prediction = model.predict(X)
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)