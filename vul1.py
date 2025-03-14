import sqlite3

def unsafe_query(user_input):
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()
    
    # Vulnerable to SQL injection because user_input is not parameterized
    query = f"SELECT * FROM users WHERE username = '{user_input}'"
    cursor.execute(query)
    
    results = cursor.fetchall()
    conn.close()
    return results
