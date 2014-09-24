# Celine Build folder

This folder contains built js and css files that are used when the application runs. The folders need to exist otherwise browserify will get upset, thus the `.gitkeep` files which are a hack around git not liking empty directories. They also need to be empty to avoid constant merge conflicts, thus the entry in the `.gitignore` file.