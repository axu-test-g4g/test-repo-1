import subprocess

# Hard-coded secret (example only; do not use in production!)
API_KEY = "hardcoded-API-key-12345"

def run_command(user_input):
    # Vulnerable to command injection due to direct string interpolation
    command = f"echo {user_input}"
    subprocess.run(command, shell=True)

# ...existing code...
