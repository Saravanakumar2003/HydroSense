import tkinter as tk
from tkinter import messagebox
from firebase_integration import register_user, login_user, logout_user

# Function to handle user registration
def handle_register():
    email = email_entry.get()
    password = password_entry.get()
    user = register_user(email, password)
    if user:
        messagebox.showinfo("Success", "User registered successfully!")
    else:
        messagebox.showerror("Error", "Failed to register user.")

# Function to handle user login
def handle_login():
    email = email_entry.get()
    password = password_entry.get()
    user = login_user(email, password)
    if user:
        messagebox.showinfo("Success", "User logged in successfully!")
    else:
        messagebox.showerror("Error", "Failed to log in user.")

# Function to handle user logout
def handle_logout():
    logout_user()
    messagebox.showinfo("Success", "User logged out successfully!")

# Setup the main window
root = tk.Tk()
root.title("Waterborne Disease Detector")

# Add email and password entry fields
email_label = tk.Label(root, text="Email:")
email_label.pack(pady=5)
email_entry = tk.Entry(root)
email_entry.pack(pady=5)

password_label = tk.Label(root, text="Password:")
password_label.pack(pady=5)
password_entry = tk.Entry(root, show="*")
password_entry.pack(pady=5)

# Add register, login, and logout buttons
register_button = tk.Button(root, text="Register", command=handle_register)
register_button.pack(pady=5)

login_button = tk.Button(root, text="Login", command=handle_login)
login_button.pack(pady=5)

logout_button = tk.Button(root, text="Logout", command=handle_logout)
logout_button.pack(pady=5)

# Start the Tkinter event loop
root.mainloop()