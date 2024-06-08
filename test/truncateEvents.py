import mysql.connector

# Connect to MySQL server
try:
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="PASS",
        database="newDB",
        port=3307
    )
    if connection.is_connected():
        print("Connected to MySQL server")
        
        cursor = connection.cursor()

        truncate_query = "TRUNCATE TABLE Events;"
        cursor.execute(truncate_query)
        
        connection.commit()
        
        print("Table 'Users' truncated successfully")
        
except Exception as e:
    print(f"Error: {e}")

finally:
    if 'cursor' in locals():
        cursor.close()
    if 'connection' in locals() and connection.is_connected():
        connection.close()
        print("MySQL connection closed")
