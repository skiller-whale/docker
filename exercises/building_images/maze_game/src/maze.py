#!/usr/bin/python3
import os
import sys

DEFAULT_ABILITY_NAME = 'blink'
GAME_VERSION="0.0.5-alpha"

class Ability:
    def __init__(self, name):
        self.name = name

if __name__ == '__main__':
    # Requires Python 3.10+
    if sys.version_info.major < 3 or (sys.version_info.major == 3 and sys.version_info.minor < 10):
        print('Requires Python 3.10+', file=sys.stderr)
        sys.exit(1)

    ability_name = os.environ.get('ABILITY_NAME', DEFAULT_ABILITY_NAME)
    debug_mode = False

    if len(sys.argv) > 1 and sys.argv[1] == '--debug':
        debug_mode = True
        print('[debug] Now running in debug mode.')
        print(f'[debug] Game version {GAME_VERSION}')

    print('You are lost in a maze. You must escape!')
    ability = Ability(ability_name)

    while user_input := input('>>> '):
        if debug_mode:
            print(f'[debug] user input: {user_input}')
            print()
        match user_input.lower().split():
            case ['help']:
                # print help message, except how to use ability
                print('Available commands:')
                print('\t go <direction>')
                print('\t ask <question>')
                print('HINT: You have a secret ability. But what is it called?')
            case ['go', direction]:
                # go doesn't do anything -- still lost in the maze!
                print(f'You went {direction}.')
                print('\t Unfortunately, you are still lost.')
            case ['ask', 'what', 'is', 'my', 'ability', 'called' | 'called?'] | \
                ['ask', 'what', 'is', 'it', 'called' | 'called?']:
                # print name of ability without how to use it
                print(f'Your ability is called {ability.name}')
            case ['ask', 'how', 'do', 'i', 'use', ability.name]:
                # print how to use ability
                print(f'Just type \'use {ability.name}\'')
            case ['use', ability.name]:
                # win condition
                print('Success! You have escaped.')
                break
            case command:
                # other commands are ignored
                print('I do not understand your command.')
