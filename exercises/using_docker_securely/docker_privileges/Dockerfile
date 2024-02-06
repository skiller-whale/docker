FROM ubuntu:latest

# setuid permissions, /bin/root_bash can be executed as root

RUN cp /bin/bash /bin/root_bash && chmod u+s /bin/root_bash
RUN useradd -ms /bin/bash appuser

RUN apt-get update && apt-get install -y gcc libcap-dev
WORKDIR /app
COPY setuid_binary.c .
RUN gcc -o setuid_binary setuid_binary.c
RUN chmod 4555 setuid_binary

# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# USER appuser

CMD ["/bin/bash"]

# shell instructions
# docker build -t setuid_docker . && docker run -it setuid_docker
#   /bin/root_bash -p 
#
# -p does:
#   Turned on whenever the real and effective user ids do not match.
#       Disables processing of the $ENV file and importing of shell
#       functions.  Turning this option off causes the effective uid and
#       gid to be set to the real uid and gid.

# correct way
# docker run -it --security-opt=no-new-privileges:true
