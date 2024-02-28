import time
import datetime
import logging

_logger = logging.getLogger('logger')

def print_date():
    _logger.info(f'[print_date] {datetime.datetime.now()}')


def print_unix_time():
    _logger.info(f'[print_unix_time] {time.time()}')

