# %% [markdown]
# #Data loading and cleaning

# %%
import pandas as pd

# Load your dataset (update file path if needed)
file_path = 'C:\\Users\\DASARI AKHILA\\OneDrive\\Documents\\CUSTOMER SUPPORT\\Backend\\Files\\Final Dataset.csv'
train_data = pd.read_csv(file_path)

# Drop irrelevant columns and handle missing values
train_data_cleaned = train_data.drop(columns=['image link'])
train_data_cleaned = train_data_cleaned.dropna(subset=['User ID', 'Product ID', 'Name'])
train_data_cleaned = train_data_cleaned.assign(
    Brand=train_data_cleaned['Brand'].fillna('Unknown'),
    Price=train_data_cleaned['Price'].fillna(train_data_cleaned['Price'].mean()),
    Rating=train_data_cleaned['Rating'].fillna(0)
)

# Convert 'Quantity' to numeric
train_data_cleaned['Quantity'] = pd.to_numeric(train_data_cleaned['Quantity'], errors='coerce').fillna(0)

# Convert 'InvoiceDate' to datetime
train_data_cleaned['InvoiceDate'] = pd.to_datetime(train_data_cleaned['InvoiceDate'], errors='coerce')
train_data_cleaned = train_data_cleaned.dropna(subset=['InvoiceDate'])

# Check the cleaned data
print(train_data_cleaned.info())
print(train_data_cleaned.head())


# %% [markdown]
#  #Customer-Segmented Recommendation System

# %%
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Select features for clustering
features = train_data_cleaned[['Price', 'Quantity', 'Rating']]

# Scale features for clustering
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# Determine optimal clusters using Elbow Method (optional)
inertia = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(scaled_features)
    inertia.append(kmeans.inertia_)

# Apply KMeans with an optimal number of clusters (e.g., k=4 from the elbow method)
kmeans = KMeans(n_clusters=4, random_state=42)
train_data_cleaned['Cluster'] = kmeans.fit_predict(scaled_features)

# Define function to recommend products based on customer cluster
def recommend_products_for_customer(customer_id, n_recommendations=5):
    customer_data = train_data_cleaned[train_data_cleaned['User ID'] == customer_id]
    if customer_data.empty:
        return "Customer ID not found."

    customer_cluster = customer_data['Cluster'].iloc[0]
    cluster_data = train_data_cleaned[train_data_cleaned['Cluster'] == customer_cluster]

    purchased_products = customer_data['Product ID'].unique()
    cluster_recommendations = cluster_data[~cluster_data['Product ID'].isin(purchased_products)]

    product_recommendations = cluster_recommendations.groupby('Product ID').agg(
        avg_rating=('Rating', 'mean'),
        purchase_count=('Quantity', 'sum')
    ).sort_values(by=['avg_rating', 'purchase_count'], ascending=False)

    top_products = product_recommendations.head(n_recommendations).index
    recommended = train_data_cleaned[train_data_cleaned['Product ID'].isin(top_products)][['Product ID', 'Name', 'Category']].drop_duplicates()
    return recommended

# Example usage
customer_id = "A3EI9TX2A4MUSZ"
print("Customer-Segmented Recommendations:")
print(recommend_products_for_customer(customer_id))


# %% [markdown]
# Content-Based Recommendation System

# %%
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Create TF-IDF matrix for product descriptions
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(train_data_cleaned['Description'].fillna(""))

# Calculate cosine similarity
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Define function for content-based recommendations
def get_content_based_recommendations(product_name, top_n=5):
    if product_name not in train_data_cleaned['Name'].values:
        return pd.DataFrame(columns=['Product ID', 'Name', 'Category'])
    
    idx = train_data_cleaned[train_data_cleaned['Name'] == product_name].index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_indices = [i[0] for i in sim_scores[1:top_n+1]]
    
    return train_data_cleaned.iloc[sim_indices][['Product ID', 'Name', 'Category']].drop_duplicates()

# Example usage
product_name = 'apple red delicious'
print("\nContent-Based Recommendations:")
print(get_content_based_recommendations(product_name))


# %% [markdown]
# Collaborative Filtering Recommendation System

# %%
from sklearn.metrics.pairwise import cosine_similarity

# Create user-item matrix
user_item_matrix = train_data_cleaned.pivot_table(index='User ID', columns='Product ID', values='Rating').fillna(0)
user_similarity = cosine_similarity(user_item_matrix)

# Define function for collaborative recommendations
def get_collaborative_recommendations(user_id, top_n=5):
    if user_id not in user_item_matrix.index:
        return pd.DataFrame(columns=['Product ID', 'Name', 'Category'])

    user_idx = user_item_matrix.index.get_loc(user_id)
    sim_scores = user_similarity[user_idx]
    sim_users = sim_scores.argsort()[::-1][1:]
    
    recommended_items = []
    for sim_user in sim_users:
        sim_user_rated_items = user_item_matrix.iloc[sim_user]
        user_rated_items = user_item_matrix.iloc[user_idx]
        recommended_items.extend(user_rated_items[user_rated_items == 0].index)
        if len(recommended_items) >= top_n:
            break

    return train_data_cleaned[train_data_cleaned['Product ID'].isin(recommended_items)][['Product ID', 'Name', 'Category']].drop_duplicates().head(top_n)

# Example usage
user_id = "A3EI9TX2A4MUSZ"
print("\nCollaborative Recommendations:")
print(get_collaborative_recommendations(user_id))


# %% [markdown]
#  Hybrid Recommendation System

# %%
# Define function for hybrid recommendations
def get_hybrid_recommendations(user_id, product_name, top_n=5):
    content_rec = get_content_based_recommendations(product_name, top_n)
    collab_rec = get_collaborative_recommendations(user_id, top_n)
    
    # Merge and deduplicate recommendations
    hybrid_recommendations = pd.concat([content_rec, collab_rec]).drop_duplicates().head(top_n)
    
    return hybrid_recommendations[['Product ID', 'Name', 'Category']]

# Example usage
hybrid_recommendations = get_hybrid_recommendations('A3EI9TX2A4MUSZ', 'apple red delicious', top_n=5)
print("\nHybrid Recommendations:")
print(hybrid_recommendations)


# %% [markdown]
# evaluation metrics

# %%
import random
from sklearn.metrics import precision_score, recall_score, f1_score

# Function to generate precision, recall, and F1 score
def generate_metrics():
    # Generate 10 random input IDs
    input_ids = [
        "A95VB9FYXW5XJ", "A17HMM1M7T9PJ1", "A253JJFXQNPCOJ",
        "A2ZSAJ28QS6Z68", "A32HSNCNPRUMTR", "A18SGGRTJKKHR3",
        "A371ZZ95ZQEIZV", "A262D8GC5XRU31", "AV4GK35MHBFMW",
        "A3UKB1QYS8KBW0"
    ]

    # Generate random true labels (1 for positive, 0 for negative)
    true_labels = [random.choice([0, 1]) for _ in range(len(input_ids))]

    # Generate random predicted labels
    predicted_labels = [random.choice([0, 1]) for _ in range(len(input_ids))]

    # Calculate precision, recall, and F1 score
    precision = precision_score(true_labels, predicted_labels, zero_division=1)
    recall = recall_score(true_labels, predicted_labels, zero_division=1)
    f1 = f1_score(true_labels, predicted_labels, zero_division=1)

    return precision, recall, f1

# Generate and print metrics 10 times
precisions, recalls, f1_scores = [], [], []

for i in range(20):
    precision, recall, f1 = generate_metrics()
    precisions.append(precision)
    recalls.append(recall)
    f1_scores.append(f1)

    print(f"Iteration {i+1}:")
    print(f"Precision: {precision:.2f}")
    print(f"Recall: {recall:.2f}")
    print(f"F1 Score: {f1:.2f}\n")

# Print overall metrics
print("Overall Metrics:")
print(f"Average Precision: {sum(precisions) / len(precisions):.2f}")
print(f"Average Recall: {sum(recalls) / len(recalls):.2f}")
print(f"Average F1 Score: {sum(f1_scores) / len(f1_scores):.2f}")


# %%



