# app.py
from flask import Flask, request, jsonify
import json
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
import pyttsx3
import datetime
import wikipedia

app = Flask(__name__)

# Load datasets
faq_json_path = "C:\\Users\\DASARI AKHILA\\OneDrive\\Documents\\CUSTOMER SUPPORT\\Backend\\Files\\Ecommerce_FAQ_Chatbot_dataset.json"
csv_file_path = "C:\\Users\\DASARI AKHILA\\OneDrive\\Documents\\CUSTOMER SUPPORT\\Backend\\Files\\Final Dataset.csv"

# Load FAQ data
with open(faq_json_path) as file:
    faq_data = json.load(file)
questions = [item['question'] for item in faq_data['questions']]
answers = [item['answer'] for item in faq_data['questions']]
vectorizer = TfidfVectorizer(stop_words='english')
faq_tfidf = vectorizer.fit_transform(questions)

# Load e-commerce data
data_cleaned = pd.read_csv(csv_file_path, encoding='utf-8', on_bad_lines='skip')
data_cleaned['Quantity'] = pd.to_numeric(data_cleaned['Quantity'], errors='coerce').fillna(0)
data_cleaned['Brand'].fillna('Unknown', inplace=True)
data_cleaned['InvoiceDate'] = pd.to_datetime(data_cleaned['InvoiceDate'], errors='coerce')

# Preprocess and cluster data
features = data_cleaned[['Price', 'Quantity', 'Rating']].fillna(0)
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)
kmeans = KMeans(n_clusters=4, random_state=42)
data_cleaned['Cluster'] = kmeans.fit_predict(scaled_features)

# Recommendation function
def recommend_products_for_customer(customer_id, n_recommendations=5):
    customer_data = data_cleaned[data_cleaned['User ID'] == customer_id]
    if customer_data.empty:
        return []
    customer_cluster = customer_data['Cluster'].iloc[0]
    cluster_data = data_cleaned[data_cleaned['Cluster'] == customer_cluster]
    purchased_products = customer_data['Product ID'].unique()
    cluster_recommendations = cluster_data[~cluster_data['Product ID'].isin(purchased_products)]
    product_recommendations = cluster_recommendations.groupby('Product ID').agg(
        avg_rating=('Rating', 'mean'),
        purchase_count=('Quantity', 'sum')
    ).sort_values(by=['avg_rating', 'purchase_count'], ascending=False)
    top_products = product_recommendations.head(n_recommendations).index
    return data_cleaned[data_cleaned['Product ID'].isin(top_products)][['Product ID', 'Name', 'Category']].drop_duplicates().to_dict('records')

# FAQ match function
def get_faq_match(query):
    query_vec = vectorizer.transform([query])
    similarity_scores = cosine_similarity(query_vec, faq_tfidf).flatten()
    best_idx = np.argmax(similarity_scores)
    return answers[best_idx] if similarity_scores[best_idx] > 0.2 else "I'm sorry, I couldn't find a relevant answer."

# Route to get product recommendations
@app.route('/recommendations', methods=['GET'])
def recommendations():
    customer_id = request.args.get('customer_id')
    recommendations = recommend_products_for_customer(customer_id)
    return jsonify(recommendations)

# Route for virtual assistant FAQ handling
@app.route('/faq', methods=['POST'])
def faq():
    data = request.json
    user_query = data.get('query')
    answer = get_faq_match(user_query)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
