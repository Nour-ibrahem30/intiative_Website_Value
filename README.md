Local setup to view `mokn_index.html`

Options:

1) Using Node (recommended if you have Node installed)

- Start the simple server included here (serves on port 3000 by default):

```powershell
Set-Location 'C:\Users\o\Desktop\Websites\3D Models'
node server.js
```

Then open in browser:

http://localhost:3000/mokn_index.html

This will also serve `global.js` and `pages/accueil.js` from the local folder so the page can load local scripts.

2) Using a simple HTTP server (Python or npm http-server)

- If you have Python installed:

```powershell
Set-Location 'C:\Users\o\Desktop\Websites\3D Models'
python -m http.server 8000
```

Open:
http://localhost:8000/mokn_index.html

- Or install `http-server` and run:

```powershell
npm install -g http-server
Set-Location 'C:\Users\o\Desktop\Websites\3D Models'
http-server -p 8000
```

Notes:
- `global.js` and `pages/accueil.js` are local stubs placed in the project so you can test locally.
- If you want the page to load the local versions from `http://localhost:3000`, run `node server.js` (option 1).