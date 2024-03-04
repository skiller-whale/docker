# Part 1
1. Look carefully where the log file is written and what is mounted.

# Part 2 
1. Compare the output of `docker export` and `docker diff`. Is there a difference? You might want to exclude `__pycache__` files.
2. Look at the filesystem structure on the host and compare to what's in `docker-compose.yml`/`Dockerfile`.
3. Open a shell inside `pycron` and use `ls` to inspect the filesystem.
