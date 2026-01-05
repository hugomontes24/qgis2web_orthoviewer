import os

folder = "./orthos"  # chemin vers ton dossier
ext = ".jpg"

files = sorted(f for f in os.listdir(folder) if f.lower().endswith(ext))

for i, filename in enumerate(files, start=1):
    old_path = os.path.join(folder, filename)
    new_name = f"img{i}{ext}"
    new_path = os.path.join(folder, new_name)

    os.rename(old_path, new_path)

print("Renommage terminé")
