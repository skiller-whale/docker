import asyncio
from pathlib import Path
from utils.job_server_base import JobServerBase
from utils import job_funcs
import importlib
import inspect
import logging
import os

DATA_PATH = Path(__file__).parent / 'data'

class JobServer(JobServerBase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.running_tasks = set()


    async def _run_job(self, job, interval):
        while True:
            try:
                if inspect.iscoroutinefunction(job):
                    await job()
                else:
                    job()
            except Exception:
                # this does not catch asyncio.CancelledError
                #   but we should cancel ourselves anyway
                self._logger.error(f'Job {job.__name__} stopped due to {type(e).__name__}')
                break
            else:
                try:
                    await asyncio.sleep(interval)
                except asyncio.CancelledError:
                    self._logger.info(f'Job {job.__name__} cancelled.')
                    # re-raise CancelledError
                    raise

    def create_job(self, job_name, job_interval):
        # reload the files in jobs
        #   this lets you create jobs while the server is running
        importlib.reload(job_funcs)
        if not hasattr(job_funcs, job_name):
            print(f'No such job {job_name}')
            return

        job_function = getattr(job_funcs, job_name)

        # YOUR CODE GOES HERE
        self.running_tasks.add(
            asyncio.create_task(
                self._run_job(
                    job_function,
                    job_interval
                )
            )
        )

    def cancel_all_running_jobs(self):
        for task in self.running_tasks:
            task.cancel()
        self.running_tasks.clear()

if __name__ == '__main__':
    logfile_path = os.environ.get('LOGFILE_PATH', default='/var/log/jobserver.log')
    print(f'Logging to {logfile_path}')

    logging.basicConfig(
        level=logging.DEBUG,
        filename=logfile_path
    )
    server = JobServer(DATA_PATH / 'jobs.json')
    
    asyncio.run(server.run())
