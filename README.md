# Protein-Protein Interface ASA Change Calculator

This application calculates the solvent accessible surface area (ASA) change for each residue in a protein-protein interface before and after interaction with another molecule. It accesses the RCSB PDB API to fetch the required data and provides a user-friendly front-end built with React for easy interaction.

## Description

In a biological context, understanding molecular interfaces in a protein structure is essential. The molecular interface represents a surface region of a protein that interacts with other molecules. The goal of this challenge is to calculate the delta between the 'Unbound ASA' and the 'Bound ASA' for each 'interface_partner'.

The application consists of two parts: the front-end and the back-end.

The front-end of the application is built with React and provides a user-friendly interface to input the following data:

- `entry_id`: The ID of the protein structure (e.g., '1RH7').
- `assembly_id`: The ID of the biological assembly (e.g., 1).
- `interface_id`: The ID of the pairwise polymeric interface (e.g., 1).

The back-end of the application is built with FastAPI and includes an endpoint to accept the POST request and send a GET request to the RCSB API to fetch protein-protein interface data. Then it computes the change in ASA for each residue and responds to the POST request with a list of tuples, each containing:

- Sequence position of the residue (integer).
- Unbound ASA (float).
- Bound ASA (float).
- Change in ASA upon interaction (float).

The front-end displays the data in tabular format as well as graphical representation.

## How to Run the Application

1. Clone this repository to your local machine.
2. Create new terminal. Navigate to project directory and then `backend` folder.

```
cd <project directory>
cd backend
```

3. Set up and activate a virtual environment for the backend (optional but recommended) Following is for Unix or MacOS. Then install required backend dependencies.

```
python -m venv /path/venv_name
source venv_name/bin/activate
pip install -r requirements.txt
```

4. Create new terminal. Navigate to project directory and then `frontend` folder. Install fronent dependencies.

```
cd <project directory>
cd frontend
npm install
```

5.  Run the backend server in backend terminal using :

```
uvicorn main:app --reload
```

6.  Run the fronent server in frontend terminal using :

```
npm run dev
```

7. Access the application in your web browser at `http://localhost:5173/` (Or whichever port it opens with in your frontend server)

---
