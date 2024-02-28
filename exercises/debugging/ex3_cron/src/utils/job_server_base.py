import hashlib
import json
import asyncio
import logging

class JobServerBase:
    POLL_DURATION = 1.0

    def __init__(self, jobs_file_path):
        self.jobs_file_path = jobs_file_path
        self._jobs_file_hash = None
        self._logger = logging.getLogger('logger')

    async def _run_job(self, job, interval):
        pass

    def cancel_all_running_jobs(self):
        pass

    def create_job(self, job_name, job_interval):
        pass

    @staticmethod
    def _get_file_hash(contents):
        return hashlib.md5(contents.encode('utf-8')).hexdigest()


    def _parse_jobs_file(self, job_file_contents):
        # try reading definition of jobs
        try:
            contents = json.loads(job_file_contents)
            for job_idx, job_definition in enumerate(contents):
                if 'func' not in job_definition or 'interval' not in job_definition:
                    self._logger.error(f'Job {job_idx} is not well defined!')
                    continue

                job_name = job_definition['func']
                job_interval = job_definition['interval']
                
                self.create_job(job_name, job_interval)
        except Exception:
            # we don't care what exception we have here
            print(f'[error] Error parsing {self.jobs_file_path}!')

    async def _poll_for_changes(self):
        while True:
            # poll if file has changed
            try:
                with open(self.jobs_file_path) as jobs_file:
                    job_file_contents = jobs_file.read()
            except OSError:
                self._logger.error(f'[error] Error opening {self.jobs_file_path}!')

            # only parse file if it has changed
            current_hash = self._get_file_hash(job_file_contents)
            if self._jobs_file_hash != current_hash:
                self._logger.info('=' * 50)
                self._logger.info(f'Reloading all jobs!')

                self.cancel_all_running_jobs()
                self._parse_jobs_file(job_file_contents)
                self._jobs_file_hash = current_hash

            await asyncio.sleep(self.POLL_DURATION)

    async def run(self):
        poll_task = asyncio.create_task(self._poll_for_changes())
        await poll_task
