import os

os.chdir("/Users/danielk/Desktop/Everything/code/userscripts/")
os.system("git add .")
os.system('git commit -m "autoupdate"')
os.system("git push origin main")
